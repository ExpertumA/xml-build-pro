import { Home, Building2, Factory, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ObjectTypeStepProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
  workType?: string | null;
  onWorkTypeChange?: (v: string) => void;
  classification?: string | null;
  onClassificationChange?: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const objectTypes = [
  {
    id: "residential",
    title: "Жилой объект",
    description: "Многоквартирные дома, индивидуальные жилые дома",
    icon: Home,
  },
  {
    id: "non_residential",
    title: "Нежилой объект",
    description: "Офисные здания, торговые центры, склады непроизводственного назначения",
    icon: Building2,
  },
  {
    id: "industrial",
    title: "Производственный объект",
    description: "Объекты производственного назначения, промышленные предприятия, опасные производственные объекты",
    icon: Factory,
  },
  {
    id: "linear",
    title: "Линейный объект",
    description: "Дороги, трубопроводы, линии электропередач",
    icon: Workflow,
  },
];

const workTypes = [
  { id: "construction", label: "Строительство" },
  { id: "reconstruction", label: "Реконструкция" },
  { id: "overhaul", label: "Капитальный ремонт" },
  { id: "demolition", label: "Снос" },
  { id: "okn", label: "Сохранение объекта культурного наследия" },
];

const classifications = [
  { id: "non_industrial", label: "Непроизводственные" },
  { id: "industrial", label: "Производственные" },
  { id: "linear", label: "Линейные" },
];

const SegmentGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value?: string | null;
  onChange?: (v: string) => void;
}) => (
  <div className="rounded-lg border p-4">
    <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-3">
      {label}
    </div>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange?.(o.id)}
            className={cn(
              "px-4 py-2 rounded-md text-sm border transition-colors",
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-secondary/50 border-border text-foreground",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  </div>
);

const ObjectTypeStep = ({
  selectedType,
  onSelect,
  workType,
  onWorkTypeChange,
  classification,
  onClassificationChange,
  onNext,
  onBack,
}: ObjectTypeStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Выберите тип объекта капитального строительства</h2>
        <p className="text-muted-foreground">
          Тип объекта влияет на обязательные разделы и контрольные проверки.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {objectTypes.map((objType) => {
              const Icon = objType.icon;
              const isSelected = selectedType === objType.id;
              return (
                <Card
                  key={objType.id}
                  className={cn(
                    "cursor-pointer transition-all duration-300",
                    isSelected && "ring-2 ring-primary border-primary shadow-sm",
                    !isSelected && "hover:border-primary/50",
                  )}
                  onClick={() => onSelect(objType.id)}
                >
                  <CardContent className="p-5 text-center">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold mb-1">{objType.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{objType.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <SegmentGroup
        label="Вид работ"
        options={workTypes}
        value={workType}
        onChange={onWorkTypeChange}
      />

      <SegmentGroup
        label="Классификация"
        options={classifications}
        value={classification}
        onChange={onClassificationChange}
      />

      <div className="flex justify-between">
        <Button variant="outline" size="lg" onClick={onBack}>
          Назад
        </Button>
        <Button size="lg" onClick={onNext} disabled={!selectedType || !workType || !classification}>
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default ObjectTypeStep;
