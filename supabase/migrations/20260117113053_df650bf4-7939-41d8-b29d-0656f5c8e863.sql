-- Create table for offer acceptance logs
CREATE TABLE public.offer_acceptances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  offer_version TEXT NOT NULL DEFAULT '1.0',
  accepted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  acceptance_method TEXT NOT NULL CHECK (acceptance_method IN ('payment', 'sms', 'checkbox')),
  ip_address INET,
  user_agent TEXT,
  phone TEXT,
  sms_code_used TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.offer_acceptances ENABLE ROW LEVEL SECURITY;

-- Users can view their company's offer acceptances
CREATE POLICY "Users can view company offer acceptances"
  ON public.offer_acceptances FOR SELECT
  USING (is_company_member(company_id));

-- Users can insert offer acceptance for their company
CREATE POLICY "Users can insert offer acceptance"
  ON public.offer_acceptances FOR INSERT
  WITH CHECK (is_company_member(company_id) AND user_id = auth.uid());

-- Create table for payment methods
CREATE TABLE public.payment_methods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('card', 'invoice')),
  card_last_four TEXT,
  card_brand TEXT,
  card_exp_month INTEGER,
  card_exp_year INTEGER,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- Users can view their company's payment methods
CREATE POLICY "Users can view company payment methods"
  ON public.payment_methods FOR SELECT
  USING (is_company_member(company_id));

-- Admins can manage payment methods
CREATE POLICY "Admins can manage payment methods"
  ON public.payment_methods FOR ALL
  USING (is_company_admin(company_id));

-- Create table for payments history
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Users can view their company's payments
CREATE POLICY "Users can view company payments"
  ON public.payments FOR SELECT
  USING (is_company_member(company_id));

-- Add offer_accepted field to companies
ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS offer_accepted BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS offer_accepted_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS offer_version TEXT;

-- Add trigger for updated_at on payment_methods
CREATE TRIGGER update_payment_methods_updated_at
  BEFORE UPDATE ON public.payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();