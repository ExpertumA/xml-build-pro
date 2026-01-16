import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  Upload,
  Eye,
  CheckCircle2,
  Trash2,
  Plus,
  FileText,
  AlertCircle,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "processing" | "done" | "error";
}

interface Section {
  id: string;
  title: string;
  files: UploadedFile[];
  notDeveloped: boolean;
}

interface DocumentUploadStepProps {
  onNext: () => void;
  onBack: () => void;
}

const projectSections = [
  { id: "section_1", title: "Раздел 1. Пояснительная записка" },
  { id: "section_2", title: "Раздел 2. Схема планировочной организации земельного участка" },
  { id: "section_3", title: "Раздел 3. Объемно-планировочные и архитектурные решения" },
  { id: "section_4", title: "Раздел 4. Конструктивные решения" },
  { id: "section_5", title: "Раздел 5. Инженерное оборудование и сети" },
  { id: "section_6", title: "Раздел 6. Технологические решения" },
  { id: "section_7", title: "Раздел 7. Проект организации строительства" },
  { id: "section_8", title: "Раздел 8. Охрана окружающей среды" },
  { id: "section_9", title: "Раздел 9. Пожарная безопасность" },
  { id: "section_10", title: "Раздел 10. Безопасная эксплуатация" },
  { id: "section_11", title: "Раздел 11. Доступность для инвалидов" },
  { id: "section_12", title: "Раздел 12. Смета" },
  { id: "section_13", title: "Раздел 13. Иная документация" },
];

const surveySections = [
  { id: "survey_geodetic", title: "Инженерно-геодезические" },
  { id: "survey_geological", title: "Инженерно-геологические" },
  { id: "survey_hydro", title: "Инженерно-гидрометеорологические" },
  { id: "survey_ecological", title: "Инженерно-экологические" },
  { id: "survey_additional", title: "Дополнительно" },
];

const permitSections = [
  { id: "permit_assignment", title: "Задание на проектирование" },
  { id: "permit_territory", title: "Документы по планировке территории / ГПЗУ" },
  { id: "permit_programs", title: "Задания и программы инженерных изысканий" },
  { id: "permit_reports", title: "Отчёты по инженерным изысканиям" },
  { id: "permit_conditions", title: "Технические условия (ст.48 ГрК РФ)" },
  { id: "permit_deviations", title: "Документы о согласовании отступлений" },
  { id: "permit_sro", title: "Выписка из реестра СРО" },
];

