import { useEffect, useRef, useState } from "react";
import { Upload, FileSearch, CheckCircle, XCircle, Download, FileText, AlertTriangle } from "lucide-react";

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

// Step 1: Upload Interface
const UploadInterface = () => (
  <div className="animate-fade-in space-y-4">
    <div className="border-2 border-dashed border-primary/40 rounded-xl p-8 text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
      <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <Upload className="h-7 w-7 text-primary" />
      </div>
      <p className="font-medium text-foreground mb-1">Перетащите файлы сюда</p>
      <p className="text-sm text-muted-foreground">или нажмите для выбора</p>
      <p className="text-xs text-muted-foreground mt-2">PDF, DOCX, XLSX до 50 МБ</p>
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20">
          <FileText className="h-4 w-4 text-success" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">ПЗ_Раздел1_v2.pdf</p>
          <p className="text-xs text-muted-foreground">2.4 МБ</p>
        </div>
        <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">Загружено</span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20">
          <FileText className="h-4 w-4 text-success" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">Конъюнктурный_анализ.xlsx</p>
          <p className="text-xs text-muted-foreground">890 КБ</p>
        </div>
        <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">Загружено</span>
      </div>
    </div>
  </div>
);

// Step 2: Document Type Detection
const DetectionInterface = () => (
  <div className="animate-fade-in space-y-4">
    <div className="p-4 bg-secondary/50 rounded-xl border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileSearch className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium">ПЗ_Раздел1_v2.pdf</p>
          <p className="text-sm text-muted-foreground">Анализ документа</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Тип документа:</span>
          <span className="font-medium text-foreground">Пояснительная записка</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">XML-схема:</span>
          <span className="font-mono text-xs bg-secondary px-2 py-1 rounded">ExplanatoryNote_v3.2.xsd</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Версия схемы:</span>
          <span className="font-medium">3.2 (актуальная)</span>
        </div>
      </div>
    </div>
    
    <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-xl">
      <CheckCircle className="h-5 w-5 text-success" />
      <div>
        <p className="font-medium text-success">Схема определена</p>
        <p className="text-sm text-muted-foreground">Документ готов к валидации</p>
      </div>
    </div>
  </div>
);

// Step 3: Validation Interface
const ValidationInterface = () => (
  <div className="animate-fade-in space-y-4">
    <div className="bg-secondary/30 rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border bg-secondary/50">
        <span className="text-sm font-medium">result.xml</span>
        <span className="text-xs text-muted-foreground">Проверка XSD</span>
      </div>
      <div className="p-3 font-mono text-xs space-y-1 max-h-36 overflow-hidden">
        <div className="text-muted-foreground">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</div>
        <div className="text-muted-foreground">&lt;ExplanatoryNote xmlns="..."&gt;</div>
        <div className="pl-4 text-muted-foreground">&lt;ProjectInfo&gt;</div>
        <div className="pl-8 text-destructive bg-destructive/10 -mx-3 px-3 py-0.5 border-l-2 border-destructive">
          &lt;Name&gt;&lt;/Name&gt; <span className="text-destructive/70">← пустое поле</span>
        </div>
        <div className="pl-8 text-muted-foreground">&lt;Address&gt;г. Москва...&lt;/Address&gt;</div>
        <div className="pl-4 text-muted-foreground">&lt;/ProjectInfo&gt;</div>
      </div>
    </div>
    
    <div className="space-y-2">
      <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
        <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-destructive">Ошибка: строка 4</p>
          <p className="text-muted-foreground">Обязательное поле «Name» не заполнено</p>
        </div>
      </div>
      <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
        <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-warning">Предупреждение: строка 12</p>
          <p className="text-muted-foreground">Рекомендуется указать ИНН организации</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
        <CheckCircle className="h-4 w-4 text-success shrink-0" />
        <span className="text-sm text-success font-medium">Пройдено проверок: 47/48</span>
      </div>
    </div>
  </div>
);

// Step 4: Result Interface
const ResultInterface = () => (
  <div className="animate-fade-in space-y-4">
    <div className="p-5 bg-card rounded-xl border border-border shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
          <FileText className="h-6 w-6 text-success" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg">ПЗ_Раздел1_v2.xml</p>
          <p className="text-sm text-muted-foreground">Пояснительная записка</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Размер</p>
          <p className="font-medium">156 КБ</p>
        </div>
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Версия XSD</p>
          <p className="font-medium">3.2</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg mb-4">
        <CheckCircle className="h-5 w-5 text-success" />
        <div>
          <p className="font-medium text-success">Валидация пройдена</p>
          <p className="text-xs text-muted-foreground">Все проверки XSD успешны</p>
        </div>
      </div>
      
      <button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
        <Download className="h-5 w-5" />
        Скачать XML
      </button>
    </div>
    
    <p className="text-center text-sm text-muted-foreground">
      Готово к отправке в экспертизу
    </p>
  </div>
);

const ScrollSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    // Scroll to the step
    const stepRef = stepsRefs.current[index];
    if (stepRef) {
      stepRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Trigger point at 30% from top of viewport for earlier switching
      const triggerPoint = viewportHeight * 0.3;

      stepsRefs.current.forEach((ref, index) => {
        if (ref) {
          const stepRect = ref.getBoundingClientRect();
          const stepCenter = stepRect.top + stepRect.height / 2;
          
          // Switch when step center passes the trigger point
          if (stepRect.top <= triggerPoint && stepRect.bottom >= triggerPoint) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderInterface = () => {
    switch (activeStep) {
      case 0:
        return <UploadInterface key="upload" />;
      case 1:
        return <DetectionInterface key="detection" />;
      case 2:
        return <ValidationInterface key="validation" />;
      case 3:
        return <ResultInterface key="result" />;
      default:
        return <UploadInterface key="upload-default" />;
    }
  };

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
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepsRefs.current[index] = el)}
                onClick={() => handleStepClick(index)}
                className={`transition-all duration-500 cursor-pointer hover:opacity-100 ${
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

          {/* Sticky interface mockup */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              {/* Step indicators */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeStep === index 
                        ? "w-8 bg-primary" 
                        : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Шаг ${step.id}`}
                  />
                ))}
              </div>
              
              <div className="relative rounded-2xl bg-secondary/50 border border-border overflow-hidden shadow-xl">
                {/* Interface mockup */}
                <div className="rounded-xl bg-card shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="h-12 bg-secondary/50 border-b border-border flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-warning/50" />
                    <div className="w-3 h-3 rounded-full bg-success/50" />
                    <span className="ml-4 text-sm text-muted-foreground">XML Expert — Шаг {activeStep + 1}</span>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-6 min-h-[400px]">
                    {renderInterface()}
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
