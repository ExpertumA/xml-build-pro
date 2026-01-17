import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { PackageStatus } from "@/components/billing/GenerationsPackageSection";

export interface OfferDetails {
  acceptedAt: string;
  version: string;
  method: string;
  ip?: string;
}

export interface PackageData {
  id: string;
  name: string;
  status: PackageStatus;
  generationsRemaining: number;
  generationsTotal: number;
  expiresAt: string;
  planId: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  price_monthly: number;
  credits_monthly: number;
  features: string[];
}

export function useBillingData(companyId: string | null) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [offerDetails, setOfferDetails] = useState<OfferDetails | undefined>();
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  // Fetch company offer status
  const fetchOfferStatus = useCallback(async () => {
    if (!companyId) return;

    const { data: company, error } = await supabase
      .from("companies")
      .select("offer_accepted, offer_accepted_at, offer_version")
      .eq("id", companyId)
      .single();

    if (error) {
      console.error("Error fetching company:", error);
      return;
    }

    if (company?.offer_accepted) {
      setOfferAccepted(true);
      
      // Fetch offer acceptance details
      const { data: acceptance } = await supabase
        .from("offer_acceptances")
        .select("*")
        .eq("company_id", companyId)
        .order("accepted_at", { ascending: false })
        .limit(1)
        .single();

      if (acceptance) {
        setOfferDetails({
          acceptedAt: new Date(acceptance.accepted_at).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          version: acceptance.offer_version,
          method: acceptance.acceptance_method,
          ip: acceptance.ip_address ? String(acceptance.ip_address) : undefined,
        });
      }
    }
  }, [companyId]);

  // Fetch active subscription
  const fetchSubscription = useCallback(async () => {
    if (!companyId) return;

    const { data: subscription, error } = await supabase
      .from("company_subscriptions")
      .select(`
        *,
        plans (name, credits_monthly)
      `)
      .eq("company_id", companyId)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching subscription:", error);
      return;
    }

    if (subscription) {
      const now = new Date();
      const expiresAt = subscription.expires_at ? new Date(subscription.expires_at) : null;
      const isExpired = expiresAt && expiresAt < now;
      const isExhausted = subscription.credits_remaining <= 0;

      let status: PackageStatus = "active";
      if (isExpired) {
        status = "expired";
      } else if (isExhausted) {
        status = "exhausted";
      }

      const planData = subscription.plans as unknown as { name: string; credits_monthly: number } | null;
      
      setPackageData({
        id: subscription.id,
        name: planData?.name || "Пакет",
        status,
        generationsRemaining: subscription.credits_remaining,
        generationsTotal: planData?.credits_monthly || subscription.credits_remaining,
        expiresAt: expiresAt
          ? expiresAt.toLocaleDateString("ru-RU")
          : "—",
        planId: subscription.plan_id,
      });
    } else {
      setPackageData(null);
    }
  }, [companyId]);

  // Fetch available plans
  const fetchPlans = useCallback(async () => {
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .eq("is_active", true)
      .order("price_monthly", { ascending: true });

    if (error) {
      console.error("Error fetching plans:", error);
      return;
    }

    setPlans(
      (data || []).map((plan) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        price_monthly: Number(plan.price_monthly),
        credits_monthly: plan.credits_monthly,
        features: (plan.features as string[]) || [],
      }))
    );
  }, []);

  // Accept offer
  const acceptOffer = async (method: string, phone?: string) => {
    if (!companyId) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Ошибка",
        description: "Необходимо авторизоваться",
        variant: "destructive",
      });
      return;
    }

    // Create offer acceptance record
    const { error: acceptanceError } = await supabase
      .from("offer_acceptances")
      .insert({
        company_id: companyId,
        user_id: user.id,
        offer_version: "1.0",
        acceptance_method: method,
        phone: phone || null,
        user_agent: navigator.userAgent,
      });

    if (acceptanceError) {
      console.error("Error creating acceptance:", acceptanceError);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить принятие оферты",
        variant: "destructive",
      });
      return;
    }

    // Update company
    const { error: companyError } = await supabase
      .from("companies")
      .update({
        offer_accepted: true,
        offer_accepted_at: new Date().toISOString(),
        offer_version: "1.0",
      })
      .eq("id", companyId);

    if (companyError) {
      console.error("Error updating company:", companyError);
      return;
    }

    await fetchOfferStatus();
    toast({
      title: "Оферта принята",
      description: "Условия публичной оферты успешно приняты",
    });
  };

  // Activate package (simulate payment or activate test package)
  const activatePackage = async (planId: string, isTest: boolean = false) => {
    if (!companyId) return;

    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    // Calculate expiration (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Deactivate existing subscriptions
    await supabase
      .from("company_subscriptions")
      .update({ is_active: false })
      .eq("company_id", companyId)
      .eq("is_active", true);

    // Create new subscription
    const { error } = await supabase
      .from("company_subscriptions")
      .insert({
        company_id: companyId,
        plan_id: planId,
        credits_remaining: plan.credits_monthly,
        expires_at: expiresAt.toISOString(),
        is_active: true,
      });

    if (error) {
      console.error("Error creating subscription:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось активировать пакет",
        variant: "destructive",
      });
      return;
    }

    await fetchSubscription();
    
    toast({
      title: isTest ? "Тестовый пакет активирован" : "Пакет активирован",
      description: isTest 
        ? `Вам доступно ${plan.credits_monthly} тестовых генераций`
        : `Пакет ${plan.name} успешно активирован. Чек отправлен на email.`,
    });
  };

  // Deduct generations
  const deductGenerations = async (amount: number): Promise<boolean> => {
    if (!packageData) return false;

    const newRemaining = packageData.generationsRemaining - amount;
    if (newRemaining < 0) return false;

    const { error } = await supabase
      .from("company_subscriptions")
      .update({ credits_remaining: newRemaining })
      .eq("id", packageData.id);

    if (error) {
      console.error("Error deducting generations:", error);
      return false;
    }

    await fetchSubscription();
    return true;
  };

  // Initial fetch
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchOfferStatus(), fetchSubscription(), fetchPlans()]);
      setLoading(false);
    };

    if (companyId) {
      fetchAll();
    } else {
      setLoading(false);
    }
  }, [companyId, fetchOfferStatus, fetchSubscription, fetchPlans]);

  return {
    loading,
    offerAccepted,
    offerDetails,
    packageData,
    plans,
    acceptOffer,
    activatePackage,
    deductGenerations,
    refetch: async () => {
      await Promise.all([fetchOfferStatus(), fetchSubscription()]);
    },
  };
}
