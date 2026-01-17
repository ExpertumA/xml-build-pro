import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Стоимость генерации документов
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {payPerGenDocs.map((doc) => (
            <div key={doc.documentType} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <span className="text-sm">{doc.documentName}</span>
              {doc.isAvailable ? (
                <span className="text-sm font-semibold whitespace-nowrap ml-4">
                  {formatPrice(doc.priceRub)}
                </span>
              ) : (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Скоро
                </Badge>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
          Повторная генерация документа оплачивается отдельно.
        </p>
      </CardContent>
    </Card>
  );
};

export default DocumentPricesSection;
