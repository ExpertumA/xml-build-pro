import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, User, FileSignature } from "lucide-react";

interface RequisitesData {
  // Заказчик
  customerName: string;
  customerInn: string;
  customerKpp: string;
  customerOgrn: string;
  customerAddress: string;
  // Проектная организация
  designerName: string;
  designerInn: string;
  designerKpp: string;
  designerSroNumber: string;
  // Объект
  objectName: string;
  objectAddress: string;
}

interface RequisitesStepProps {
  data?: Partial<RequisitesData>;
  onChange?: (data: RequisitesData) => void;
  onNext: () => void;
  onBack: () => void;
}

const RequisitesStep = ({ data, onChange, onNext, onBack }: RequisitesStepProps) => {
  const [form, setForm] = useState<RequisitesData>({
    customerName: data?.customerName ?? "",
    customerInn: data?.customerInn ?? "",
    customerKpp: data?.customerKpp ?? "",
    customerOgrn: data?.customerOgrn ?? "",
    customerAddress: data?.customerAddress ?? "",
    designerName: data?.designerName ?? "",
    designerInn: data?.designerInn ?? "",
    designerKpp: data?.designerKpp ?? "",
    designerSroNumber: data?.designerSroNumber ?? "",
    objectName: data?.objectName ?? "",
    objectAddress: data?.objectAddress ?? "",
  });

  const update = (k: keyof RequisitesData, v: string) => {
    const next = { ...form, [k]: v };
    setForm(next);
    onChange?.(next);
  };

  const isValid =
    form.customerName.trim() &&
    form.customerInn.trim() &&
    form.designerName.trim() &&
    form.designerInn.trim() &&
    form.objectName.trim();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Реквизиты участников и объекта</h2>
        <p className="text-muted-foreground">
          Эти данные будут включены в XML и сверены с документами на следующем шаге.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" /> Заказчик
          </CardTitle>
          <CardDescription>Юридическое лицо или индивидуальный предприниматель</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="customerName">Наименование организации</Label>
            <Input id="customerName" value={form.customerName}
              onChange={(e) => update("customerName", e.target.value)}
              placeholder="ООО «Название»" />
          </div>
          <div>
            <Label htmlFor="customerInn">ИНН</Label>
            <Input id="customerInn" value={form.customerInn}
              onChange={(e) => update("customerInn", e.target.value)} placeholder="10 или 12 цифр" />
          </div>
          <div>
            <Label htmlFor="customerKpp">КПП</Label>
            <Input id="customerKpp" value={form.customerKpp}
              onChange={(e) => update("customerKpp", e.target.value)} placeholder="9 цифр" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="customerOgrn">ОГРН</Label>
            <Input id="customerOgrn" value={form.customerOgrn}
              onChange={(e) => update("customerOgrn", e.target.value)} placeholder="13 или 15 цифр" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="customerAddress">Юридический адрес</Label>
            <Textarea id="customerAddress" rows={2} value={form.customerAddress}
              onChange={(e) => update("customerAddress", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-primary" /> Проектная организация
          </CardTitle>
          <CardDescription>Исполнитель работ по договору</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="designerName">Наименование организации</Label>
            <Input id="designerName" value={form.designerName}
              onChange={(e) => update("designerName", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="designerInn">ИНН</Label>
            <Input id="designerInn" value={form.designerInn}
              onChange={(e) => update("designerInn", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="designerKpp">КПП</Label>
            <Input id="designerKpp" value={form.designerKpp}
              onChange={(e) => update("designerKpp", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="designerSroNumber">Номер СРО</Label>
            <Input id="designerSroNumber" value={form.designerSroNumber}
              onChange={(e) => update("designerSroNumber", e.target.value)}
              placeholder="СРО-П-XXX-DDMMYYYY" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileSignature className="h-4 w-4 text-primary" /> Объект
          </CardTitle>
          <CardDescription>Адрес и наименование объекта строительства</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="objectName">Наименование объекта</Label>
            <Input id="objectName" value={form.objectName}
              onChange={(e) => update("objectName", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="objectAddress">Адрес объекта</Label>
            <Textarea id="objectAddress" rows={2} value={form.objectAddress}
              onChange={(e) => update("objectAddress", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" size="lg" onClick={onBack}>Назад</Button>
        <Button size="lg" onClick={onNext} disabled={!isValid}>Продолжить</Button>
      </div>
    </div>
  );
};

export default RequisitesStep;
export type { RequisitesData };
