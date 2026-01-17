import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { formatPrice } from "@/lib/pricing";

interface DocumentPrice {
  documentType: string;
  documentName: string;
  priceRub: number;
  isAvailable: boolean;
}

interface DocumentPricesSectionProps {
  prices: DocumentPrice[];
}

const DocumentPricesSection = ({ prices }: DocumentPricesSectionProps) => {
  // Filter only pay-per-generation documents
  const payPerGenDocs = prices.filter(
    (p) => p.documentType !== 'expertise_conclusion'
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Стоимость генерации документов
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Документ</TableHead>
              <TableHead className="text-right">Стоимость</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payPerGenDocs.map((doc) => (
              <TableRow key={doc.documentType}>
                <TableCell className="font-medium">
                  {doc.documentName}
                </TableCell>
                <TableCell className="text-right">
                  {doc.isAvailable ? (
                    <span className="font-semibold">
                      {formatPrice(doc.priceRub)}
                    </span>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Скоро
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground mt-4">
          Повторная генерация документа оплачивается отдельно.
        </p>
      </CardContent>
    </Card>
  );
};

export default DocumentPricesSection;
