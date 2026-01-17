import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, CreditCard, FileText, Infinity } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { SubscriptionType } from "@/lib/pricing";

interface CurrentSubscriptionSectionProps {
  offerAccepted: boolean;
  subscriptionType: SubscriptionType;
  subscriptionName?: string;
  expiresAt?: string;
  isActive: boolean;
  onSubscribe: () => void;
  onManage: () => void;
}

const CurrentSubscriptionSection = ({
  offerAccepted,
  subscriptionType,
  subscriptionName,
  expiresAt,
  isActive,
  onSubscribe,
  onManage,
}: CurrentSubscriptionSectionProps) => {
  const renderButton = (
    text: string,
    onClick: () => void,
    variant: "default" | "outline" = "default",
    icon?: React.ReactNode
  ) => {
    const button = (
      <Button variant={variant} onClick={onClick} disabled={!offerAccepted}>
        {icon}
        {text}
      </Button>
    );

    if (!offerAccepted) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{button}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Для продолжения необходимо принять публичную оферту</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  if (subscriptionType === 'none' || !isActive) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Текущий тариф
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="py-6 text-center">
            <p className="text-muted-foreground">
              У вас нет активной подписки
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Выберите тариф для начала работы с сервисом
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            {renderButton("Выбрать тариф", onSubscribe)}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (subscriptionType === 'pay_per_generation') {
    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Текущий тариф
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge className="bg-success/10 text-success hover:bg-success/20">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Подписка активна
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Подписка с оплатой за генерацию
            </h3>
            <p className="text-sm text-muted-foreground">
              Вы оплачиваете только фактическое формирование документов.
              Повторная генерация оплачивается отдельно.
            </p>
          </div>

          <div className="flex gap-3">
            {renderButton("Управление", onManage, "outline")}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (subscriptionType === 'unlimited_expert') {
    return (
      <Card className="border-primary/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Infinity className="h-5 w-5 text-primary" />
            Текущий тариф
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Подписка без лимитов
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              XML-схема заключения экспертизы
            </h3>
            <p className="text-sm text-muted-foreground">
              Без ограничений по количеству генераций
            </p>
          </div>

          {expiresAt && (
            <div className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Действует до: <strong>{expiresAt}</strong></span>
            </div>
          )}

          <div className="flex gap-3">
            {renderButton("Продлить подписку", onSubscribe)}
            {renderButton("Управление", onManage, "outline")}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default CurrentSubscriptionSection;
