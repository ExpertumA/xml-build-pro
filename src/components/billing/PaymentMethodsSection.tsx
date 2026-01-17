import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreditCard, Building2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethodsSectionProps {
  offerAccepted: boolean;
  paymentMethods?: Array<{
    id: string;
    type: 'card' | 'invoice';
    cardLastFour?: string;
    cardBrand?: string;
    cardExpMonth?: number;
    cardExpYear?: number;
    isDefault: boolean;
  }>;
  onAddCard: () => void;
  onCreateInvoice: (inn: string, companyName: string) => void;
}

const PaymentMethodsSection = ({ 
  offerAccepted, 
  paymentMethods = [],
  onAddCard,
  onCreateInvoice 
}: PaymentMethodsSectionProps) => {
  const { toast } = useToast();
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [inn, setInn] = useState("");
  const [companyName, setCompanyName] = useState("");

  const defaultCard = paymentMethods.find(m => m.type === 'card' && m.isDefault) || {
    cardLastFour: "4242",
    cardBrand: "Visa",
    cardExpMonth: 12,
    cardExpYear: 26,
    isDefault: true,
  };

  const handleCreateInvoice = () => {
    if (!inn || !companyName) {
      toast({
        title: "Заполните все поля",
        description: "Укажите ИНН и название организации",
        variant: "destructive",
      });
      return;
    }
    onCreateInvoice(inn, companyName);
    setInvoiceDialogOpen(false);
    setInn("");
    setCompanyName("");
    toast({
      title: "Счёт сформирован",
      description: "Счёт на оплату успешно создан",
    });
  };

  const renderCardButton = (variant: "outline", text: string, onClick: () => void) => {
    const button = (
      <Button variant={variant} className="flex-1" onClick={onClick} disabled={!offerAccepted}>
        {text}
      </Button>
    );

    if (!offerAccepted) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex-1">{button}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Для продолжения необходимо принять публичную оферту</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Способы оплаты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Card payment */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Оплата банковской картой
            </h4>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
              <div className="h-12 w-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {defaultCard.cardBrand} •••• {defaultCard.cardLastFour}
                </p>
                <p className="text-sm text-muted-foreground">
                  Истекает {defaultCard.cardExpMonth}/{defaultCard.cardExpYear}
                </p>
              </div>
              {defaultCard.isDefault && (
                <Badge variant="secondary">По умолчанию</Badge>
              )}
            </div>
            <div className="flex gap-3">
              {renderCardButton("outline", "Изменить карту", onAddCard)}
              {renderCardButton("outline", "Добавить карту", onAddCard)}
            </div>
            <p className="text-xs text-muted-foreground">
              При оплате картой формируется кассовый чек в соответствии с ФЗ-54.
            </p>
          </div>

          {/* Invoice payment */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Оплата по счёту (для юрлиц)
            </h4>
            {offerAccepted ? (
              <Button variant="outline" onClick={() => setInvoiceDialogOpen(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Выставить счёт
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button variant="outline" disabled>
                      <FileText className="h-4 w-4 mr-2" />
                      Выставить счёт
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Для продолжения необходимо принять публичную оферту</p>
                </TooltipContent>
              </Tooltip>
            )}
            <p className="text-xs text-muted-foreground">
              Оплата счёта означает принятие условий публичной оферты.
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выставить счёт</DialogTitle>
            <DialogDescription>
              Укажите реквизиты организации для выставления счёта
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="inn">ИНН</Label>
              <Input
                id="inn"
                placeholder="7707123456"
                value={inn}
                onChange={(e) => setInn(e.target.value)}
                maxLength={12}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-name">Название организации</Label>
              <Input
                id="company-name"
                placeholder="ООО «Компания»"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateInvoice}>
              Сформировать счёт
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentMethodsSection;
