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
import { Check, CreditCard, FileText, Sparkles, Zap, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PackageOption {
  id: string;
  name: string;
  generations: number;
  days: number;
  price: number;
  documents: string[];
  recommended?: boolean;
  features?: string[];
  icon: React.ReactNode;
}

const PACKAGES: PackageOption[] = [
  {
    id: 'start',
    name: 'START',
    generations: 10,
    days: 30,
    price: 15000,
    icon: <Zap className="h-6 w-6" />,
    documents: [
      'Задание на проектирование',
      'Пояснительная записка',
      'Конъюнктурный анализ',
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    generations: 30,
    days: 30,
    price: 39000,
    recommended: true,
    icon: <Sparkles className="h-6 w-6" />,
    documents: [
      'Все документы START',
      'Ведомость объёмов работ',
      'XML-схема заключения экспертизы',
    ],
    features: ['Все типы документов'],
  },
  {
    id: 'expert',
    name: 'EXPERT',
    generations: 60,
    days: 30,
    price: 69000,
    icon: <Crown className="h-6 w-6" />,
    documents: [
      'Все типы документов',
    ],
    features: ['Приоритетная обработка'],
  },
];

interface PackagePurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseCard: (packageId: string) => void;
  onPurchaseInvoice: (packageId: string, inn: string, companyName: string) => void;
}

const PackagePurchaseDialog = ({
  open,
  onOpenChange,
  onPurchaseCard,
  onPurchaseInvoice,
}: PackagePurchaseDialogProps) => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [inn, setInn] = useState("");
  const [companyName, setCompanyName] = useState("");

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
    onPurchaseCard(selectedPackage);
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
    onPurchaseInvoice(selectedPackage!, inn, companyName);
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {showInvoiceForm ? 'Выставить счёт' : 'Покупка пакета генераций'}
          </DialogTitle>
          <DialogDescription>
            {showInvoiceForm 
              ? 'Укажите реквизиты организации для выставления счёта'
              : 'Выберите пакет, соответствующий вашим потребностям'
            }
          </DialogDescription>
        </DialogHeader>

        {!showInvoiceForm ? (
          <>
            <div className="grid md:grid-cols-3 gap-4 py-4">
              {PACKAGES.map((pkg) => (
                <Card 
                  key={pkg.id}
                  className={`cursor-pointer transition-all relative ${
                    selectedPackage === pkg.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  } ${pkg.recommended ? 'border-primary' : ''}`}
                  onClick={() => handleSelectPackage(pkg.id)}
                >
                  {pkg.recommended && (
                    <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary">
                      Рекомендуемый
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div>
                      <p className="text-3xl font-bold">{pkg.generations}</p>
                      <p className="text-sm text-muted-foreground">генераций</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {pkg.days} дней
                    </div>
                    <div className="text-2xl font-semibold">
                      {pkg.price.toLocaleString()} ₽
                    </div>
                    
                    <div className="text-left space-y-2 pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground uppercase">
                        Поддерживаемые документы:
                      </p>
                      <ul className="space-y-1">
                        {pkg.documents.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                      {pkg.features && pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Sparkles className="h-4 w-4" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
                disabled={!selectedPackage}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Получить счёт
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Оплата означает принятие условий публичной оферты.
            </p>
          </>
        ) : (
          <>
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="font-medium">
                  Выбранный пакет: {PACKAGES.find(p => p.id === selectedPackage)?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {PACKAGES.find(p => p.id === selectedPackage)?.generations} генераций • {PACKAGES.find(p => p.id === selectedPackage)?.price.toLocaleString()} ₽
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
              <Button onClick={handleCreateInvoice}>
                Сформировать счёт
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PackagePurchaseDialog;
