// Document pricing configuration
// Prices are in rubles (₽)

export interface DocumentPrice {
  documentType: string;
  documentName: string;
  priceRub: number;
  isAvailable: boolean;
}

// Default prices (synced with database)
export const DOCUMENT_PRICES: Record<string, DocumentPrice> = {
  explanatory_note: {
    documentType: 'explanatory_note',
    documentName: 'Пояснительная записка (Раздел №1)',
    priceRub: 3000,
    isAvailable: true,
  },
  design_assignment: {
    documentType: 'design_assignment',
    documentName: 'Задание на проектирование',
    priceRub: 2500,
    isAvailable: true,
  },
  engineering_xml: {
    documentType: 'engineering_xml',
    documentName: 'XML-схемы этапа инженерных изысканий и проектирования',
    priceRub: 0,
    isAvailable: false,
  },
  expertise_conclusion: {
    documentType: 'expertise_conclusion',
    documentName: 'XML-схема заключения экспертизы',
    priceRub: 0,
    isAvailable: true,
  },
};

// Subscription types
export type SubscriptionType = 'pay_per_generation' | 'unlimited_expert' | 'none';

export interface SubscriptionInfo {
  type: SubscriptionType;
  name: string;
  description: string;
  expiresAt?: string;
  isActive: boolean;
}

// Get document price
export function getDocumentPrice(documentType: string): number {
  return DOCUMENT_PRICES[documentType]?.priceRub || 0;
}

// Check if document type is available for subscription
export function isDocumentAvailableForSubscription(
  documentType: string,
  subscriptionType: SubscriptionType
): boolean {
  if (subscriptionType === 'none') return false;
  
  if (subscriptionType === 'unlimited_expert') {
    // Only expertise_conclusion is available for unlimited expert
    return documentType === 'expertise_conclusion';
  }
  
  if (subscriptionType === 'pay_per_generation') {
    // All available documents except expertise_conclusion
    const doc = DOCUMENT_PRICES[documentType];
    return doc?.isAvailable && documentType !== 'expertise_conclusion';
  }
  
  return false;
}

// Format price for display
export function formatPrice(priceRub: number): string {
  return `${priceRub.toLocaleString('ru-RU')} ₽`;
}