const DocumentUploadStep = ({ onNext, onBack }: DocumentUploadStepProps) => {
  const [sections, setSections] = useState<Record<string, Section>>(() => {
    const initial: Record<string, Section> = {};
    [...projectSections, ...surveySections, ...permitSections].forEach((s) => {
      initial[s.id] = { id: s.id, title: s.title, files: [], notDeveloped: false };
    });
    return initial;
  });

  const [openSections, setOpenSections] = useState<string[]>(["section_1"]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleFileDrop = (sectionId: string, files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      status: "uploading" as const,
    }));

    setSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        files: [...prev[sectionId].files, ...newFiles],
      },
    }));

    // Simulate upload
    newFiles.forEach((file) => {
      setTimeout(() => {
        setSections((prev) => ({
          ...prev,
          [sectionId]: {
            ...prev[sectionId],
            files: prev[sectionId].files.map((f) =>
              f.id === file.id ? { ...f, status: "processing" } : f
            ),
          },
        }));
      }, 1000);

      setTimeout(() => {
        setSections((prev) => ({
          ...prev,
          [sectionId]: {
            ...prev[sectionId],
            files: prev[sectionId].files.map((f) =>
              f.id === file.id ? { ...f, status: "done" } : f
            ),
          },
        }));
      }, 2500);
    });
  };

  const removeFile = (sectionId: string, fileId: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        files: prev[sectionId].files.filter((f) => f.id !== fileId),
      },
    }));
  };

  const toggleNotDeveloped = (sectionId: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        notDeveloped: !prev[sectionId].notDeveloped,
      },
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getSectionStatus = (section: Section) => {
    if (section.notDeveloped) return "skipped";
    if (section.files.length === 0) return "empty";
    if (section.files.some((f) => f.status === "uploading" || f.status === "processing"))
      return "processing";
    if (section.files.every((f) => f.status === "done")) return "done";
    return "empty";
  };

  const allRequiredUploaded = projectSections
    .slice(0, 12)
    .every((s) => {
      const section = sections[s.id];
      return section.notDeveloped || section.files.length > 0;
    });

  const renderSectionGroup = (
    title: string,
    sectionList: { id: string; title: string }[],
    showNotDeveloped: boolean = true
  ) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sectionList.map((s) => {
          const section = sections[s.id];
          const status = getSectionStatus(section);
          const isOpen = openSections.includes(s.id);

          return (
            <Collapsible
              key={s.id}
              open={isOpen}
              onOpenChange={() => toggleSection(s.id)}
            >
              <CollapsibleTrigger className="w-full">
                <div
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-colors",
                    isOpen ? "bg-muted/50" : "hover:bg-muted/30",
                    section.notDeveloped && "opacity-60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        status === "done" && "bg-success text-success-foreground",
                        status === "processing" && "bg-warning text-warning-foreground",
                        status === "skipped" && "bg-muted text-muted-foreground",
                        status === "empty" && "bg-border"
                      )}
                    >
                      {status === "done" && <Check className="w-3.5 h-3.5" />}
                      {status === "processing" && (
                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                    <span className="font-medium text-left">{s.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {section.files.length > 0 && (
                      <Badge variant="secondary">{section.files.length} файл(ов)</Badge>
                    )}
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-4">
                  {/* Not developed checkbox */}
                  {showNotDeveloped && (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`not-developed-${s.id}`}
                        checked={section.notDeveloped}
                        onCheckedChange={() => toggleNotDeveloped(s.id)}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <label
                              htmlFor={`not-developed-${s.id}`}
                              className="text-sm text-muted-foreground cursor-pointer"
                            >
                              Не разрабатывалось
                            </label>
                          </TooltipTrigger>
                          <TooltipContent>
                            Документ не разрабатывался в рамках проекта
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}

                  {!section.notDeveloped && (
                    <>
                      {/* Drop zone */}
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add("border-primary", "bg-primary/5");
                        }}
                        onDragLeave={(e) => {
                          e.currentTarget.classList.remove("border-primary", "bg-primary/5");
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("border-primary", "bg-primary/5");
                          const files = Array.from(e.dataTransfer.files);
                          handleFileDrop(s.id, files);
                        }}
                        className="border-2 border-dashed rounded-lg p-6 text-center transition-colors"
                      >
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Перетащите файлы или
                        </p>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.docx"
                          className="hidden"
                          id={`file-upload-${s.id}`}
                          onChange={(e) => {
                            if (e.target.files) {
                              handleFileDrop(s.id, Array.from(e.target.files));
                            }
                          }}
                        />
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor={`file-upload-${s.id}`} className="cursor-pointer">
                            <Plus className="w-4 h-4 mr-1" />
                            Добавить файл
                          </label>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">PDF, DOCX</p>
                      </div>

                      {/* Uploaded files */}
                      {section.files.length > 0 && (
                        <div className="space-y-2">
                          {section.files.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                            >
                              <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate text-sm">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{file.size}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {file.status === "uploading" && (
                                  <span className="text-xs text-muted-foreground">Загрузка...</span>
                                )}
                                {file.status === "processing" && (
                                  <span className="text-xs text-primary">Обработка...</span>
                                )}
                                {file.status === "done" && (
                                  <CheckCircle2 className="w-5 h-5 text-success" />
                                )}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Посмотреть</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <CheckCircle2 className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Проверка</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => removeFile(s.id, file.id)}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Удалить</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Загрузка документов</h2>
        <p className="text-muted-foreground">
          Отмеченные как «Не разрабатывалось» разделы корректно учитываются при формировании XML.
        </p>
      </div>

      {/* Status indicator */}
      <Card className={cn("border-2", allRequiredUploaded ? "border-success bg-success/5" : "border-warning bg-warning/5")}>
        <CardContent className="p-4 flex items-center gap-3">
          {allRequiredUploaded ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-success" />
              <span className="font-medium text-success">Все обязательные документы загружены</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-6 h-6 text-warning" />
              <span className="font-medium text-warning">Есть необязательные / пропущенные разделы</span>
            </>
          )}
        </CardContent>
      </Card>

      {renderSectionGroup("3.1 Состав проектной документации", projectSections)}
      {renderSectionGroup("3.2 Инженерные изыскания", surveySections)}
      {renderSectionGroup("3.3 Исходно-разрешительная документация", permitSections, false)}

      <div className="flex justify-between pt-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Назад
        </Button>
        <Button size="lg" onClick={onNext}>
          Перейти к генерации XML
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadStep;
