import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, FileText, Sparkles, Zap, Crown, TestTube2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: string;
  name: string;
  description: string | null;
  price_monthly: number;
  credits_monthly: number;
  features: string[];
}

interface PackagePurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseCard: (packageId: string) => void;
  onPurchaseInvoice: (packageId: string, inn: string, companyName: string) => void;
  plans?: Plan[];
}

const getPackageIcon = (name: string) => {
  switch (name) {
    case "START":
      return <Zap className="h-6 w-6" />;
    case "PRO":
      return <Sparkles className="h-6 w-6" />;
    case "EXPERT":
      return <Crown className="h-6 w-6" />;
    case "TEST":
      return <TestTube2 className="h-6 w-6" />;
    default:
      return <Zap className="h-6 w-6" />;
  }
};

const getPackageOrder = (name: string): number => {
  switch (name) {
    case "TEST":
      return 0;
    case "START":
      return 1;
    case "PRO":
      return 2;
    case "EXPERT":
      return 3;
    default:
      return 4;
  }
};

const PackagePurchaseDialog = ({
  open,
  onOpenChange,
  onPurchaseCard,
  onPurchaseInvoice,
  plans = [],
}: PackagePurchaseDialogProps) => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [inn, setInn] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Sort plans by custom order
  const sortedPlans = [...plans].sort(
    (a, b) => getPackageOrder(a.name) - getPackageOrder(b.name)
  );

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handlePayCard = () => {
    if (!selectedPackage) {
      toast({
        title: "Выберите пакет",
        description: "Пожалуйста, выберите пакет генераций",
        variant: "destructive",
      });
      return;
    }
    
    const plan = plans.find((p) => p.id === selectedPackage);
    const packageKey = plan?.name.toLowerCase() || selectedPackage;
    onPurchaseCard(packageKey);
    onOpenChange(false);
    setSelectedPackage(null);
  };

  const handleGetInvoice = () => {
    if (!selectedPackage) {
      toast({
        title: "Выберите пакет",
        description: "Пожалуйста, выберите пакет генераций",
        variant: "destructive",
      });
      return;
    }
    setShowInvoiceForm(true);
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
    
    const plan = plans.find((p) => p.id === selectedPackage);
    const packageKey = plan?.name.toLowerCase() || selectedPackage!;
    onPurchaseInvoice(packageKey, inn, companyName);
    onOpenChange(false);
    setSelectedPackage(null);
    setShowInvoiceForm(false);
    setInn("");
    setCompanyName("");
  };

  const handleBack = () => {
    setShowInvoiceForm(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedPackage(null);
    setShowInvoiceForm(false);
    setInn("");
    setCompanyName("");
  };

  const selectedPlan = plans.find((p) => p.id === selectedPackage);
  const isTestPackage = selectedPlan?.name === "TEST";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {showInvoiceForm ? "Выставить счёт" : "Покупка пакета генераций"}
          </DialogTitle>
          <DialogDescription>
            {showInvoiceForm
              ? "Укажите реквизиты организации для выставления счёта"
              : "Выберите пакет, соответствующий вашим потребностям"}
          </DialogDescription>
        </DialogHeader>

        {!showInvoiceForm ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
              {sortedPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all relative ${
                    selectedPackage === plan.id
                      ? "ring-2 ring-primary border-primary"
                      : "hover:border-primary/50"
                  } ${plan.name === "PRO" ? "border-primary" : ""} ${
                    plan.name === "TEST" ? "border-dashed" : ""
                  }`}
                  onClick={() => handleSelectPackage(plan.id)}
                >
                  {plan.name === "PRO" && (
                    <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary">
                      Рекомендуемый
                    </Badge>
                  )}
                  {plan.name === "TEST" && (
                    <Badge
                      variant="outline"
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2"
                    >
                      Бесплатно
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-2">
                    <div
                      className={`mx-auto mb-2 h-12 w-12 rounded-full flex items-center justify-center ${
                        plan.name === "TEST"
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {getPackageIcon(plan.name)}
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div>
                      <p className="text-3xl font-bold">{plan.credits_monthly}</p>
                      <p className="text-sm text-muted-foreground">генераций</p>
                    </div>
                    <div className="text-sm text-muted-foreground">30 дней</div>
                    <div className="text-2xl font-semibold">
                      {plan.price_monthly === 0
                        ? "Бесплатно"
                        : `${plan.price_monthly.toLocaleString()} ₽`}
                    </div>

                    <div className="text-left space-y-2 pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground uppercase">
                        Поддерживаемые документы:
                      </p>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {isTestPackage ? (
                <Button
                  size="lg"
                  onClick={handlePayCard}
                  disabled={!selectedPackage}
                  className="gap-2"
                >
                  <TestTube2 className="h-4 w-4" />
                  Активировать бесплатно
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={handlePayCard}
                    disabled={!selectedPackage}
                    className="gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Оплатить картой
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleGetInvoice}
                    disabled={!selectedPackage || isTestPackage}
                    className="gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Получить счёт
                  </Button>
                </>
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              {isTestPackage
                ? "Тестовый пакет позволяет ознакомиться с сервисом без оплаты."
                : "Оплата означает принятие условий публичной оферты."}
            </p>
          </>
        ) : (
          <>
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="font-medium">Выбранный пакет: {selectedPlan?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedPlan?.credits_monthly} генераций •{" "}
                  {selectedPlan?.price_monthly.toLocaleString()} ₽
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleBack}>
                Назад
              </Button>
              <Button onClick={handleCreateInvoice}>Сформировать счёт</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PackagePurchaseDialog;
