import { AlertCircle, CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import type { SubscriptionType } from "@/lib/pricing";

interface GenerationPaymentConfirmationProps {
  documentName: string;
  priceRub: number;
  subscriptionType: SubscriptionType;
}

const GenerationPaymentConfirmation = ({
  documentName,
  priceRub,
  subscriptionType,
}: GenerationPaymentConfirmationProps) => {
  // For unlimited subscription, no payment info needed
  if (subscriptionType === 'unlimited_expert') {
    return (
      <div className="rounded-lg border border-success/50 bg-success/5 p-4 space-y-2">
        <div className="flex items-start gap-3">
          <CreditCard className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-sm">
              Генерация включена в подписку
            </p>
            <p className="text-xs text-muted-foreground">
              XML-схема заключения экспертизы доступна без ограничений.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // For pay-per-generation
  return (
    <div className="rounded-lg border border-warning/50 bg-warning/5 p-4 space-y-2">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-sm">
            Формирование данного документа оплачивается отдельно
          </p>
          <p className="text-sm">
            Стоимость: <strong>{formatPrice(priceRub)}</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            После запуска генерации отмена невозможна.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenerationPaymentConfirmation;
