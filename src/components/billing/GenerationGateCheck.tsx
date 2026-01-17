import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, FileText, Package, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type GateBlockReason = 'offer_not_accepted' | 'no_package' | 'insufficient_generations';

interface GenerationGateCheckProps {
  blockReason: GateBlockReason;
  requiredGenerations?: number;
  remainingGenerations?: number;
  onAcceptOffer?: () => void;
}

const GenerationGateCheck = ({
  blockReason,
  requiredGenerations,
  remainingGenerations,
  onAcceptOffer,
}: GenerationGateCheckProps) => {
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
      case 'no_package':
        return {
          icon: <Package className="h-12 w-12 text-muted-foreground" />,
          title: 'Нет активного пакета генераций',
          description: 'Для формирования XML-документов необходимо приобрести пакет генераций.',
          primaryAction: {
            label: 'Купить пакет',
            onClick: () => navigate('/dashboard/billing-documents'),
          },
        };
      case 'insufficient_generations':
        return {
          icon: <AlertTriangle className="h-12 w-12 text-warning" />,
          title: 'Недостаточно генераций для формирования выбранного документа',
          description: `Для этого документа требуется ${requiredGenerations} генераций. Осталось: ${remainingGenerations}. Пополните лимит генераций, чтобы продолжить работу.`,
          primaryAction: {
            label: 'Пополнить лимит',
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

export default GenerationGateCheck;
