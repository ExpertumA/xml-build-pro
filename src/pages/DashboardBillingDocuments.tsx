import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OfferSection from "@/components/billing/OfferSection";
import PaymentMethodsSection from "@/components/billing/PaymentMethodsSection";
import InvoicesSection from "@/components/billing/InvoicesSection";
import ClosingDocumentsSection from "@/components/billing/ClosingDocumentsSection";
import PaymentHistorySection from "@/components/billing/PaymentHistorySection";
import { useToast } from "@/hooks/use-toast";
import { useBillingData } from "@/hooks/useBillingData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  CreditCard, 
  FileText, 
  Zap, 
  Building2, 
  Infinity, 
  Users, 
  Briefcase, 
  User,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { formatPrice } from "@/lib/pricing";

const DashboardBillingDocuments = () => {
  const { toast } = useToast();
  const {
    offerAccepted,
    offerDetails,
    subscription,
    documentPrices,
    acceptOffer,
    activatePayPerGeneration,
    activateUnlimitedExpert,
  } = useBillingData();

  const handleAcceptOffer = (method: string, phone?: string) => {
    acceptOffer(method, phone);
  };

  const handleActivatePayPerGeneration = () => {
    activatePayPerGeneration();
    toast({
      title: "Тариф активирован",
      description: "Оплата за генерацию документов",
    });
  };

  const handlePurchaseUnlimitedCard = () => {
    activateUnlimitedExpert();
    toast({
      title: "Подписка активирована",
      description: "Подписка без лимитов активна",
    });
  };

  const handleAddCard = () => {
    toast({
      title: "Добавление карты",
      description: "Функция будет доступна в ближайшее время",
    });
  };

  const handleCreateInvoice = (inn: string, companyName: string) => {
    console.log("Creating invoice for:", { inn, companyName });
  };

  const subscriptionType = subscription?.type || 'none';
  const hasActiveSubscription = subscription?.isActive;

  // Filter pay-per-generation documents
  const payPerGenDocs = documentPrices.filter(
    (p) => p.documentType !== 'expertise_conclusion'
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Биллинг и документы</h1>
          <p className="text-muted-foreground">
            Управление тарифами, счетами и документами
          </p>
        </div>

        {/* Tariffs Grid - Always visible */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Pay per generation */}
          <Card className={`relative ${subscriptionType === 'pay_per_generation' && hasActiveSubscription ? 'border-success/50 bg-success/5' : ''}`}>
            {subscriptionType === 'pay_per_generation' && hasActiveSubscription && (
              <Badge className="absolute top-3 right-3 bg-success/10 text-success hover:bg-success/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Активен
              </Badge>
            )}
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Оплата за генерацию</CardTitle>
                  <CardDescription className="text-xs">Для проектных организаций</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  <Briefcase className="h-2.5 w-2.5 mr-1" />
                  Проектировщики
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Users className="h-2.5 w-2.5 mr-1" />
                  ГИПы
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <User className="h-2.5 w-2.5 mr-1" />
                  Частные лица
                </Badge>
              </div>

              <div className="divide-y">
                {payPerGenDocs.map((doc) => (
                  <div key={doc.documentType} className="flex items-center justify-between py-1.5 text-sm">
                    <span className="text-muted-foreground truncate mr-2">{doc.documentName}</span>
                    {doc.isAvailable ? (
                      <span className="font-semibold whitespace-nowrap">{formatPrice(doc.priceRub)}</span>
                    ) : (
                      <Badge variant="outline" className="text-xs">Скоро</Badge>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                Оплата только при генерации. Повторная — отдельно.
              </p>

              {subscriptionType === 'pay_per_generation' && hasActiveSubscription ? (
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Текущий тариф
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  className="w-full" 
                  onClick={handleActivatePayPerGeneration}
                  disabled={!offerAccepted}
                >
                  {offerAccepted ? 'Активировать бесплатно' : 'Сначала примите оферту'}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Unlimited for experts */}
          <Card className={`relative ${subscriptionType === 'unlimited_expert' && hasActiveSubscription ? 'border-primary/50 bg-primary/5' : 'border-primary/20 bg-gradient-to-br from-primary/5 to-transparent'}`}>
            {subscriptionType === 'unlimited_expert' && hasActiveSubscription ? (
              <Badge className="absolute top-3 right-3 bg-primary/10 text-primary hover:bg-primary/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Активен
              </Badge>
            ) : (
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                <Infinity className="h-3 w-3 mr-1" />
                Безлимит
              </Badge>
            )}
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Подписка без лимитов</CardTitle>
                  <CardDescription className="text-xs">Для экспертных организаций</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant="outline" className="text-xs">
                <Building2 className="h-2.5 w-2.5 mr-1" />
                Экспертные организации
              </Badge>

              <div>
                <p className="text-sm font-medium">XML-схема заключения экспертизы</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold">12 000 ₽</span>
                  <span className="text-muted-foreground text-sm">/ месяц</span>
                </div>
              </div>

              <ul className="space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-success" />
                  Неограниченные генерации
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-success" />
                  Приоритетная обработка
                </li>
              </ul>

              {subscriptionType === 'unlimited_expert' && hasActiveSubscription ? (
                <div className="space-y-2">
                  {subscription?.expiresAt && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Действует до: {subscription.expiresAt}
                    </p>
                  )}
                  <Button variant="outline" size="sm" className="w-full">
                    Продлить подписку
                  </Button>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  className="w-full" 
                  onClick={handlePurchaseUnlimitedCard}
                  disabled={!offerAccepted}
                >
                  <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                  {offerAccepted ? 'Оплатить' : 'Сначала примите оферту'}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Offer Section - Compact */}
        <OfferSection
          offerAccepted={offerAccepted}
          offerDetails={offerDetails}
          onAcceptOffer={handleAcceptOffer}
        />

        {/* Payment & Documents Tabs */}
        <Tabs defaultValue="payment" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payment">Оплата</TabsTrigger>
            <TabsTrigger value="invoices">Счета</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>

          <TabsContent value="payment" className="mt-4">
            <PaymentMethodsSection
              offerAccepted={offerAccepted}
              onAddCard={handleAddCard}
              onCreateInvoice={handleCreateInvoice}
            />
          </TabsContent>

          <TabsContent value="invoices" className="mt-4 space-y-4">
            <InvoicesSection />
            <ClosingDocumentsSection />
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <PaymentHistorySection />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardBillingDocuments;
