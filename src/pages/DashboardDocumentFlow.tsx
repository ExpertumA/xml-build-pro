import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FileText, 
  Plus, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Receipt,
  FileCheck,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Document {
  id: string;
  type: "invoice" | "act" | "closing";
  name: string;
  date: string;
  invoiceNumber: string;
}

const invoices: Invoice[] = [
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

const documents: Document[] = [
  {
    id: "1",
    type: "invoice",
    name: "Счёт №СЧ-2025-001",
    date: "10.01.2025",
    invoiceNumber: "СЧ-2025-001",
  },
  {
    id: "2",
    type: "act",
    name: "Акт №АКТ-2025-001",
    date: "31.01.2025",
    invoiceNumber: "СЧ-2025-001",
  },
  {
    id: "3",
    type: "closing",
    name: "Закрывающие документы за январь 2025",
    date: "31.01.2025",
    invoiceNumber: "СЧ-2025-001",
  },
  {
    id: "4",
    type: "invoice",
    name: "Счёт №СЧ-2025-002",
    date: "10.02.2025",
    invoiceNumber: "СЧ-2025-002",
  },
];

const statusConfig: Record<InvoiceStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  issued: { label: "Выставлен", variant: "secondary", icon: Clock },
  paid: { label: "Оплачен", variant: "default", icon: CheckCircle },
  overdue: { label: "Просрочен", variant: "destructive", icon: AlertCircle },
};

const documentTypeConfig = {
  invoice: { label: "Счёт", icon: Receipt },
  act: { label: "Акт", icon: FileCheck },
  closing: { label: "Закрывающие", icon: FileText },
};

const DashboardDocumentFlow = () => {
  const { toast } = useToast();
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState("14990");

  const handleCreateInvoice = () => {
    toast({
      title: "Счёт выставлен",
      description: "Счёт на сумму " + invoiceAmount + " ₽ успешно сформирован",
    });
    setInvoiceDialogOpen(false);
  };

  const handleDownload = (docName: string) => {
    toast({
      title: "Загрузка начата",
      description: `Документ "${docName}" загружается`,
    });
  };

  // Calculate balance
  const balance = 14990; // Positive = debt

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Документооборот</h1>
            <p className="text-muted-foreground">
              Счета, акты и закрывающие документы
            </p>
          </div>
          <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Выставить счёт
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Выставить счёт</DialogTitle>
                <DialogDescription>
                  Счёт будет сформирован автоматически на основе вашего тарифа
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Сумма (₽)</Label>
                  <Input
                    id="amount"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    placeholder="Введите сумму"
                  />
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg text-sm">
                  <p className="text-muted-foreground">Счёт будет выставлен на:</p>
                  <p className="font-medium mt-1">ООО «ПроектСтрой»</p>
                  <p className="text-muted-foreground">ИНН: 7707123456</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInvoiceDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreateInvoice}>
                  Выставить счёт
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Balance card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Текущая задолженность</p>
                <p className={`text-3xl font-bold ${balance > 0 ? "text-destructive" : "text-success"}`}>
                  {balance > 0 ? `${balance.toLocaleString()} ₽` : "0 ₽"}
                </p>
              </div>
              {balance > 0 && (
                <Button variant="outline">
                  Оплатить по счёту
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
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
                        <Badge variant={status.variant} className="gap-1">
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

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Документы
            </CardTitle>
            <CardDescription>
              Счета, акты и закрывающие документы для скачивания
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Тип</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>К счёту</TableHead>
                  <TableHead className="text-right">Скачать</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => {
                  const typeConfig = documentTypeConfig[doc.type];
                  const TypeIcon = typeConfig.icon;
                  
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{typeConfig.label}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell className="text-muted-foreground">{doc.invoiceNumber}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(doc.name)}
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
      </div>
    </DashboardLayout>
  );
};

export default DashboardDocumentFlow;
