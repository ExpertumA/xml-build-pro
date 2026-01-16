import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode, Edit2, Save, X, MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewStepProps {
  documentType: string;
  objectType: string;
  onConfirm: () => void;
  onBack: () => void;
}

// Sample XML structure for preview
const generateSampleXML = (docType: string, objType: string) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:minstroy:pd:${docType}">
  <DocumentInfo>
    <DocumentType>${docType === "explanatory_note" ? "Пояснительная записка" : "Задание на проектирование"}</DocumentType>
    <ObjectType>${objType === "residential" ? "Жилой" : objType === "non_residential" ? "Нежилой" : "Линейный"}</ObjectType>
    <CreationDate>${new Date().toISOString().split("T")[0]}</CreationDate>
    <SchemaVersion>1.0.0</SchemaVersion>
  </DocumentInfo>
  
  <ProjectInfo>
    <Name>Наименование проекта</Name>
    <Address>Адрес объекта строительства</Address>
    <Customer>Заказчик</Customer>
    <Contractor>Подрядчик</Contractor>
  </ProjectInfo>

  <Sections>
    <Section id="1" name="Пояснительная записка">
      <Content>Содержимое раздела...</Content>
    </Section>
    <Section id="2" name="Схема планировочной организации">
      <Content>Содержимое раздела...</Content>
    </Section>
  </Sections>

  <ValidationInfo>
    <XSDVersion>Минстрой РФ v2.1</XSDVersion>
    <Status>Validated</Status>
  </ValidationInfo>
</Document>`;
};

interface XMLBlock {
  id: string;
  name: string;
  content: string;
  editable: boolean;
  hint?: string;
}

const PreviewStep = ({ documentType, objectType, onConfirm, onBack }: PreviewStepProps) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [xmlBlocks, setXmlBlocks] = useState<XMLBlock[]>([
    {
      id: "docInfo",
      name: "Информация о документе",
      content: `DocumentType: ${documentType === "explanatory_note" ? "Пояснительная записка" : "Задание на проектирование"}
ObjectType: ${objectType === "residential" ? "Жилой" : objectType === "non_residential" ? "Нежилой" : "Линейный"}
CreationDate: ${new Date().toISOString().split("T")[0]}`,
      editable: false,
      hint: "Автоматически заполнено на основе выбора",
    },
    {
      id: "projectInfo",
      name: "Информация о проекте",
      content: `Наименование: [Введите наименование проекта]
Адрес: [Введите адрес объекта]
Заказчик: [Введите наименование заказчика]
Подрядчик: [Введите наименование подрядчика]`,
      editable: true,
      hint: "Редактируемые поля проекта",
    },
    {
      id: "sections",
      name: "Разделы документации",
      content: `Раздел 1: Пояснительная записка ✓
Раздел 2: Схема планировочной организации ✓
Раздел 3: Архитектурные решения ✓
...`,
      editable: false,
      hint: "Сформировано из загруженных документов",
    },
    {
      id: "validation",
      name: "Результаты валидации",
      content: `XSD-схема: Минстрой РФ v2.1
Статус: Успешно
Ошибок: 0
Предупреждений: 0`,
      editable: false,
    },
  ]);

  const handleEditSave = (blockId: string, newContent: string) => {
    setXmlBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, content: newContent } : block
      )
    );
    setIsEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Предпросмотр XML-документа</h2>
        <p className="text-muted-foreground">
          Проверьте структуру и содержимое документа перед сохранением.
        </p>
      </div>

      {/* Info banner */}
      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="p-4 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">
            Редактирование не нарушает XSD-структуру. Вы можете изменять только текстовые поля.
          </p>
        </CardContent>
      </Card>

      {/* XML blocks */}
      <div className="space-y-4">
        {xmlBlocks.map((block) => (
          <Card key={block.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">{block.name}</CardTitle>
                </div>
                {block.editable && isEditing !== block.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(block.id)}
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                )}
              </div>
              {block.hint && (
                <p className="text-xs text-muted-foreground mt-1">{block.hint}</p>
              )}
            </CardHeader>
            <CardContent>
              {isEditing === block.id ? (
                <div className="space-y-3">
                  <Textarea
                    defaultValue={block.content}
                    className="font-mono text-sm min-h-[120px]"
                    id={`edit-${block.id}`}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        const textarea = document.getElementById(
                          `edit-${block.id}`
                        ) as HTMLTextAreaElement;
                        handleEditSave(block.id, textarea.value);
                      }}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Сохранить
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(null)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <pre
                  className={cn(
                    "p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre-wrap",
                    block.editable && "cursor-pointer hover:bg-muted/70"
                  )}
                  onClick={() => block.editable && setIsEditing(block.id)}
                >
                  {block.content}
                </pre>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Raw XML preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileCode className="w-5 h-5 text-muted-foreground" />
            Исходный XML
            <Badge variant="secondary">Только просмотр</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-lg border">
            <pre className="p-4 font-mono text-xs text-muted-foreground">
              {generateSampleXML(documentType, objectType)}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Назад
        </Button>
        <Button size="lg" onClick={onConfirm}>
          Подтвердить и сохранить
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default PreviewStep;
