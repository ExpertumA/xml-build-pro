import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Eye,
  Download,
  Trash2,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { PROJECTS, PROJECT_STATUS_LABELS, ProjectStatus } from "@/lib/projectsData";

const DashboardProjects = () => {
  const [query, setQuery] = useState("");
  const [docType, setDocType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (query) {
        const q = query.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inFiles = p.files.some((f) => f.name.toLowerCase().includes(q));
        if (!inName && !inFiles) return false;
      }
      if (docType !== "all" && p.documentType !== docType) return false;
      if (status !== "all" && p.status !== status) return false;
      return true;
    });
  }, [query, docType, status]);

  const activeFilters =
    (docType !== "all" ? 1 : 0) + (status !== "all" ? 1 : 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Проекты</h1>
            <p className="text-muted-foreground">
              Все сессии формирования XML и загруженные документы
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              Создать проект
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию проекта или файла…"
                  className="pl-9"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Фильтры
                    {activeFilters > 0 && (
                      <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs px-1.5">
                        {activeFilters}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Фильтры</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-5 mt-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Тип документа</label>
                      <Select value={docType} onValueChange={setDocType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все типы документов</SelectItem>
                          <SelectItem value="explanatory_note">
                            Пояснительная записка
                          </SelectItem>
                          <SelectItem value="design_assignment">
                            Задание на проектирование
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Статус</label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все статусы</SelectItem>
                          {Object.entries(PROJECT_STATUS_LABELS).map(([k, v]) => (
                            <SelectItem key={k} value={k}>
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setDocType("all");
                        setStatus("all");
                      }}
                    >
                      Сбросить
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>

        {/* Projects table */}
        <Card>
          <CardHeader>
            <CardTitle>Все проекты</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead className="hidden md:table-cell">Тип документа</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="hidden lg:table-cell">XML-схема</TableHead>
                  <TableHead className="hidden lg:table-cell">Версии</TableHead>
                  <TableHead className="hidden xl:table-cell">Ошибки</TableHead>
                  <TableHead className="hidden sm:table-cell">Обновлён</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground py-10"
                    >
                      Проекты не найдены
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium max-w-[280px]">
                        <Link
                          to={`/dashboard/projects/${p.id}`}
                          className="hover:underline truncate block"
                        >
                          {p.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {p.objectType} · файлов: {p.files.length}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {p.documentTypeLabel}
                      </TableCell>
                      <TableCell>
                        <ProjectStatusBadge status={p.status as ProjectStatus} />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground font-mono text-sm">
                        {p.xsdVersion}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {p.versions}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        {p.errorsCount > 0 ? (
                          <span className="inline-flex items-center gap-1 text-destructive text-sm">
                            <AlertTriangle className="h-3.5 w-3.5" /> {p.errorsCount}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {p.updatedAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/dashboard/projects/${p.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          {p.status === "ready" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toast.success("Скачивание началось")}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              toast("Проект удалён", { description: p.name })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProjects;
