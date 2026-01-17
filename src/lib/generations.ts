// Document type to price mapping (synced with database)
export const DOCUMENT_PRICES_MAP: Record<string, number> = {
  design_assignment: 2500,
  explanatory_note: 3000,
  engineering_xml: 0,
  expertise_conclusion: 0, // Unlimited subscription
};

// Document type labels (for display)
export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  design_assignment: 'Задание на проектирование',
  explanatory_note: 'Пояснительная записка (Раздел №1)',
  engineering_xml: 'XML-схемы этапа инженерных изысканий и проектирования',
  expertise_conclusion: 'XML-схема заключения экспертизы',
};

// Get price for a document type
export function getDocumentPrice(documentType: string): number {
  return DOCUMENT_PRICES_MAP[documentType] || 0;
}

// Check if document is available for subscription type
export type SubscriptionType = 'pay_per_generation' | 'unlimited_expert' | 'none';

export interface GenerationCheckResult {
  canGenerate: boolean;
  blockReason?: 'offer_not_accepted' | 'no_subscription' | 'subscription_expired' | 'document_not_available';
  priceRub: number;
  documentName: string;
  subscriptionType: SubscriptionType;
}

export function checkGenerationAvailability(
  documentType: string,
  offerAccepted: boolean,
  subscriptionType: SubscriptionType,
  subscriptionActive: boolean
): GenerationCheckResult {
  const priceRub = getDocumentPrice(documentType);
  const documentName = DOCUMENT_TYPE_LABELS[documentType] || documentType;

  if (!offerAccepted) {
    return {
      canGenerate: false,
      blockReason: 'offer_not_accepted',
      priceRub,
      documentName,
      subscriptionType,
    };
  }

  if (subscriptionType === 'none') {
    return {
      canGenerate: false,
      blockReason: 'no_subscription',
      priceRub,
      documentName,
      subscriptionType,
    };
  }

  if (!subscriptionActive) {
    return {
      canGenerate: false,
      blockReason: 'subscription_expired',
      priceRub,
      documentName,
      subscriptionType,
    };
  }

  // Check document availability for subscription type
  if (subscriptionType === 'unlimited_expert') {
    if (documentType !== 'expertise_conclusion') {
      return {
        canGenerate: false,
        blockReason: 'document_not_available',
        priceRub,
        documentName,
        subscriptionType,
      };
    }
  }

  if (subscriptionType === 'pay_per_generation') {
    if (documentType === 'expertise_conclusion') {
      return {
        canGenerate: false,
        blockReason: 'document_not_available',
        priceRub,
        documentName,
        subscriptionType,
      };
    }
    // Check if document is available (not "coming soon")
    if (documentType === 'engineering_xml') {
      return {
        canGenerate: false,
        blockReason: 'document_not_available',
        priceRub,
        documentName,
        subscriptionType,
      };
    }
  }

  return {
    canGenerate: true,
    priceRub,
    documentName,
    subscriptionType,
  };
}

// Format price for display
export function formatPriceRub(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}
