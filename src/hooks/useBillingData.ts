import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { SubscriptionType } from "@/lib/pricing";

export interface OfferDetails {
  acceptedAt: string;
  version: string;
  method: string;
  ip?: string;
}

export interface SubscriptionData {
  type: SubscriptionType;
  name: string;
  isActive: boolean;
  expiresAt?: string;
}

export interface DocumentPrice {
  documentType: string;
  documentName: string;
  priceRub: number;
  isAvailable: boolean;
}

// Static test data
const TEST_DOCUMENT_PRICES: DocumentPrice[] = [
  {
    documentType: 'explanatory_note',
    documentName: 'Раздел №1 проектной документации «Пояснительная записка»',
    priceRub: 3000,
    isAvailable: true,
  },
  {
    documentType: 'design_assignment',
    documentName: 'Задание на проектирование',
    priceRub: 2500,
    isAvailable: true,
  },
  {
    documentType: 'engineering_xml',
    documentName: 'XML-схемы этапа инженерных изысканий и проектирования',
    priceRub: 0,
    isAvailable: false,
  },
];

export function useBillingData() {
  const { toast } = useToast();
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [offerDetails, setOfferDetails] = useState<OfferDetails | undefined>();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const documentPrices = TEST_DOCUMENT_PRICES;

  // Accept offer (test implementation)
  const acceptOffer = useCallback((method: string, phone?: string) => {
    const now = new Date();
    setOfferAccepted(true);
    setOfferDetails({
      acceptedAt: now.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      version: "1.0",
      method: method,
      ip: "192.168.1.1",
    });
    toast({
      title: "Оферта принята",
      description: "Условия публичной оферты успешно приняты",
    });
  }, [toast]);

  // Activate pay-per-generation subscription
  const activatePayPerGeneration = useCallback(() => {
    setSubscription({
      type: 'pay_per_generation',
      name: 'Подписка с оплатой за генерацию',
      isActive: true,
    });
    toast({
      title: "Тариф активирован",
      description: "Теперь вы можете генерировать документы с оплатой за каждую генерацию",
    });
  }, [toast]);

  // Activate unlimited expert subscription
  const activateUnlimitedExpert = useCallback(() => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    setSubscription({
      type: 'unlimited_expert',
      name: 'Подписка без лимитов',
      isActive: true,
      expiresAt: expiresAt.toLocaleDateString("ru-RU"),
    });
    toast({
      title: "Подписка активирована",
      description: "Теперь вы можете генерировать XML-схемы заключения экспертизы без ограничений",
    });
  }, [toast]);

  return {
    offerAccepted,
    offerDetails,
    subscription,
    documentPrices,
    acceptOffer,
    activatePayPerGeneration,
    activateUnlimitedExpert,
  };
}
