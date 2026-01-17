import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText, Receipt, FileCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClosingDocument {
  id: string;
  type: "invoice" | "act" | "upd";
  name: string;
  date: string;
  invoiceNumber: string;
}

interface ClosingDocumentsSectionProps {
  documents?: ClosingDocument[];
}

const documentTypeConfig = {
  invoice: { label: "Счёт", icon: Receipt },
  act: { label: "Акт", icon: FileCheck },
  upd: { label: "УПД", icon: FileText },
};

const defaultDocuments: ClosingDocument[] = [
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
    type: "upd",
    name: "УПД №УПД-2025-001",
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

const ClosingDocumentsSection = ({ documents = defaultDocuments }: ClosingDocumentsSectionProps) => {
  const { toast } = useToast();

  const handleDownload = (docName: string) => {
    toast({
      title: "Загрузка начата",
      description: `Документ "${docName}" загружается`,
    });
  };

  return (
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
        <p className="text-xs text-muted-foreground mt-4">
          Документы формируются в электронном виде и признаются равнозначными документам на бумажном носителе.
        </p>
      </CardContent>
    </Card>
  );
};

export default ClosingDocumentsSection;
