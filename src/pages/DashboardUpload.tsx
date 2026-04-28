import { useState, useCallback } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WizardStepper from "@/components/upload/WizardStepper";
import DocumentTypeStep from "@/components/upload/steps/DocumentTypeStep";
import ObjectTypeStep from "@/components/upload/steps/ObjectTypeStep";
import RequisitesStep, { type RequisitesData } from "@/components/upload/steps/RequisitesStep";
import DocumentUploadStep from "@/components/upload/steps/DocumentUploadStep";
import GenerationStep from "@/components/upload/steps/GenerationStep";
import PreviewStep from "@/components/upload/steps/PreviewStep";
import ResultStep from "@/components/upload/steps/ResultStep";

const steps = [
  { id: 1, label: "Тип документа" },
  { id: 2, label: "Тип объекта" },
  { id: 3, label: "Реквизиты" },
  { id: 4, label: "Документы" },
  { id: 5, label: "Генерация" },
  { id: 6, label: "Предпросмотр" },
  { id: 7, label: "Готово" },
];

const DashboardUpload = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [objectType, setObjectType] = useState<string | null>(null);
  const [workType, setWorkType] = useState<string | null>("construction");
  const [classification, setClassification] = useState<string | null>(null);
  const [requisites, setRequisites] = useState<RequisitesData | undefined>();

  const goToStep = (step: number) => {
    if (step < currentStep) setCurrentStep(step);
  };
  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, steps.length));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const handleGenerationComplete = useCallback(() => {
    setCurrentStep((p) => Math.min(p + 1, steps.length));
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
            workType={workType}
            onWorkTypeChange={setWorkType}
            classification={classification}
            onClassificationChange={setClassification}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <RequisitesStep
            data={requisites}
            onChange={setRequisites}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return <DocumentUploadStep onNext={nextStep} onBack={prevStep} />;
      case 5:
        return (
          <GenerationStep
            documentType={documentType || "explanatory_note"}
            onComplete={handleGenerationComplete}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <PreviewStep
            documentType={documentType || "explanatory_note"}
            objectType={objectType || "residential"}
            onConfirm={nextStep}
            onBack={prevStep}
          />
        );
      case 7:
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
        <WizardStepper steps={steps} currentStep={currentStep} onStepClick={goToStep} />
      </div>
      <div className="py-8">{renderStep()}</div>
    </DashboardLayout>
  );
};

export default DashboardUpload;
