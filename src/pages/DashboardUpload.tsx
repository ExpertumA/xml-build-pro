import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WizardStepper from "@/components/upload/WizardStepper";
import DocumentTypeStep from "@/components/upload/steps/DocumentTypeStep";
import ObjectTypeStep from "@/components/upload/steps/ObjectTypeStep";
import RequisitesStep, { type RequisitesData } from "@/components/upload/steps/RequisitesStep";
import DocumentUploadStep from "@/components/upload/steps/DocumentUploadStep";
import GenerationStep from "@/components/upload/steps/GenerationStep";
import PreviewStep from "@/components/upload/steps/PreviewStep";
import ResultStep from "@/components/upload/steps/ResultStep";
import { getProject, DOCUMENT_KIND_LABEL, type DocumentKind } from "@/lib/projectsData";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

const ALL_STEPS = [
  { id: 1, label: "Тип документа" },
  { id: 2, label: "Тип объекта" },
  { id: 3, label: "Реквизиты" },
  { id: 4, label: "Документы" },
  { id: 5, label: "Генерация" },
  { id: 6, label: "Предпросмотр" },
  { id: 7, label: "Готово" },
];

const DashboardUpload = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const project = projectId ? getProject(projectId) : undefined;

  // Pre-selected document kind for adding a new document into an existing project
  const newDocKind = searchParams.get("docKind") as DocumentKind | null;

  const prefillDocType = searchParams.get("docType") || newDocKind || project?.documentType || null;
  const prefillObjectType = searchParams.get("objectType") || null;
  const prefillWorkType = searchParams.get("workType") || null;

  // Project context already covers steps 1-2: docType from project, объект/работы заданы при создании
  const skipToRequisites = Boolean(project) || Boolean(prefillDocType && prefillObjectType);

  const [currentStep, setCurrentStep] = useState(skipToRequisites ? 3 : 1);
  const [documentType, setDocumentType] = useState<string | null>(prefillDocType);
  const [objectType, setObjectType] = useState<string | null>(prefillObjectType);
  const [workType, setWorkType] = useState<string | null>(prefillWorkType ?? "construction");
  const [classification, setClassification] = useState<string | null>(null);
  const [requisites, setRequisites] = useState<RequisitesData | undefined>();

  useEffect(() => {
    if (skipToRequisites) {
      setDocumentType(prefillDocType);
      setObjectType(prefillObjectType);
      setWorkType(prefillWorkType ?? "construction");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide steps 1-2 from the stepper when context is provided
  const visibleSteps = useMemo(
    () => (skipToRequisites ? ALL_STEPS.filter((s) => s.id >= 3) : ALL_STEPS),
    [skipToRequisites],
  );

  const minStep = skipToRequisites ? 3 : 1;
  const maxStep = ALL_STEPS.length;

  const goToStep = (step: number) => {
    if (step < currentStep && step >= minStep) setCurrentStep(step);
  };
  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, maxStep));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, minStep));

  const handleGenerationComplete = useCallback(() => {
    setCurrentStep((p) => Math.min(p + 1, maxStep));
  }, [maxStep]);

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
            onBack={currentStep > minStep ? prevStep : undefined as unknown as () => void}
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

  const docKindLabel =
    documentType && documentType in DOCUMENT_KIND_LABEL
      ? DOCUMENT_KIND_LABEL[documentType as DocumentKind]
      : null;

  return (
    <DashboardLayout>
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-6">
        <WizardStepper steps={visibleSteps} currentStep={currentStep} onStepClick={goToStep} />
      </div>

      {/* Project context banner (when wizard is opened from a project) */}
      {project && (
        <div className="container max-w-5xl mx-auto pt-6">
          <Card className="bg-secondary/40 border-dashed">
            <CardContent className="p-4 flex items-center gap-3 text-sm">
              <FolderOpen className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-muted-foreground">Проект:</span>
                <span className="font-medium">{project.name}</span>
                <span className="text-muted-foreground">·</span>
                <span>{project.objectType}</span>
                {project.workType && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span>{project.workType}</span>
                  </>
                )}
                {docKindLabel && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span>Документ: <span className="font-medium">{docKindLabel}</span></span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="py-8">{renderStep()}</div>
    </DashboardLayout>
  );
};

export default DashboardUpload;
