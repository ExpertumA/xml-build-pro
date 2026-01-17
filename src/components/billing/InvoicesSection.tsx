import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Clock, CheckCircle, AlertCircle, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type InvoiceStatus = "issued" | "paid" | "overdue";

interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
  dueDate: string;
}

interface InvoicesSectionProps {
  invoices?: Invoice[];
}

const statusConfig: Record<InvoiceStatus, { 
  label: string; 
  variant: "default" | "secondary" | "destructive"; 
  icon: React.ElementType 
}> = {
  issued: { label: "Выставлен", variant: "secondary", icon: Clock },
  paid: { label: "Оплачен", variant: "default", icon: CheckCircle },
  overdue: { label: "Просрочен", variant: "destructive", icon: AlertCircle },
};

const defaultInvoices: Invoice[] = [
  {
    id: "1",
    number: "СЧ-2025-001",
    date: "10.01.2025",
    amount: "14 990 ₽",
    status: "paid",
    dueDate: "25.01.2025",
  },
  {
    id: "2",
    number: "СЧ-2025-002",
    date: "10.02.2025",
    amount: "14 990 ₽",
    status: "issued",
    dueDate: "25.02.2025",
  },
  {
    id: "3",
    number: "СЧ-2024-012",
    date: "10.12.2024",
    amount: "14 990 ₽",
    status: "overdue",
    dueDate: "25.12.2024",
  },
];

const InvoicesSection = ({ invoices = defaultInvoices }: InvoicesSectionProps) => {
  const { toast } = useToast();

  const handleDownload = (invoiceNumber: string) => {
    toast({
      title: "Загрузка начата",
      description: `Счёт ${invoiceNumber} загружается`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Счета
        </CardTitle>
        <CardDescription>
          История выставленных счетов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Номер</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Срок оплаты</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => {
              const status = statusConfig[invoice.status];
              const StatusIcon = status.icon;
              
              return (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={status.variant} 
                      className={`gap-1 ${status.variant === 'default' ? 'bg-success/10 text-success hover:bg-success/20' : ''}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(invoice.number)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvoicesSection;
