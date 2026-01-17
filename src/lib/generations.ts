// Document type to generations cost mapping
// This is hidden from users - they only see the final count
export const DOCUMENT_GENERATION_COSTS: Record<string, number> = {
  design_assignment: 1,          // Задание на проектирование
  explanatory_note: 2,           // Пояснительная записка (Раздел 1)
  market_analysis: 2,            // Результаты конъюнктурного анализа
  work_volume: 3,                // Ведомость объёмов работ
  expertise_conclusion: 4,       // XML-схема заключения экспертизы
};

// Document type labels (for display)
export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  design_assignment: 'Задание на проектирование',
  explanatory_note: 'Пояснительная записка',
  market_analysis: 'Результаты конъюнктурного анализа',
  work_volume: 'Ведомость объёмов работ',
  expertise_conclusion: 'XML-схема заключения экспертизы',
};

// Get generations cost for a document type
export function getGenerationsCost(documentType: string): number {
  return DOCUMENT_GENERATION_COSTS[documentType] || 1;
}

// Check if user can generate document
export interface GenerationCheckResult {
  canGenerate: boolean;
  blockReason?: 'offer_not_accepted' | 'no_package' | 'insufficient_generations';
  requiredGenerations: number;
  remainingGenerations: number;
}

export function checkGenerationAvailability(
  documentType: string,
  offerAccepted: boolean,
  packageStatus: 'active' | 'exhausted' | 'expired' | 'inactive',
  remainingGenerations: number
): GenerationCheckResult {
  const requiredGenerations = getGenerationsCost(documentType);

  if (!offerAccepted) {
    return {
      canGenerate: false,
      blockReason: 'offer_not_accepted',
      requiredGenerations,
      remainingGenerations,
    };
  }

  if (packageStatus !== 'active' && packageStatus !== 'exhausted') {
    return {
      canGenerate: false,
      blockReason: 'no_package',
      requiredGenerations,
      remainingGenerations,
    };
  }

  if (remainingGenerations < requiredGenerations) {
    return {
      canGenerate: false,
      blockReason: 'insufficient_generations',
      requiredGenerations,
      remainingGenerations,
    };
  }

  return {
    canGenerate: true,
    requiredGenerations,
    remainingGenerations,
  };
}

// Pluralize "генерация" in Russian
export function getGenerationsWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'генераций';
  }

  if (lastDigit === 1) {
    return 'генерация';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'генерации';
  }

  return 'генераций';
}
