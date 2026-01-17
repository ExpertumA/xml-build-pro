import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OfferSection from "@/components/billing/OfferSection";
import CurrentSubscriptionSection from "@/components/billing/CurrentSubscriptionSection";
import DocumentPricesSection from "@/components/billing/DocumentPricesSection";
import UnlimitedSubscriptionSection from "@/components/billing/UnlimitedSubscriptionSection";
import PaymentMethodsSection from "@/components/billing/PaymentMethodsSection";
import InvoicesSection from "@/components/billing/InvoicesSection";
import ClosingDocumentsSection from "@/components/billing/ClosingDocumentsSection";
import PaymentHistorySection from "@/components/billing/PaymentHistorySection";
import { useToast } from "@/hooks/use-toast";
import { useCompany } from "@/hooks/useCompany";
import { useBillingDataNew } from "@/hooks/useBillingDataNew";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, FileText, Zap } from "lucide-react";

const DashboardBillingDocuments = () => {
  const { toast } = useToast();
  const { company, loading: companyLoading } = useCompany();
  const {
    loading: billingLoading,
    offerAccepted,
    offerDetails,
    subscription,
    documentPrices,
    acceptOffer,
    activatePayPerGeneration,
    activateUnlimitedExpert,
  } = useBillingDataNew(company?.id || null);

  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  const loading = companyLoading || billingLoading;

  const handleAcceptOffer = async (method: string, phone?: string) => {
    await acceptOffer(method, phone);
  };

  const handleSubscribe = () => {
    setSubscriptionDialogOpen(true);
  };

  const handleActivatePayPerGeneration = async () => {
    await activatePayPerGeneration();
    setSubscriptionDialogOpen(false);
  };

  const handlePurchaseUnlimitedCard = async () => {
    await activateUnlimitedExpert();
    toast({
      title: "Подписка активирована",
      description: "Чек отправлен на email",
    });
  };

  const handlePurchaseUnlimitedInvoice = (inn: string, companyName: string, email: string) => {
    console.log("Creating invoice for unlimited:", { inn, companyName, email });
    toast({
      title: "Счёт сформирован",
      description: "Счёт на оплату создан и доступен для скачивания",
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
  const hasActiveUnlimited = subscriptionType === 'unlimited_expert' && subscription?.isActive;
  const hasPayPerGeneration = subscriptionType === 'pay_per_generation' && subscription?.isActive;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">Биллинг и документы</h1>
            <p className="text-muted-foreground">
              Управление тарифами, счетами и закрывающими документами
            </p>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Биллинг и документы</h1>
          <p className="text-muted-foreground">
            Управление тарифами, счетами и закрывающими документами
          </p>
        </div>

        {/* Block A: Offer Section */}
        <OfferSection
          offerAccepted={offerAccepted}
          offerDetails={offerDetails}
          onAcceptOffer={handleAcceptOffer}
        />

        {/* Block B: Current Subscription */}
        <CurrentSubscriptionSection
          offerAccepted={offerAccepted}
          subscriptionType={subscriptionType}
          subscriptionName={subscription?.name}
          expiresAt={subscription?.expiresAt}
          isActive={subscription?.isActive || false}
          onSubscribe={handleSubscribe}
          onManage={() => {}}
        />

        {/* Block C: Document Prices (only for pay-per-generation) */}
        {(subscriptionType === 'pay_per_generation' || subscriptionType === 'none') && (
          <DocumentPricesSection prices={documentPrices} />
        )}

        {/* Block D: Unlimited Subscription for Experts */}
        <UnlimitedSubscriptionSection
          offerAccepted={offerAccepted}
          hasActiveUnlimited={hasActiveUnlimited}
          onPurchaseCard={handlePurchaseUnlimitedCard}
          onPurchaseInvoice={handlePurchaseUnlimitedInvoice}
        />

        {/* Block E: Payment Methods */}
        <PaymentMethodsSection
          offerAccepted={offerAccepted}
          onAddCard={handleAddCard}
          onCreateInvoice={handleCreateInvoice}
        />

        {/* Block F: Invoices */}
        <InvoicesSection />

        {/* Block F: Closing Documents */}
        <ClosingDocumentsSection />

        {/* Payment History */}
        <PaymentHistorySection />
      </div>

      {/* Subscription Selection Dialog */}
      <Dialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Выберите тариф</DialogTitle>
            <DialogDescription>
              Выберите подходящий тариф для работы с сервисом
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 py-4">
            {/* Pay per generation */}
            <Card 
              className="cursor-pointer hover:border-primary/50 transition-all"
              onClick={handleActivatePayPerGeneration}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Оплата за генерацию</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Для проектных организаций и частных лиц
                </p>
                <div className="text-left space-y-2 pt-2 border-t">
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Пояснительная записка — 3 000 ₽</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Задание на проектирование — 2 500 ₽</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-50" />
                      <span>XML-схемы ИИ и П — скоро</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full mt-4">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Активировать бесплатно
                </Button>
              </CardContent>
            </Card>

            {/* Unlimited for experts */}
            <Card 
              className="cursor-pointer hover:border-primary/50 transition-all border-primary/30"
              onClick={handlePurchaseUnlimitedCard}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Без лимитов</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Для экспертных организаций
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold">12 000 ₽</span>
                  <span className="text-muted-foreground">/ месяц</span>
                </div>
                <div className="text-left space-y-2 pt-2 border-t">
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span>XML-схема заключения экспертизы</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Неограниченное количество генераций</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full mt-4">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Оплатить
                </Button>
              </CardContent>
            </Card>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Оплата означает принятие условий публичной оферты.
          </p>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardBillingDocuments;
