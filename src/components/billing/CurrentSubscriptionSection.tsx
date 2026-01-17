import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, CreditCard, Infinity, Zap } from "lucide-react";
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

  if (subscriptionType === 'none' || !isActive) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Тариф не выбран</p>
                <p className="text-sm text-muted-foreground">
                  Выберите тариф для начала работы с сервисом
                </p>
              </div>
            </div>
            <Button onClick={onSubscribe} disabled={!offerAccepted}>
              Выбрать тариф
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (subscriptionType === 'pay_per_generation') {
    return (
      <Card className="bg-success/5 border-success/30">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Оплата за генерацию</p>
                  <Badge className="bg-success/10 text-success hover:bg-success/20 text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Активен
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Оплата при каждой генерации документа
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onSubscribe}>
              Сменить тариф
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (subscriptionType === 'unlimited_expert') {
    return (
      <Card className="bg-primary/5 border-primary/30">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Infinity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Подписка без лимитов</p>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Активен
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>XML-схема заключения экспертизы</span>
                  {expiresAt && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        до {expiresAt}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onSubscribe}>
              Продлить
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default CurrentSubscriptionSection;
