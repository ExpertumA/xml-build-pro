import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Mail, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardCompany = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "ООО «ПроектСтрой»",
    inn: "7707123456",
    kpp: "770701001",
    legalAddress: "123456, г. Москва, ул. Строителей, д. 10, офис 501",
    contactPerson: "Иванов Иван Иванович",
    accountingEmail: "buh@proektstroy.ru",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Данные сохранены",
      description: "Реквизиты компании успешно обновлены",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="text-2xl font-semibold">Компания</h1>
          <p className="text-muted-foreground">
            Реквизиты организации для документооборота
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Реквизиты организации</CardTitle>
                <CardDescription>
                  Данные для формирования счетов и актов
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Название организации</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder="ООО «Название»"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inn">ИНН</Label>
                  <Input
                    id="inn"
                    value={formData.inn}
                    onChange={(e) => handleChange("inn", e.target.value)}
                    placeholder="10 или 12 цифр"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kpp">КПП</Label>
                  <Input
                    id="kpp"
                    value={formData.kpp}
                    onChange={(e) => handleChange("kpp", e.target.value)}
                    placeholder="9 цифр"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="legalAddress" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Юридический адрес
                </Label>
                <Input
                  id="legalAddress"
                  value={formData.legalAddress}
                  onChange={(e) => handleChange("legalAddress", e.target.value)}
                  placeholder="Индекс, город, улица, дом, офис"
                />
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Контактные данные
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Контактное лицо</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleChange("contactPerson", e.target.value)}
                    placeholder="ФИО полностью"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountingEmail" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email для бухгалтерии
                  </Label>
                  <Input
                    id="accountingEmail"
                    type="email"
                    value={formData.accountingEmail}
                    onChange={(e) => handleChange("accountingEmail", e.target.value)}
                    placeholder="buh@company.ru"
                  />
                  <p className="text-xs text-muted-foreground">
                    На этот адрес будут отправляться счета и закрывающие документы
                  </p>
                </div>
              </div>

              <Button type="submit">Сохранить изменения</Button>
            </form>
          </CardContent>
        </Card>

        {/* Info card */}
        <Card className="bg-secondary/30 border-dashed">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Важно:</strong> Изменение реквизитов не влияет на уже сформированные документы. 
              Новые реквизиты будут использованы для следующих счетов и актов.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCompany;
