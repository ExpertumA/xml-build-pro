import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, FileText, ShieldAlert, Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SubscriptionType } from "@/lib/pricing";
import { formatPrice } from "@/lib/pricing";

export type GateBlockReason = 
  | 'offer_not_accepted' 
  | 'no_subscription' 
  | 'document_not_available'
  | 'subscription_expired';

interface GenerationGateCheckNewProps {
  blockReason: GateBlockReason;
  documentName?: string;
  subscriptionType?: SubscriptionType;
  onAcceptOffer?: () => void;
}

const GenerationGateCheckNew = ({
  blockReason,
  documentName,
  subscriptionType,
  onAcceptOffer,
}: GenerationGateCheckNewProps) => {
  const navigate = useNavigate();

  const getBlockContent = () => {
    switch (blockReason) {
      case 'offer_not_accepted':
        return {
          icon: <ShieldAlert className="h-12 w-12 text-warning" />,
          title: 'Для продолжения необходимо принять публичную оферту',
          description: 'Вы не сможете генерировать документы без принятия условий публичной оферты.',
          primaryAction: {
            label: 'Принять оферту',
            onClick: onAcceptOffer,
          },
          secondaryAction: {
            label: 'Перейти в биллинг',
            onClick: () => navigate('/dashboard/billing-documents'),
          },
        };
      case 'no_subscription':
        return {
          icon: <FileText className="h-12 w-12 text-muted-foreground" />,
          title: 'Нет активной подписки',
          description: 'Для формирования XML-документов необходимо оформить подписку.',
          primaryAction: {
            label: 'Выбрать тариф',
            onClick: () => navigate('/dashboard/billing-documents'),
          },
        };
      case 'subscription_expired':
        return {
          icon: <AlertTriangle className="h-12 w-12 text-warning" />,
          title: 'Срок подписки истёк',
          description: 'Продлите подписку для продолжения работы с сервисом.',
          primaryAction: {
            label: 'Продлить подписку',
            onClick: () => navigate('/dashboard/billing-documents'),
          },
        };
      case 'document_not_available':
        const isUnlimitedUser = subscriptionType === 'unlimited_expert';
        return {
          icon: <Ban className="h-12 w-12 text-muted-foreground" />,
          title: 'Документ недоступен для вашего тарифа',
          description: isUnlimitedUser
            ? `Подписка без лимитов включает только XML-схему заключения экспертизы. Для генерации "${documentName}" требуется подписка с оплатой за генерацию.`
            : `Документ "${documentName}" недоступен для вашего тарифа.`,
          primaryAction: {
            label: 'Перейти в биллинг',
            onClick: () => navigate('/dashboard/billing-documents'),
          },
        };
    }
  };

  const content = getBlockContent();

  return (
    <Card className="max-w-lg mx-auto">
      <CardContent className="pt-8 pb-6 text-center space-y-6">
        <div className="flex justify-center">
          {content.icon}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{content.title}</h3>
          <p className="text-sm text-muted-foreground">{content.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={content.primaryAction.onClick}>
            {content.primaryAction.label}
          </Button>
          {content.secondaryAction && (
            <Button variant="outline" onClick={content.secondaryAction.onClick}>
              {content.secondaryAction.label}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationGateCheckNew;
