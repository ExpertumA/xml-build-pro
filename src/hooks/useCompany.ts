import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Company {
  id: string;
  name: string;
  inn: string;
  kpp: string | null;
  legal_address: string | null;
  contact_person: string | null;
  accounting_email: string | null;
  offer_accepted: boolean | null;
}

export function useCompany() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Get user's company membership
      const { data: membership, error: membershipError } = await supabase
        .from("company_memberships")
        .select("company_id")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      if (membershipError) {
        console.error("Error fetching membership:", membershipError);
        setError("Не удалось получить данные о компании");
        setLoading(false);
        return;
      }

      if (!membership) {
        setLoading(false);
        return;
      }

      // Get company details
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .select("*")
        .eq("id", membership.company_id)
        .single();

      if (companyError) {
        console.error("Error fetching company:", companyError);
        setError("Не удалось получить данные о компании");
        setLoading(false);
        return;
      }

      setCompany(companyData);
      setLoading(false);
    };

    fetchCompany();
  }, []);

  return { company, loading, error };
}
