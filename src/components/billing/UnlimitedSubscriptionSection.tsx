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
import { Check, CreditCard, FileText, Infinity, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UnlimitedSubscriptionSectionProps {
  offerAccepted: boolean;
  hasActiveUnlimited: boolean;
  onPurchaseCard: () => void;
  onPurchaseInvoice: (inn: string, companyName: string, email: string) => void;
}

const UnlimitedSubscriptionSection = ({
  offerAccepted,
  hasActiveUnlimited,
  onPurchaseCard,
  onPurchaseInvoice,
}: UnlimitedSubscriptionSectionProps) => {
  const { toast } = useToast();
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [inn, setInn] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateInvoice = () => {
    if (!inn || !companyName || !email) {
      toast({
        title: "Заполните все поля",
        description: "Укажите ИНН, название организации и email бухгалтера",
        variant: "destructive",
      });
      return;
    }

    onPurchaseInvoice(inn, companyName, email);
    setInvoiceDialogOpen(false);
    setInn("");
    setCompanyName("");
    setEmail("");
  };

  const renderButton = (
    text: string,
    onClick: () => void,
    variant: "default" | "outline" = "default",
    icon?: React.ReactNode
  ) => {
    const button = (
      <Button variant={variant} onClick={onClick} disabled={!offerAccepted || hasActiveUnlimited}>
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

  return (
    <>
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Infinity className="h-5 w-5 text-primary" />
              Подписка без лимитов
            </CardTitle>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              Для экспертных организаций
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              XML-схема заключения экспертизы
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">12 000 ₽</span>
              <span className="text-muted-foreground">/ месяц</span>
            </div>
          </div>

          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-success flex-shrink-0" />
              <span>Неограниченное количество генераций</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-success flex-shrink-0" />
              <span>Приоритетная обработка</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-success flex-shrink-0" />
              <span>Доступ к API (по запросу)</span>
            </li>
          </ul>

          {hasActiveUnlimited ? (
            <Badge className="bg-success/10 text-success">
              <Check className="h-3.5 w-3.5 mr-1.5" />
              Подписка активна
            </Badge>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              {renderButton(
                "Оплатить картой",
                onPurchaseCard,
                "default",
                <CreditCard className="h-4 w-4 mr-2" />
              )}
              {renderButton(
                "Получить счёт",
                () => setInvoiceDialogOpen(true),
                "outline",
                <FileText className="h-4 w-4 mr-2" />
              )}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Оплата означает принятие условий публичной оферты.
          </p>
        </CardContent>
      </Card>

      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выставить счёт</DialogTitle>
            <DialogDescription>
              Укажите реквизиты организации для выставления счёта на подписку без лимитов
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="font-medium">Подписка без лимитов</p>
              <p className="text-sm text-muted-foreground">
                XML-схема заключения экспертизы • 12 000 ₽ / месяц
              </p>
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="email">Email бухгалтера</Label>
              <Input
                id="email"
                type="email"
                placeholder="buh@company.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default UnlimitedSubscriptionSection;
