import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ScrollSection from "@/components/home/ScrollSection";
import SupportedDocumentsSection from "@/components/home/SupportedDocumentsSection";
import PricingSection from "@/components/home/PricingSection";
import SecuritySection from "@/components/home/SecuritySection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ScrollSection />
        <SupportedDocumentsSection />
        <PricingSection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
