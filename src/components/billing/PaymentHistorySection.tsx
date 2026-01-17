import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Building2 } from "lucide-react";

interface Payment {
  id: string;
  date: string;
  amount: string;
  method: string;
  methodType: 'card' | 'invoice';
  status: 'completed' | 'pending' | 'failed';
}

interface PaymentHistorySectionProps {
  payments?: Payment[];
}

const statusConfig = {
  completed: { label: "Оплачено", className: "bg-success/10 text-success hover:bg-success/20" },
  pending: { label: "В обработке", className: "bg-warning/10 text-warning hover:bg-warning/20" },
  failed: { label: "Ошибка", className: "bg-destructive/10 text-destructive hover:bg-destructive/20" },
};

const defaultPayments: Payment[] = [
  { 
    id: "1", 
    date: "01.01.2025", 
    amount: "14 990 ₽", 
    method: "Visa •••• 4242",
    methodType: 'card',
    status: "completed" 
  },
  { 
    id: "2", 
    date: "01.12.2024", 
    amount: "14 990 ₽", 
    method: "Visa •••• 4242",
    methodType: 'card',
    status: "completed" 
  },
  { 
    id: "3", 
    date: "01.11.2024", 
    amount: "14 990 ₽", 
    method: "По счёту",
    methodType: 'invoice',
    status: "completed" 
  },
  { 
    id: "4", 
    date: "01.10.2024", 
    amount: "4 990 ₽", 
    method: "Visa •••• 4242",
    methodType: 'card',
    status: "completed" 
  },
];

const PaymentHistorySection = ({ payments = defaultPayments }: PaymentHistorySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>История платежей</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => {
            const status = statusConfig[payment.status];
            
            return (
              <div 
                key={payment.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    {payment.methodType === 'card' ? (
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{payment.amount}</p>
                    <p className="text-sm text-muted-foreground">{payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className={status.className}>
                    {status.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">{payment.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistorySection;
