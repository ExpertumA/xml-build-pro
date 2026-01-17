import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OfferSection from "@/components/billing/OfferSection";
import GenerationsPackageSection from "@/components/billing/GenerationsPackageSection";
import PaymentMethodsSection from "@/components/billing/PaymentMethodsSection";
import InvoicesSection from "@/components/billing/InvoicesSection";
import ClosingDocumentsSection from "@/components/billing/ClosingDocumentsSection";
import PaymentHistorySection from "@/components/billing/PaymentHistorySection";
import PackagePurchaseDialog from "@/components/billing/PackagePurchaseDialog";
import { useToast } from "@/hooks/use-toast";
import type { PackageStatus } from "@/components/billing/GenerationsPackageSection";

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

  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  // Mock package data
  const [packageData, setPackageData] = useState<{
    name: string;
    status: PackageStatus;
    generationsRemaining: number;
    generationsTotal: number;
    expiresAt: string;
  }>({
    name: "Pro",
    status: 'active',
    generationsRemaining: 18,
    generationsTotal: 30,
    expiresAt: "15.02.2026",
  });

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

  const handleBuyPackage = () => {
    setPurchaseDialogOpen(true);
  };

  const handleTopUp = () => {
    setPurchaseDialogOpen(true);
  };

  const handlePurchaseCard = (packageId: string) => {
    toast({
      title: "Переход к оплате",
      description: `Оплата пакета ${packageId.toUpperCase()} картой...`,
    });
    // In production, redirect to payment gateway
    // After successful payment, update package data
    const packageConfig: Record<string, { generations: number; name: string }> = {
      start: { generations: 10, name: 'Start' },
      pro: { generations: 30, name: 'Pro' },
      expert: { generations: 60, name: 'Expert' },
    };
    
    const selectedPkg = packageConfig[packageId];
    if (selectedPkg) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      
      setPackageData({
        name: selectedPkg.name,
        status: 'active',
        generationsRemaining: selectedPkg.generations,
        generationsTotal: selectedPkg.generations,
        expiresAt: expiresAt.toLocaleDateString('ru-RU'),
      });

      toast({
        title: "Пакет активирован",
        description: `Пакет ${selectedPkg.name} успешно активирован. Чек отправлен на email.`,
      });
    }
  };

  const handlePurchaseInvoice = (packageId: string, inn: string, companyName: string) => {
    console.log("Creating invoice for:", { packageId, inn, companyName });
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Биллинг и документы</h1>
          <p className="text-muted-foreground">
            Управление пакетами генераций, счетами и закрывающими документами
          </p>
        </div>

        {/* Block A: Offer Section */}
        <OfferSection
          offerAccepted={offerAccepted}
          offerDetails={offerDetails}
          onAcceptOffer={handleAcceptOffer}
        />

        {/* Block B: Generations Package */}
        <GenerationsPackageSection
          offerAccepted={offerAccepted}
          packageData={packageData}
          onBuyPackage={handleBuyPackage}
          onTopUp={handleTopUp}
        />

        {/* Payment Methods */}
        <PaymentMethodsSection
          offerAccepted={offerAccepted}
          onAddCard={handleAddCard}
          onCreateInvoice={handleCreateInvoice}
        />

        {/* Block 4: Invoices */}
        <InvoicesSection />

        {/* Block 5: Closing Documents */}
        <ClosingDocumentsSection />

        {/* Block 6: Payment History */}
        <PaymentHistorySection />
      </div>

      {/* Package Purchase Dialog */}
      <PackagePurchaseDialog
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        onPurchaseCard={handlePurchaseCard}
        onPurchaseInvoice={handlePurchaseInvoice}
      />
    </DashboardLayout>
  );
};

export default DashboardBillingDocuments;
