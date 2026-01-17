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
import { useBillingData } from "@/hooks/useBillingData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, CreditCard, FileText, Zap, Building2, Infinity, Users, Briefcase, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  const handleAcceptOffer = (method: string, phone?: string) => {
    acceptOffer(method, phone);
  };

  const handleSubscribe = () => {
    setSubscriptionDialogOpen(true);
  };

  const handleActivatePayPerGeneration = () => {
    activatePayPerGeneration();
    setSubscriptionDialogOpen(false);
  };

  const handlePurchaseUnlimitedCard = () => {
    activateUnlimitedExpert();
    setSubscriptionDialogOpen(false);
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Биллинг и документы</h1>
          <p className="text-muted-foreground">
            Управление тарифами, счетами и закрывающими документами
          </p>
        </div>

        {/* Step 1: Offer Acceptance */}
        <OfferSection
          offerAccepted={offerAccepted}
          offerDetails={offerDetails}
          onAcceptOffer={handleAcceptOffer}
        />

        {/* Step 2: Tariff Selection (only after offer accepted) */}
        {offerAccepted && (
          <>
            {/* Current Subscription - Compact view */}
            <CurrentSubscriptionSection
              offerAccepted={offerAccepted}
              subscriptionType={subscriptionType}
              subscriptionName={subscription?.name}
              expiresAt={subscription?.expiresAt}
              isActive={subscription?.isActive || false}
              onSubscribe={handleSubscribe}
              onManage={() => {}}
            />

            {/* Document Prices - Compact (only for pay-per-generation or no subscription) */}
            {(subscriptionType === 'pay_per_generation' || subscriptionType === 'none') && (
              <DocumentPricesSection prices={documentPrices} />
            )}

            {/* Unlimited Subscription Section */}
            {subscriptionType !== 'unlimited_expert' && (
              <UnlimitedSubscriptionSection
                offerAccepted={offerAccepted}
                hasActiveUnlimited={hasActiveUnlimited}
                onPurchaseCard={handlePurchaseUnlimitedCard}
                onPurchaseInvoice={handlePurchaseUnlimitedInvoice}
              />
            )}
          </>
        )}

        {/* Step 3: Payment Options */}
        {offerAccepted && subscription?.isActive && (
          <PaymentMethodsSection
            offerAccepted={offerAccepted}
            onAddCard={handleAddCard}
            onCreateInvoice={handleCreateInvoice}
          />
        )}

        {/* Step 4: History & Documents */}
        {offerAccepted && (
          <>
            <InvoicesSection />
            <ClosingDocumentsSection />
            <PaymentHistorySection />
          </>
        )}
      </div>

      {/* Subscription Selection Dialog */}
      <Dialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Выберите тариф</DialogTitle>
            <DialogDescription className="text-base">
              Сервис предоставляет доступ к формированию XML-документов в соответствии с требованиями Минстроя РФ
            </DialogDescription>
          </DialogHeader>

          <div className="grid lg:grid-cols-2 gap-6 py-6">
            {/* Pay per generation */}
            <Card className="relative overflow-hidden hover:border-primary/50 transition-all">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Оплата за генерацию</CardTitle>
                    <CardDescription>Для проектных организаций</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    Проектные организации
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Архитекторы, ГИПы
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Частные лица
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  Вы оплачиваете фактическое формирование документов. 
                  Каждая генерация оплачивается отдельно.
                </p>

                <div className="space-y-3 py-3 border-t">
                  <p className="text-sm font-medium">Стоимость генерации:</p>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center text-sm">
                      <span>Пояснительная записка (Раздел №1)</span>
                      <span className="font-semibold">3 000 ₽</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Задание на проектирование</span>
                      <span className="font-semibold">2 500 ₽</span>
                    </li>
                    <li className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>XML-схемы этапа ИИ и П</span>
                      <Badge variant="outline">Скоро</Badge>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-3 border-t">
                  <p className="text-xs text-muted-foreground font-medium">Как работает:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                      Доступ к сервису по подписке
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                      Оплата при запуске генерации
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                      Срок работы над проектом не ограничен
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                      Повторная генерация — отдельная оплата
                    </li>
                  </ul>
                </div>

                <Button className="w-full" onClick={handleActivatePayPerGeneration}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Активировать бесплатно
                </Button>
              </CardContent>
            </Card>

            {/* Unlimited for experts */}
            <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 transition-all">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">
                  <Infinity className="h-3 w-3 mr-1" />
                  Безлимит
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Подписка без лимитов</CardTitle>
                    <CardDescription>Для экспертных организаций</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    Экспертные организации
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  Для компаний, выполняющих экспертизу проектной документации
                </p>

                <div className="py-3 border-t">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold">12 000 ₽</span>
                    <span className="text-muted-foreground">/ месяц</span>
                  </div>
                  <p className="text-sm font-medium">XML-схема заключения экспертизы</p>
                </div>

                <div className="space-y-2 pt-3 border-t">
                  <p className="text-xs text-muted-foreground font-medium">Включено в тариф:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                      Неограниченное количество генераций
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                      Фиксированная стоимость
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                      Приоритетная обработка
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                      Подписка действует 1 календарный месяц
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground italic">
                  📌 Другие типы документов в данный тариф не входят
                </p>

                <Button className="w-full" onClick={handlePurchaseUnlimitedCard}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Оплатить
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="border-t pt-4 space-y-3">
            <p className="text-sm font-medium">ℹ️ Важная информация</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li>• Один аккаунт — для одного пользователя</li>
              <li>• Передача доступа третьим лицам запрещена</li>
              <li>• Документы формируются на основании ваших данных</li>
              <li>• Сервис не передаёт документы в органы экспертизы</li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-4 border-t">
            Оплата означает принятие условий публичной оферты.
          </p>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardBillingDocuments;
