import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, FileText, CheckCircle, XCircle, Clock } from "lucide-react";

const DashboardDocument = () => {
  const { id } = useParams();

  // Demo data
  const document = {
    id,
    name: "ПЗ_Жилой_комплекс_Новый.pdf",
    type: "Пояснительная записка",
    status: "success" as const,
    schema: "minstroyPZ_v2.1",
    date: "12.01.2025",
    size: "2.4 MB",
  };

  const validationLogs = [
    { time: "14:32:15", type: "success", message: "Документ загружен успешно" },
    { time: "14:32:18", type: "success", message: "Тип документа определён: Пояснительная записка" },
    { time: "14:32:20", type: "success", message: "Применена схема minstroyPZ_v2.1" },
    { time: "14:32:25", type: "success", message: "Структура документа соответствует XSD" },
    { time: "14:32:28", type: "success", message: "Обязательные поля заполнены корректно" },
    { time: "14:32:30", type: "success", message: "Валидация завершена успешно" },
  ];

  const xmlPreview = `<?xml version="1.0" encoding="UTF-8"?>
<ProjectDocumentation 
  xmlns="http://minstroyrf.gov.ru/xml/pd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://minstroyrf.gov.ru/xml/pd minstroyPZ_v2.1.xsd">
  
  <DocumentInfo>
    <DocumentType>ПояснительнаяЗаписка</DocumentType>
    <DocumentNumber>ПЗ-2025-001</DocumentNumber>
    <CreationDate>2025-01-12</CreationDate>
  </DocumentInfo>
  
  <ProjectInfo>
    <ProjectName>Жилой комплекс "Новый"</ProjectName>
    <ProjectAddress>
      <Region>Московская область</Region>
      <City>Москва</City>
      <Street>ул. Примерная</Street>
    </ProjectAddress>
  </ProjectInfo>
  
  <!-- Продолжение документа... -->
</ProjectDocumentation>`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/documents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{document.name}</h1>
            <p className="text-muted-foreground">{document.type}</p>
          </div>
          {document.status === "success" && (
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Скачать XML
            </Button>
          )}
        </div>

        {/* Document info */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Информация о документе</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Исходный файл</p>
                  <div className="flex items-center gap-2 mt-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{document.name}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Размер</p>
                  <p className="font-medium mt-1">{document.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">XML-схема</p>
                  <p className="font-mono text-sm mt-1">{document.schema}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Дата загрузки</p>
                  <p className="font-medium mt-1">{document.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Статус валидации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-medium">Проверка пройдена</p>
                  <p className="text-sm text-muted-foreground">XSD валидация успешна</p>
                </div>
              </div>
              <StatusBadge status={document.status} />
            </CardContent>
          </Card>
        </div>

        {/* Validation logs */}
        <Card>
          <CardHeader>
            <CardTitle>Логи валидации</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {validationLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-xs text-muted-foreground font-mono w-16 pt-0.5">
                    {log.time}
                  </span>
                  {log.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  ) : log.type === "error" ? (
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm">{log.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* XML Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Предпросмотр XML</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-muted-foreground whitespace-pre">
                {xmlPreview}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardDocument;
