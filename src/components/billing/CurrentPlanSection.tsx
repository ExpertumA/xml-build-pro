import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CurrentPlanSectionProps {
  offerAccepted: boolean;
  plan?: {
    name: string;
    isActive: boolean;
    priceMonthly: number;
    usedDocuments: number;
    totalDocuments: number;
    features: string[];
    hasDebt?: boolean;
    debtAmount?: number;
  };
  onChangePlan: () => void;
  onPay: () => void;
}

const CurrentPlanSection = ({ offerAccepted, plan, onChangePlan, onPay }: CurrentPlanSectionProps) => {
  const defaultPlan = plan || {
    name: "Pro",
    isActive: true,
    priceMonthly: 14990,
    usedDocuments: 24,
    totalDocuments: 50,
    features: [
      "До 50 документов в месяц",
      "Все типы XML-схем",
      "Приоритетная поддержка",
      "API доступ",
    ],
    hasDebt: false,
    debtAmount: 0,
  };

  const usagePercent = (defaultPlan.usedDocuments / defaultPlan.totalDocuments) * 100;

  const renderActionButton = (
    <Button 
      variant="outline" 
      onClick={onChangePlan}
      disabled={!offerAccepted}
    >
      Изменить тариф
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Текущий тариф</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">{defaultPlan.name}</h3>
              <Badge className={defaultPlan.isActive 
                ? "bg-success/10 text-success hover:bg-success/20" 
                : "bg-destructive/10 text-destructive"
              }>
                {defaultPlan.isActive ? "Активен" : "Не активен"}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {defaultPlan.priceMonthly.toLocaleString()} ₽ / месяц
            </p>
          </div>
          {offerAccepted ? (
            renderActionButton
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  {renderActionButton}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Для продолжения необходимо принять публичную оферту</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Использовано документов</span>
            <span className="font-medium">
              {defaultPlan.usedDocuments} из {defaultPlan.totalDocuments}
            </span>
          </div>
          <Progress value={usagePercent} className="h-2" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Включено в тариф:</p>
          <ul className="space-y-1.5">
            {defaultPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {defaultPlan.hasDebt && defaultPlan.debtAmount && defaultPlan.debtAmount > 0 && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">
                Задолженность: {defaultPlan.debtAmount.toLocaleString()} ₽
              </span>
            </div>
            {offerAccepted ? (
              <Button size="sm" variant="destructive" onClick={onPay}>
                Оплатить
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button size="sm" variant="destructive" disabled>
                      Оплатить
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Для продолжения необходимо принять публичную оферту</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Следующее списание: 01.02.2025
        </p>
      </CardContent>
    </Card>
  );
};

export default CurrentPlanSection;
