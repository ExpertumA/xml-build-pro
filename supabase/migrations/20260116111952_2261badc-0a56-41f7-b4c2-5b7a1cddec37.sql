-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUM types for status fields
CREATE TYPE document_status AS ENUM ('uploading', 'processing', 'validating', 'completed', 'error');
CREATE TYPE invoice_status AS ENUM ('issued', 'paid', 'overdue');
CREATE TYPE object_type AS ENUM ('residential', 'non_residential', 'linear');
CREATE TYPE user_role AS ENUM ('member', 'admin');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  inn TEXT NOT NULL,
  kpp TEXT,
  legal_address TEXT,
  contact_person TEXT,
  accounting_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company memberships (links users to companies)
CREATE TABLE public.company_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'member',
  invited_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, company_id)
);

-- Subscription plans
CREATE TABLE public.plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_monthly NUMERIC(10, 2) NOT NULL DEFAULT 0,
  credits_monthly INTEGER NOT NULL DEFAULT 0,
  max_documents INTEGER,
  max_file_size_mb INTEGER NOT NULL DEFAULT 50,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company subscriptions
CREATE TABLE public.company_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  credits_remaining INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT,
  file_size INTEGER,
  file_type TEXT,
  object_type object_type,
  xml_schema_type TEXT,
  xml_schema_version TEXT,
  status document_status NOT NULL DEFAULT 'uploading',
  result_xml_path TEXT,
  validation_errors JSONB DEFAULT '[]'::jsonb,
  validation_passed BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Invoices table
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  amount NUMERIC(12, 2) NOT NULL,
  status invoice_status NOT NULL DEFAULT 'issued',
  due_date DATE NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Invoice documents (acts, closing documents)
CREATE TABLE public.invoice_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- 'invoice', 'act', 'closing'
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default plans
INSERT INTO public.plans (name, description, price_monthly, credits_monthly, max_documents, max_file_size_mb, features) VALUES
('Start', 'Для малого бизнеса', 0, 5, 10, 25, '["5 документов в месяц", "Базовая валидация XSD", "Email поддержка"]'),
('Pro', 'Для растущих компаний', 9900, 50, 100, 100, '["50 документов в месяц", "Расширенная валидация", "Приоритетная поддержка", "API доступ"]'),
('Enterprise', 'Для крупных организаций', 29900, -1, -1, 500, '["Безлимитные документы", "Выделенный менеджер", "SLA 99.9%", "Интеграция с СЭД", "Персональные схемы"]');

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_documents ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if user is member of company
CREATE OR REPLACE FUNCTION public.is_company_member(company_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.company_memberships
    WHERE company_id = company_uuid AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Helper function: Check if user is admin of company
CREATE OR REPLACE FUNCTION public.is_company_admin(company_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.company_memberships
    WHERE company_id = company_uuid AND user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (id = auth.uid());

-- RLS Policies for companies
CREATE POLICY "Users can view their companies" ON public.companies FOR SELECT USING (is_company_member(id));
CREATE POLICY "Admins can update their companies" ON public.companies FOR UPDATE USING (is_company_admin(id));
CREATE POLICY "Users can create companies" ON public.companies FOR INSERT WITH CHECK (true);

-- RLS Policies for company_memberships
CREATE POLICY "Users can view own memberships" ON public.company_memberships FOR SELECT 
  USING (user_id = auth.uid() OR is_company_member(company_id));
CREATE POLICY "Admins can manage memberships" ON public.company_memberships FOR INSERT 
  WITH CHECK (is_company_admin(company_id) OR NOT EXISTS (SELECT 1 FROM public.company_memberships WHERE company_id = company_memberships.company_id));
CREATE POLICY "Admins can update memberships" ON public.company_memberships FOR UPDATE 
  USING (is_company_admin(company_id));
CREATE POLICY "Admins can delete memberships" ON public.company_memberships FOR DELETE 
  USING (user_id = auth.uid() OR is_company_admin(company_id));

-- RLS Policies for plans (public read)
CREATE POLICY "Anyone can view active plans" ON public.plans FOR SELECT USING (is_active = true);

-- RLS Policies for company_subscriptions
CREATE POLICY "Users can view company subscriptions" ON public.company_subscriptions FOR SELECT 
  USING (is_company_member(company_id));
CREATE POLICY "Admins can manage subscriptions" ON public.company_subscriptions FOR ALL 
  USING (is_company_admin(company_id));

-- RLS Policies for documents
CREATE POLICY "Users can view company documents" ON public.documents FOR SELECT 
  USING (is_company_member(company_id));
CREATE POLICY "Users can create documents in their company" ON public.documents FOR INSERT 
  WITH CHECK (is_company_member(company_id) AND user_id = auth.uid());
CREATE POLICY "Users can update own documents" ON public.documents FOR UPDATE 
  USING (user_id = auth.uid() OR is_company_admin(company_id));
CREATE POLICY "Users can delete own documents" ON public.documents FOR DELETE 
  USING (user_id = auth.uid() OR is_company_admin(company_id));

-- RLS Policies for invoices
CREATE POLICY "Users can view company invoices" ON public.invoices FOR SELECT 
  USING (is_company_member(company_id));
CREATE POLICY "Admins can manage invoices" ON public.invoices FOR ALL 
  USING (is_company_admin(company_id));

-- RLS Policies for invoice_documents
CREATE POLICY "Users can view invoice documents" ON public.invoice_documents FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.invoices WHERE id = invoice_id AND is_company_member(company_id)));

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies for documents bucket
CREATE POLICY "Users can upload to their company folder" ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'documents' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can view their company documents" ON storage.objects FOR SELECT 
  USING (bucket_id = 'documents' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete their documents" ON storage.objects FOR DELETE 
  USING (bucket_id = 'documents' AND auth.uid() IS NOT NULL);