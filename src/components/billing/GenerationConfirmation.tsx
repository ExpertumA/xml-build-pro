import { AlertCircle } from "lucide-react";

interface GenerationConfirmationProps {
  generationsRequired: number;
  documentType: string;
}

const GenerationConfirmation = ({
  generationsRequired,
  documentType,
}: GenerationConfirmationProps) => {
  return (
    <div className="rounded-lg border border-warning/50 bg-warning/5 p-4 space-y-2">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-sm">
            Для формирования документа будет использовано {generationsRequired} {getGenerationsWord(generationsRequired)}.
          </p>
          <p className="text-xs text-muted-foreground">
            После запуска генерации списание отмене не подлежит.
          </p>
        </div>
      </div>
    </div>
  );
};

function getGenerationsWord(count: number): string {
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

export default GenerationConfirmation;
