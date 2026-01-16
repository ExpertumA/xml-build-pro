-- Fix permissive RLS policy for companies INSERT
DROP POLICY "Users can create companies" ON public.companies;

-- Only authenticated users can create companies
CREATE POLICY "Authenticated users can create companies" ON public.companies FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);