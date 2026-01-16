import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
}

interface WizardStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const WizardStepper = ({ steps, currentStep, onStepClick }: WizardStepperProps) => {
  return (
    <div className="sticky top-0 z-50 bg-background border-b">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isClickable = isCompleted && onStepClick;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step indicator */}
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    isClickable && "cursor-pointer hover:opacity-80",
                    !isClickable && "cursor-default"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shrink-0",
                      isCompleted && "bg-success text-success-foreground",
                      isCurrent && "bg-primary text-primary-foreground",
                      !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium hidden sm:block transition-colors duration-300",
                      isCurrent && "text-foreground",
                      isCompleted && "text-success",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-3 h-0.5 hidden sm:block">
                    <div
                      className={cn(
                        "h-full transition-all duration-500",
                        isCompleted ? "bg-success" : "bg-border"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WizardStepper;
