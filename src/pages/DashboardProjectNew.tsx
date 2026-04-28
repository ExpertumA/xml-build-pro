import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";

const DOC_TYPES = [
  { id: "design_assignment", label: "Задание на проектирование" },
  { id: "explanatory_note", label: "Пояснительная записка" },
];

const OBJECT_TYPES = [
  { id: "residential", label: "Жилой" },
  { id: "non_residential", label: "Нежилой" },
  { id: "industrial", label: "Производственный" },
  { id: "linear", label: "Линейный" },
];

const WORK_TYPES = [
  { id: "construction", label: "Строительство" },
  { id: "reconstruction", label: "Реконструкция" },
  { id: "overhaul", label: "Капитальный ремонт" },
  { id: "demolition", label: "Снос" },
  { id: "okn", label: "Сохранение ОКН" },
];

const DashboardProjectNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [docType, setDocType] = useState<string>("");
  const [objectType, setObjectType] = useState<string>("");
  const [workType, setWorkType] = useState<string>("");

  const handleCreate = () => {
    if (!docType) return toast.error("Выберите тип документа");
    if (!objectType) return toast.error("Выберите тип объекта");
    if (!name.trim()) return toast.error("Укажите название проекта");
    toast.success("Проект создан как черновик");
    setTimeout(() => navigate("/dashboard/projects"), 600);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Назад
        </Button>

        <div>
          <h1 className="text-2xl font-semibold">Создание проекта</h1>
          <p className="text-muted-foreground">
            Заполните основные параметры. Документы и реквизиты добавите на следующих шагах.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Название проекта</CardTitle>
            <CardDescription>Например: «ЖК Северный квартал, корпус 3»</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="name" className="sr-only">Название</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название проекта"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Тип документа</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={docType} onValueChange={setDocType} className="grid sm:grid-cols-2 gap-3">
              {DOC_TYPES.map((d) => (
                <Label
                  key={d.id}
                  htmlFor={`doc-${d.id}`}
                  className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-secondary/40"
                >
                  <RadioGroupItem id={`doc-${d.id}`} value={d.id} />
                  <span className="text-sm">{d.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Тип объекта</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={objectType} onValueChange={setObjectType} className="grid sm:grid-cols-2 gap-3">
              {OBJECT_TYPES.map((o) => (
                <Label
                  key={o.id}
                  htmlFor={`obj-${o.id}`}
                  className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-secondary/40"
                >
                  <RadioGroupItem id={`obj-${o.id}`} value={o.id} />
                  <span className="text-sm">{o.label}</span>
                </Label>
              ))}
            </RadioGroup>
            {objectType === "linear" && (
              <p className="text-xs text-muted-foreground mt-3">
                Для линейного объекта потребуются адрес начала и конца.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Вид работ</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={workType} onValueChange={setWorkType} className="grid sm:grid-cols-2 gap-3">
              {WORK_TYPES.map((w) => (
                <Label
                  key={w.id}
                  htmlFor={`work-${w.id}`}
                  className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-secondary/40"
                >
                  <RadioGroupItem id={`work-${w.id}`} value={w.id} />
                  <span className="text-sm">{w.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>Отмена</Button>
          <Button onClick={handleCreate}>Создать</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProjectNew;
