import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface GenerationStepProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, title: "Сбор данных", duration: 2000 },
  { id: 2, title: "Формирование XML", duration: 3000 },
  { id: 3, title: "Проверка по XSD Минстроя РФ", duration: 2500 },
];

const GenerationStep = ({ onComplete }: GenerationStepProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepIndex = 0;
    let progressInterval: NodeJS.Timeout;

    const runStep = () => {
      if (stepIndex >= steps.length) {
        setTimeout(onComplete, 500);
        return;
      }

      setCurrentStep(stepIndex + 1);
      const step = steps[stepIndex];
      let stepProgress = 0;
      const increment = 100 / (step.duration / 50);

      progressInterval = setInterval(() => {
        stepProgress += increment;
        if (stepProgress >= 100) {
          clearInterval(progressInterval);
          stepIndex++;
          setTimeout(runStep, 300);
        } else {
          setProgress((stepIndex * 100 + stepProgress) / steps.length);
        }
      }, 50);
    };

    runStep();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Генерация XML</h2>
        <p className="text-muted-foreground">
          Пожалуйста, подождите. Идёт обработка документов.
        </p>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                {Math.round(progress)}% завершено
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step) => {
                const isComplete = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg transition-colors",
                      isCurrent && "bg-primary/10",
                      isComplete && "bg-success/10"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        isComplete && "bg-success text-success-foreground",
                        isCurrent && "bg-primary text-primary-foreground",
                        !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                      )}
                    >
                      {isComplete ? (
                        <Check className="w-5 h-5" />
                      ) : isCurrent ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={cn(
                        "font-medium",
                        isCurrent && "text-primary",
                        isComplete && "text-success"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key UX message */}
      <Card className="border-primary bg-primary/5">
        <CardContent className="p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-primary mb-1">Важно</p>
            <p className="text-sm text-muted-foreground">
              Ошибки выявляются до передачи документа в Минстрой РФ, что снижает риск отказа.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerationStep;
