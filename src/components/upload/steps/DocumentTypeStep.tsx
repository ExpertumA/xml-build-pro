import { FileText, ClipboardList, FileCheck, Calculator, Award, BarChart3, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DocumentTypeStepProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
  onNext: () => void;
}

const documentTypes = [
  {
    id: "explanatory_note",
    title: "Раздел №1 «Пояснительная записка»",
    icon: FileText,
    available: true,
  },
  {
    id: "design_assignment",
    title: "Задание на проектирование",
    icon: ClipboardList,
    available: true,
  },
  {
    id: "expert_conclusion",
    title: "XML-схема заключения экспертизы",
    icon: FileCheck,
    available: false,
  },
  {
    id: "work_volumes",
    title: "Ведомость объёмов работ",
    icon: Calculator,
    available: false,
  },
  {
    id: "typical_project",
    title: "Сведения о признании ПД типовой",
    icon: Award,
    available: false,
  },
  {
    id: "market_analysis",
    title: "Результаты конъюнктурного анализа",
    icon: BarChart3,
    available: false,
  },
];

const DocumentTypeStep = ({ selectedType, onSelect, onNext }: DocumentTypeStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Выберите тип XML-документа</h2>
        <p className="text-muted-foreground">
          Тип документа определяет структуру XML и требования XSD Минстроя РФ.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTypes.map((docType) => {
          const Icon = docType.icon;
          const isSelected = selectedType === docType.id;
          const isDisabled = !docType.available;

          return (
            <Card
              key={docType.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300",
                isSelected && "ring-2 ring-primary border-primary",
                isDisabled && "opacity-60 cursor-not-allowed",
                !isDisabled && !isSelected && "hover:border-primary/50 hover:shadow-md"
              )}
              onClick={() => !isDisabled && onSelect(docType.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      isDisabled && "bg-muted/50"
                    )}
                  >
                    {isDisabled ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium leading-tight">{docType.title}</h3>
                    {!docType.available && (
                      <Badge variant="secondary" className="mt-2">
                        Скоро
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={onNext} disabled={!selectedType}>
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default DocumentTypeStep;
