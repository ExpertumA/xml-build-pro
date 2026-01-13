import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="relative rounded-3xl gradient-hero p-12 lg:p-20 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white">
              Готовы начать?
            </h2>
            <p className="text-lg text-white/80">
              Загрузите первый документ бесплатно и убедитесь в качестве конвертации
            </p>
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/register">
                Попробовать бесплатно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
