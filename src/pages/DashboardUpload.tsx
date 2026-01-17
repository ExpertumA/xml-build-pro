import { useState, useCallback } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WizardStepper from "@/components/upload/WizardStepper";
import DocumentTypeStep from "@/components/upload/steps/DocumentTypeStep";
import ObjectTypeStep from "@/components/upload/steps/ObjectTypeStep";
import DocumentUploadStep from "@/components/upload/steps/DocumentUploadStep";
import GenerationStep from "@/components/upload/steps/GenerationStep";
import PreviewStep from "@/components/upload/steps/PreviewStep";
import ResultStep from "@/components/upload/steps/ResultStep";

const steps = [
  { id: 1, label: "Тип документа" },
  { id: 2, label: "Тип объекта" },
  { id: 3, label: "Документы" },
  { id: 4, label: "Генерация XML" },
  { id: 5, label: "Предпросмотр" },
  { id: 6, label: "Готово" },
];

const DashboardUpload = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [objectType, setObjectType] = useState<string | null>(null);

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleGenerationComplete = useCallback(() => {
    nextStep();
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DocumentTypeStep
            selectedType={documentType}
            onSelect={setDocumentType}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ObjectTypeStep
            selectedType={objectType}
            onSelect={setObjectType}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <DocumentUploadStep
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <GenerationStep
            documentType={documentType || "explanatory_note"}
            onComplete={handleGenerationComplete}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <PreviewStep
            documentType={documentType || "explanatory_note"}
            objectType={objectType || "residential"}
            onConfirm={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <ResultStep
            documentType={documentType || "explanatory_note"}
            objectType={objectType || "residential"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-6">
        <WizardStepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
        />
      </div>

      <div className="py-8">
        {renderStep()}
      </div>
    </DashboardLayout>
  );
};

export default DashboardUpload;
