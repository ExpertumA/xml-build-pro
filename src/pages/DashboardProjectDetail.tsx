import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Download,
  FileText,
  Play,
  Eye,
  Plus,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { getProject } from "@/lib/projectsData";

const STEPS = [
  "Загрузка",
  "OCR",
  "Извлечение",
  "Нормализация",
  "XML",
  "XSD",
  "Готово",
];

const DashboardProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? getProject(id) : undefined;

  if (!project) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
          <h2 className="text-xl font-semibold">Проект не найден</h2>
          <Button asChild variant="outline">
            <Link to="/dashboard/projects">К списку проектов</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const progress =
    project.status === "ready"
      ? 100
      : project.status === "draft"
      ? 5
      : project.status === "needs_user_action"
      ? 60
      : project.status === "error"
      ? 70
      : 40;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> К проектам
        </Button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold">{project.name}</h1>
              <ProjectStatusBadge status={project.status} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>{project.documentTypeLabel}</span>
              <span>· {project.objectType}</span>
              <span>· Создан {project.createdAt}</span>
              <span>· Схема {project.xsdVersion}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.status !== "ready" && (
              <Button onClick={() => toast.success("Генерация запущена")}>
                <Play className="h-4 w-4 mr-1.5" /> Запустить генерацию
              </Button>
            )}
            {project.status === "ready" && (
              <>
                <Button variant="outline" onClick={() => toast.success("Скачивание началось")}>
                  <Download className="h-4 w-4 mr-1.5" /> Скачать ZIP
                </Button>
                <Button variant="outline" onClick={() => toast("Открываем предпросмотр")}>
                  <Eye className="h-4 w-4 mr-1.5" /> Предпросмотр
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => toast("Создана новая версия")}>
              <Plus className="h-4 w-4 mr-1.5" /> Новая версия
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {project.status === "needs_user_action" && (
          <Card className="border-amber-200 bg-amber-50/60 dark:bg-amber-500/5">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Есть поля с низкой уверенностью</p>
                <p className="text-muted-foreground">
                  Проверьте подсвеченные значения на шаге предпросмотра, прежде чем формировать XML.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {project.status === "error" && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">XML не прошёл XSD-проверку</p>
                <p className="text-muted-foreground">
                  Найдено ошибок: {project.errorsCount}. Откройте вкладку «Ошибки», чтобы их исправить.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {project.status === "ready" && (
          <Card className="border-success/30 bg-success/5">
            <CardContent className="p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">XML прошёл XSD-проверку. Архив сформирован.</p>
                <p className="text-muted-foreground">
                  Документ сформирован и готов к передаче в Минстрой РФ.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Прогресс по шагам</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={progress} />
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {STEPS.map((s, i) => (
                <Badge key={s} variant="outline" className="font-normal">
                  {i + 1}. {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="files">
          <TabsList>
            <TabsTrigger value="files">Файлы</TabsTrigger>
            <TabsTrigger value="versions">Версии XML</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {project.files.length === 0 ? (
                  <div className="p-10 text-center text-muted-foreground text-sm">
                    Файлы ещё не загружены.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Файл</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Размер</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {project.files.map((f) => (
                        <TableRow key={f.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {f.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{f.kind}</TableCell>
                          <TableCell className="text-muted-foreground">{f.size}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versions" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {project.xmlVersions.length === 0 ? (
                  <div className="p-10 text-center text-muted-foreground text-sm">
                    Версии XML пока не сформированы.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Версия</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Автор</TableHead>
                        <TableHead>XSD</TableHead>
                        <TableHead className="hidden md:table-cell">Checksum</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {project.xmlVersions.map((v) => (
                        <TableRow key={v.id}>
                          <TableCell className="font-medium">{v.version}</TableCell>
                          <TableCell className="text-muted-foreground">{v.date}</TableCell>
                          <TableCell className="text-muted-foreground">{v.author}</TableCell>
                          <TableCell>
                            {v.xsdPassed ? (
                              <Badge className="bg-success/10 text-success hover:bg-success/15 border-0">
                                Прошёл
                              </Badge>
                            ) : (
                              <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/15 border-0">
                                Не прошёл
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground font-mono text-xs">
                            {v.checksum}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast.success("Скачивание началось")}
                            >
                              <Download className="h-4 w-4 mr-1" /> Скачать
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Кто</TableHead>
                      <TableHead>Действие</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.history.map((h) => (
                      <TableRow key={h.id}>
                        <TableCell className="text-muted-foreground whitespace-nowrap">
                          {h.date}
                        </TableCell>
                        <TableCell>{h.actor}</TableCell>
                        <TableCell>{h.text}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProjectDetail;
