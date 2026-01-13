import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, FileSearch } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-subtle" />
      <div className="container relative py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-display text-foreground animate-fade-in">
            Перевод проектной документации в{" "}
            <span className="text-gradient">машиночитаемый XML</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Инженерные изыскания и проектирование. Проверка по XSD. 
            Готово для экспертизы по требованиям Минстроя РФ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="xl" variant="hero" asChild>
              <Link to="/dashboard">
                <Upload className="mr-2 h-5 w-5" />
                Загрузить документ
              </Link>
            </Button>
            <Button size="xl" variant="heroOutline" asChild>
              <Link to="/features">
                <FileSearch className="mr-2 h-5 w-5" />
                Посмотреть форматы
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
