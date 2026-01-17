import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { SubscriptionType } from "@/lib/pricing";

export interface OfferDetails {
  acceptedAt: string;
  version: string;
  method: string;
  ip?: string;
}

export interface SubscriptionData {
  id: string;
  type: SubscriptionType;
  name: string;
  isActive: boolean;
  expiresAt?: string;
  planId: string;
}

export interface DocumentPrice {
  documentType: string;
  documentName: string;
  priceRub: number;
  isAvailable: boolean;
}

export function useBillingDataNew(companyId: string | null) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [offerDetails, setOfferDetails] = useState<OfferDetails | undefined>();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [documentPrices, setDocumentPrices] = useState<DocumentPrice[]>([]);

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

    const { data: sub, error } = await supabase
      .from("company_subscriptions")
      .select(`
        *,
        plans (name, description)
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

    if (sub) {
      const now = new Date();
      const expiresAt = sub.expires_at ? new Date(sub.expires_at) : null;
      const isExpired = expiresAt && expiresAt < now;

      const planData = sub.plans as unknown as { name: string; description: string } | null;
      const subscriptionType = (sub.subscription_type as SubscriptionType) || 'pay_per_generation';

      setSubscription({
        id: sub.id,
        type: subscriptionType,
        name: planData?.name === 'UNLIMITED_EXPERT' 
          ? 'Подписка без лимитов' 
          : 'Подписка с оплатой за генерацию',
        isActive: !isExpired,
        expiresAt: expiresAt
          ? expiresAt.toLocaleDateString("ru-RU")
          : undefined,
        planId: sub.plan_id,
      });
    } else {
      setSubscription(null);
    }
  }, [companyId]);

  // Fetch document prices
  const fetchDocumentPrices = useCallback(async () => {
    const { data, error } = await supabase
      .from("document_prices")
      .select("*")
      .order("price_rub", { ascending: false });

    if (error) {
      console.error("Error fetching document prices:", error);
      return;
    }

    setDocumentPrices(
      (data || []).map((p) => ({
        documentType: p.document_type,
        documentName: p.document_name,
        priceRub: Number(p.price_rub),
        isAvailable: p.is_available || false,
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

  // Activate pay-per-generation subscription
  const activatePayPerGeneration = async () => {
    if (!companyId) return;

    // Find the PAY_PER_GENERATION plan
    const { data: plan } = await supabase
      .from("plans")
      .select("id")
      .eq("name", "PAY_PER_GENERATION")
      .eq("is_active", true)
      .single();

    if (!plan) {
      toast({
        title: "Ошибка",
        description: "Тариф не найден",
        variant: "destructive",
      });
      return;
    }

    // Deactivate existing subscriptions
    await supabase
      .from("company_subscriptions")
      .update({ is_active: false })
      .eq("company_id", companyId)
      .eq("is_active", true);

    // Create new subscription (no expiration for pay-per-generation)
    const { error } = await supabase
      .from("company_subscriptions")
      .insert({
        company_id: companyId,
        plan_id: plan.id,
        credits_remaining: 0,
        is_active: true,
        subscription_type: 'pay_per_generation',
      });

    if (error) {
      console.error("Error creating subscription:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось активировать подписку",
        variant: "destructive",
      });
      return;
    }

    await fetchSubscription();
    toast({
      title: "Подписка активирована",
      description: "Теперь вы можете генерировать документы с оплатой за каждую генерацию",
    });
  };

  // Activate unlimited expert subscription
  const activateUnlimitedExpert = async () => {
    if (!companyId) return;

    // Find the UNLIMITED_EXPERT plan
    const { data: plan } = await supabase
      .from("plans")
      .select("id")
      .eq("name", "UNLIMITED_EXPERT")
      .eq("is_active", true)
      .single();

    if (!plan) {
      toast({
        title: "Ошибка",
        description: "Тариф не найден",
        variant: "destructive",
      });
      return;
    }

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
        plan_id: plan.id,
        credits_remaining: -1, // -1 means unlimited
        expires_at: expiresAt.toISOString(),
        is_active: true,
        subscription_type: 'unlimited_expert',
      });

    if (error) {
      console.error("Error creating subscription:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось активировать подписку",
        variant: "destructive",
      });
      return;
    }

    await fetchSubscription();
    toast({
      title: "Подписка без лимитов активирована",
      description: "Теперь вы можете генерировать XML-схемы заключения экспертизы без ограничений",
    });
  };

  // Record generation transaction (for pay-per-generation)
  const recordGeneration = async (documentType: string, amountRub: number): Promise<boolean> => {
    if (!companyId || !subscription) return false;

    const { error } = await supabase
      .from("generation_transactions")
      .insert({
        company_id: companyId,
        subscription_id: subscription.id,
        document_type: documentType,
        amount_rub: amountRub,
        status: 'completed',
      });

    if (error) {
      console.error("Error recording generation:", error);
      return false;
    }

    return true;
  };

  // Initial fetch
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        fetchOfferStatus(),
        fetchSubscription(),
        fetchDocumentPrices(),
      ]);
      setLoading(false);
    };

    if (companyId) {
      fetchAll();
    } else {
      setLoading(false);
    }
  }, [companyId, fetchOfferStatus, fetchSubscription, fetchDocumentPrices]);

  return {
    loading,
    offerAccepted,
    offerDetails,
    subscription,
    documentPrices,
    acceptOffer,
    activatePayPerGeneration,
    activateUnlimitedExpert,
    recordGeneration,
    refetch: async () => {
      await Promise.all([fetchOfferStatus(), fetchSubscription()]);
    },
  };
}
