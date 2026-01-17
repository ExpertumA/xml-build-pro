import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, FileSearch, FileText, CheckCircle, Download, BarChart3, Files, AlertTriangle } from "lucide-react";

// Dashboard mockup component
const DashboardMockup = () => (
  <div className="relative rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
    {/* Browser header */}
    <div className="h-10 bg-secondary/50 border-b border-border flex items-center px-4 gap-2">
      <div className="w-3 h-3 rounded-full bg-destructive/50" />
      <div className="w-3 h-3 rounded-full bg-warning/50" />
      <div className="w-3 h-3 rounded-full bg-success/50" />
      <span className="ml-4 text-xs text-muted-foreground">XML Expert — Личный кабинет</span>
    </div>

    <div className="flex">
      {/* Mini sidebar */}
      <div className="w-12 bg-secondary/30 border-r border-border py-3 flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
          <BarChart3 className="h-3 w-3 text-primary" />
        </div>
        <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
          <Files className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
          <Upload className="h-3 w-3 text-muted-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="p-2 bg-secondary/50 rounded-lg">
            <p className="text-[10px] text-muted-foreground mb-0.5">Загружено</p>
            <p className="text-lg font-semibold">124</p>
          </div>
          <div className="p-2 bg-success/10 rounded-lg">
            <p className="text-[10px] text-muted-foreground mb-0.5">Успешно</p>
            <p className="text-lg font-semibold text-success">118</p>
          </div>
          <div className="p-2 bg-destructive/10 rounded-lg">
            <p className="text-[10px] text-muted-foreground mb-0.5">С ошибками</p>
            <p className="text-lg font-semibold text-destructive">6</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <p className="text-[10px] text-muted-foreground mb-0.5">Остаток</p>
            <p className="text-lg font-semibold text-primary">76</p>
          </div>
        </div>

        {/* Documents table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-2 border-b border-border bg-secondary/30">
            <p className="text-xs font-medium">Последние документы</p>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center gap-2 p-2 text-xs">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="flex-1 truncate">ПЗ_Раздел1_v3.pdf</span>
              <span className="px-1.5 py-0.5 bg-success/10 text-success rounded text-[10px]">Готово</span>
              <Download className="h-3 w-3 text-primary cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 p-2 text-xs">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="flex-1 truncate">Конъюнктурный_анализ.xlsx</span>
              <span className="px-1.5 py-0.5 bg-success/10 text-success rounded text-[10px]">Готово</span>
              <Download className="h-3 w-3 text-primary cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 p-2 text-xs">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="flex-1 truncate">Задание_проектирование.docx</span>
              <span className="px-1.5 py-0.5 bg-warning/10 text-warning rounded text-[10px]">Обработка</span>
              <div className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-2 p-2 text-xs">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="flex-1 truncate">Ведомость_объемов.xlsx</span>
              <span className="px-1.5 py-0.5 bg-destructive/10 text-destructive rounded text-[10px]">Ошибка</span>
              <AlertTriangle className="h-3 w-3 text-destructive cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-subtle" />
      <div className="container relative py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">
            <h1 className="text-display text-foreground animate-fade-in">
              Перевод проектной документации в <span className="text-gradient">машиночитаемый XML</span>
            </h1>

            <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Инженерные изыскания и проектирование. Проверка по XSD. Готово для экспертизы по требованиям Минстроя РФ.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button size="xl" variant="hero" asChild>
                <Link to="/dashboard">
                  <Upload className="mr-2 h-5 w-5" />
                  Создать XML-документ
                </Link>
              </Button>
              <Button size="xl" variant="heroOutline" asChild>
                <Link to="/features">
                  <FileSearch className="mr-2 h-5 w-5" />
                  Посмотреть форматы
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>XSD Минстроя РФ</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Готово для экспертизы</span>
              </div>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="hidden lg:block animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
