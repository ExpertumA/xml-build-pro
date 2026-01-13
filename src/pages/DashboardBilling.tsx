import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, CreditCard } from "lucide-react";

const paymentHistory = [
  { date: "01.01.2025", amount: "14 990 ₽", status: "Оплачено", method: "Visa •••• 4242" },
  { date: "01.12.2024", amount: "14 990 ₽", status: "Оплачено", method: "Visa •••• 4242" },
  { date: "01.11.2024", amount: "14 990 ₽", status: "Оплачено", method: "Visa •••• 4242" },
  { date: "01.10.2024", amount: "4 990 ₽", status: "Оплачено", method: "Visa •••• 4242" },
];

const DashboardBilling = () => {
  const usedDocuments = 24;
  const totalDocuments = 50;
  const usagePercent = (usedDocuments / totalDocuments) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Подписка и биллинг</h1>
          <p className="text-muted-foreground">
            Управление тарифом и платежами
          </p>
        </div>

        {/* Current plan */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Текущий тариф</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold">Pro</h3>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      Активен
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">14 990 ₽ / месяц</p>
                </div>
                <Button variant="outline">Изменить тариф</Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Использовано документов</span>
                  <span className="font-medium">{usedDocuments} из {totalDocuments}</span>
                </div>
                <Progress value={usagePercent} className="h-2" />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Включено в тариф:</p>
                <ul className="space-y-1.5">
                  {[
                    "До 50 документов в месяц",
                    "Все типы XML-схем",
                    "Приоритетная поддержка",
                    "API доступ",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                Следующее списание: 01.02.2025
              </p>
            </CardContent>
          </Card>

          {/* Payment method */}
          <Card>
            <CardHeader>
              <CardTitle>Способ оплаты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                <div className="h-12 w-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Visa •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Истекает 12/26</p>
                </div>
                <Badge variant="secondary">По умолчанию</Badge>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  Изменить карту
                </Button>
                <Button variant="outline" className="flex-1">
                  Добавить карту
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment history */}
        <Card>
          <CardHeader>
            <CardTitle>История платежей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">{payment.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {payment.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardBilling;
