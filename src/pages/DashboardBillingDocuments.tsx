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
import { useCompany } from "@/hooks/useCompany";
import { useBillingData } from "@/hooks/useBillingData";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardBillingDocuments = () => {
  const { toast } = useToast();
  const { company, loading: companyLoading } = useCompany();
  const {
    loading: billingLoading,
    offerAccepted,
    offerDetails,
    packageData,
    plans,
    acceptOffer,
    activatePackage,
  } = useBillingData(company?.id || null);

  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  const loading = companyLoading || billingLoading;

  const handleAcceptOffer = async (method: string, phone?: string) => {
    await acceptOffer(method, phone);
  };

  const handleBuyPackage = () => {
    setPurchaseDialogOpen(true);
  };

  const handleTopUp = () => {
    setPurchaseDialogOpen(true);
  };

  const handlePurchaseCard = async (packageId: string) => {
    // Find plan by package name (START, PRO, EXPERT)
    const packageNameMap: Record<string, string> = {
      start: "START",
      pro: "PRO",
      expert: "EXPERT",
      test: "TEST",
    };
    
    const planName = packageNameMap[packageId];
    const plan = plans.find((p) => p.name === planName);
    
    if (plan) {
      await activatePackage(plan.id, planName === "TEST");
    }
    
    setPurchaseDialogOpen(false);
  };

  const handlePurchaseInvoice = (packageId: string, inn: string, companyName: string) => {
    console.log("Creating invoice for:", { packageId, inn, companyName });
    toast({
      title: "Счёт сформирован",
      description: "Счёт на оплату создан и доступен для скачивания",
    });
    setPurchaseDialogOpen(false);
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

  // Convert packageData to the format expected by GenerationsPackageSection
  const packageDataForSection = packageData
    ? {
        name: packageData.name,
        status: packageData.status,
        generationsRemaining: packageData.generationsRemaining,
        generationsTotal: packageData.generationsTotal,
        expiresAt: packageData.expiresAt,
      }
    : undefined;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">Биллинг и документы</h1>
            <p className="text-muted-foreground">
              Управление пакетами генераций, счетами и закрывающими документами
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
          packageData={packageDataForSection}
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
        plans={plans}
      />
    </DashboardLayout>
  );
};

export default DashboardBillingDocuments;
