import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OfferSection from "@/components/billing/OfferSection";
import CurrentPlanSection from "@/components/billing/CurrentPlanSection";
import PaymentMethodsSection from "@/components/billing/PaymentMethodsSection";
import InvoicesSection from "@/components/billing/InvoicesSection";
import ClosingDocumentsSection from "@/components/billing/ClosingDocumentsSection";
import PaymentHistorySection from "@/components/billing/PaymentHistorySection";
import { useToast } from "@/hooks/use-toast";

const DashboardBillingDocuments = () => {
  const { toast } = useToast();
  
  // Mock state - in production, this would come from the database
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [offerDetails, setOfferDetails] = useState<{
    acceptedAt: string;
    version: string;
    method: string;
    ip?: string;
  } | undefined>(undefined);

  const handleAcceptOffer = (method: string, phone?: string) => {
    const now = new Date();
    const formattedDate = now.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setOfferAccepted(true);
    setOfferDetails({
      acceptedAt: formattedDate,
      version: "1.0",
      method: method,
      ip: "192.168.1.1", // In production, get from server
    });

    // In production, save to database via Supabase
    console.log("Offer accepted:", { method, phone, timestamp: now.toISOString() });
  };

  const handleChangePlan = () => {
    toast({
      title: "Изменение тарифа",
      description: "Функция будет доступна в ближайшее время",
    });
  };

  const handlePay = () => {
    toast({
      title: "Оплата",
      description: "Переход к оплате...",
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Биллинг и документы</h1>
          <p className="text-muted-foreground">
            Управление подпиской, счетами и закрывающими документами
          </p>
        </div>

        {/* Block 1: Offer Section */}
        <OfferSection
          offerAccepted={offerAccepted}
          offerDetails={offerDetails}
          onAcceptOffer={handleAcceptOffer}
        />

        {/* Block 2 & 3: Current Plan & Payment Methods */}
        <div className="grid lg:grid-cols-2 gap-6">
          <CurrentPlanSection
            offerAccepted={offerAccepted}
            onChangePlan={handleChangePlan}
            onPay={handlePay}
          />
          <PaymentMethodsSection
            offerAccepted={offerAccepted}
            onAddCard={handleAddCard}
            onCreateInvoice={handleCreateInvoice}
          />
        </div>

        {/* Block 4: Invoices */}
        <InvoicesSection />

        {/* Block 5: Closing Documents */}
        <ClosingDocumentsSection />

        {/* Block 6: Payment History */}
        <PaymentHistorySection />
      </div>
    </DashboardLayout>
  );
};

export default DashboardBillingDocuments;
