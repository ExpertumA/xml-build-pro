-- Update plans table structure for new pricing model
-- Remove old plans and add new subscription types

-- First, deactivate all existing plans
UPDATE public.plans SET is_active = false;

-- Insert new subscription types
INSERT INTO public.plans (name, description, price_monthly, credits_monthly, max_file_size_mb, features, is_active)
VALUES 
  -- Pay-per-generation subscription (access only, no credits)
  ('PAY_PER_GENERATION', 'Подписка с оплатой за генерацию', 0, 0, 50, 
   '["Пояснительная записка (Раздел №1)", "Задание на проектирование", "XML-схемы этапа инженерных изысканий (скоро)"]'::jsonb, 
   true),
  -- Unlimited subscription for experts
  ('UNLIMITED_EXPERT', 'Подписка без лимитов', 12000, -1, 50, 
   '["XML-схема заключения экспертизы", "Неограниченное количество генераций"]'::jsonb, 
   true);

-- Add subscription_type to company_subscriptions to distinguish between types
ALTER TABLE public.company_subscriptions 
ADD COLUMN IF NOT EXISTS subscription_type text DEFAULT 'pay_per_generation';

-- Add balance column for pay-per-generation (prepaid amount in rubles)
ALTER TABLE public.company_subscriptions 
ADD COLUMN IF NOT EXISTS balance_rub numeric DEFAULT 0;

-- Create table for document generation prices
CREATE TABLE IF NOT EXISTS public.document_prices (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_type text NOT NULL UNIQUE,
  document_name text NOT NULL,
  price_rub numeric NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on document_prices
ALTER TABLE public.document_prices ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view document prices
CREATE POLICY "Anyone can view document prices" 
ON public.document_prices 
FOR SELECT 
USING (true);

-- Insert document prices
INSERT INTO public.document_prices (document_type, document_name, price_rub, is_available)
VALUES 
  ('explanatory_note', 'Пояснительная записка (Раздел №1)', 3000, true),
  ('design_assignment', 'Задание на проектирование', 2500, true),
  ('engineering_xml', 'XML-схемы этапа инженерных изысканий и проектирования', 0, false),
  ('expertise_conclusion', 'XML-схема заключения экспертизы', 0, true)
ON CONFLICT (document_type) DO UPDATE SET
  document_name = EXCLUDED.document_name,
  price_rub = EXCLUDED.price_rub,
  is_available = EXCLUDED.is_available;

-- Create table for document generation transactions
CREATE TABLE IF NOT EXISTS public.generation_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid NOT NULL REFERENCES public.companies(id),
  subscription_id uuid REFERENCES public.company_subscriptions(id),
  document_type text NOT NULL,
  amount_rub numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on generation_transactions
ALTER TABLE public.generation_transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their company's transactions
CREATE POLICY "Users can view company generation transactions" 
ON public.generation_transactions 
FOR SELECT 
USING (is_company_member(company_id));

-- Users can insert transactions for their company
CREATE POLICY "Users can create generation transactions" 
ON public.generation_transactions 
FOR INSERT 
WITH CHECK (is_company_member(company_id));