import { useEffect, useRef, useState } from "react";
import { Upload, FileSearch, CheckCircle, Download } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Загрузка документов",
    description: "Перетащите файлы или выберите их на компьютере. Поддерживаются форматы PDF, DOCX, XLSX.",
    icon: Upload,
  },
  {
    id: 2,
    title: "Определение типа документа",
    description: "Система автоматически определяет тип документа и подбирает соответствующую XML-схему Минстроя РФ.",
    icon: FileSearch,
  },
  {
    id: 3,
    title: "Валидация по XSD",
    description: "Проверка сформированного XML по официальным XSD-схемам. Подсветка ошибок с рекомендациями по исправлению.",
    icon: CheckCircle,
  },
  {
    id: 4,
    title: "Готовый результат",
    description: "Получите готовый XML-файл, полностью соответствующий требованиям экспертизы. Скачайте одним кликом.",
    icon: Download,
  },
];

const ScrollSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollPosition = window.scrollY - sectionTop + window.innerHeight / 2;

      stepsRefs.current.forEach((ref, index) => {
        if (ref) {
          const stepTop = ref.offsetTop;
          const stepHeight = ref.offsetHeight;
          
          if (scrollPosition >= stepTop && scrollPosition < stepTop + stepHeight) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-headline text-foreground mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            От загрузки документа до готового XML за несколько минут
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Steps text */}
          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepsRefs.current[index] = el)}
                className={`transition-all duration-500 ${
                  activeStep === index ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                    activeStep === index ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">
                      Шаг {step.id}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky illustration */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="relative aspect-square rounded-2xl bg-secondary/50 border border-border overflow-hidden shadow-xl">
                {/* Interface mockup */}
                <div className="absolute inset-4 rounded-xl bg-card shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="h-12 bg-secondary/50 border-b border-border flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-warning/50" />
                    <div className="w-3 h-3 rounded-full bg-success/50" />
                  </div>
                  
                  {/* Content area */}
                  <div className="p-6 space-y-4">
                    {activeStep === 0 && (
                      <div className="animate-fade-in">
                        <div className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center">
                          <Upload className="h-12 w-12 mx-auto text-primary mb-4" />
                          <p className="text-muted-foreground">Перетащите файлы сюда</p>
                        </div>
                      </div>
                    )}
                    
                    {activeStep === 1 && (
                      <div className="animate-fade-in space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                          <FileSearch className="h-5 w-5 text-primary" />
                          <span className="text-sm">Анализ: ПЗ_Раздел1.pdf</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-primary rounded-full animate-pulse" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Определение XML-схемы...
                        </p>
                      </div>
                    )}
                    
                    {activeStep === 2 && (
                      <div className="animate-fade-in space-y-3">
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Валидация XSD</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle className="h-4 w-4" />
                            <span>Структура документа</span>
                          </div>
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle className="h-4 w-4" />
                            <span>Обязательные поля</span>
                          </div>
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle className="h-4 w-4" />
                            <span>Формат данных</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeStep === 3 && (
                      <div className="animate-fade-in space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">result.xml</span>
                          <span className="text-sm text-success">Готово</span>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3 font-mono text-xs text-muted-foreground overflow-hidden">
                          <div>&lt;?xml version="1.0"?&gt;</div>
                          <div>&lt;ProjectDoc xmlns="..."&gt;</div>
                          <div className="pl-4">&lt;Section id="1"&gt;</div>
                          <div className="pl-8">...</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-medium">
                            <Download className="h-4 w-4 mr-2" />
                            Скачать XML
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;
