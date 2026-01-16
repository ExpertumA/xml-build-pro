import { Home, Building2, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ObjectTypeStepProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
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
    description: "Офисные здания, производственные объекты, склады",
    icon: Building2,
  },
  {
    id: "linear",
    title: "Линейный объект",
    description: "Дороги, трубопроводы, линии электропередач",
    icon: Route,
  },
];

const ObjectTypeStep = ({ selectedType, onSelect, onNext, onBack }: ObjectTypeStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Выберите тип объекта капитального строительства</h2>
        <p className="text-muted-foreground">
          Тип объекта влияет на обязательные разделы и контрольные проверки.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {objectTypes.map((objType) => {
          const Icon = objType.icon;
          const isSelected = selectedType === objType.id;

          return (
            <Card
              key={objType.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300",
                isSelected && "ring-2 ring-primary border-primary shadow-lg",
                !isSelected && "hover:border-primary/50 hover:shadow-md"
              )}
              onClick={() => onSelect(objType.id)}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">{objType.title}</h3>
                <p className="text-sm text-muted-foreground">{objType.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" size="lg" onClick={onBack}>
          Назад
        </Button>
        <Button size="lg" onClick={onNext} disabled={!selectedType}>
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default ObjectTypeStep;
