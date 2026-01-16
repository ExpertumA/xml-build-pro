import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Eye,
  Plus,
  CheckCircle2,
  FileCode,
  ArrowRight,
} from "lucide-react";

interface ResultStepProps {
  documentType: string;
  objectType: string;
}

const ResultStep = ({ documentType, objectType }: ResultStepProps) => {
  const navigate = useNavigate();

  const documentName = documentType === "explanatory_note" 
    ? "Пояснительная записка" 
    : "Задание на проектирование";

  const objectName = objectType === "residential" 
    ? "Жилой объект" 
    : objectType === "non_residential" 
    ? "Нежилой объект" 
    : "Линейный объект";

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Success header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">XML-документ готов</h2>
        <Badge className="bg-success text-success-foreground hover:bg-success/90">
          Готов к передаче в Минстрой РФ
        </Badge>
      </div>

      {/* Document info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileCode className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{documentName}</h3>
              <p className="text-sm text-muted-foreground mb-3">{objectName}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">XSD-валидация пройдена</Badge>
                <Badge variant="secondary">Версия 1.0</Badge>
                <Badge variant="secondary">
                  {new Date().toLocaleDateString("ru-RU")}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Button size="lg" className="h-auto py-4">
          <Download className="w-5 h-5 mr-2" />
          Скачать XML
        </Button>
        <Button variant="outline" size="lg" className="h-auto py-4">
          <Eye className="w-5 h-5 mr-2" />
          Повторный предпросмотр
        </Button>
      </div>

      {/* Next steps */}
      <Card className="bg-muted/50">
        <CardContent className="p-6 space-y-4">
          <h4 className="font-medium">Что дальше?</h4>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard/documents")}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-background border hover:border-primary/50 transition-colors text-left"
            >
              <div>
                <p className="font-medium">Перейти к документам</p>
                <p className="text-sm text-muted-foreground">
                  Просмотреть все созданные документы
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-background border hover:border-primary/50 transition-colors text-left"
            >
              <div>
                <p className="font-medium">Создать новый документ</p>
                <p className="text-sm text-muted-foreground">
                  Начать создание нового XML
                </p>
              </div>
              <Plus className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <p className="text-center text-sm text-muted-foreground">
        Готовый документ и все загруженные файлы доступны в разделе «Документы»
        для просмотра и скачивания.
      </p>
    </div>
  );
};

export default ResultStep;
