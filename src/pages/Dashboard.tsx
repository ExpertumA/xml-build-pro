import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Eye,
  FolderKanban,
  AlertTriangle,
  CheckCircle2,
  Wallet,
  Users,
  Bell,
  FileSearch,
} from "lucide-react";
import { PROJECTS } from "@/lib/projectsData";

const stats = [
  {
    title: "Активные проекты",
    value: PROJECTS.filter((p) => !["ready", "expired"].includes(p.status)).length,
    icon: FolderKanban,
    color: "text-primary",
  },
  {
    title: "На проверке",
    value: PROJECTS.filter((p) => p.status === "needs_user_action" || p.status === "in_review").length,
    icon: FileSearch,
    color: "text-amber-600",
  },
  {
    title: "С ошибками",
    value: PROJECTS.filter((p) => p.status === "error").length,
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Готовые XML",
    value: PROJECTS.filter((p) => p.status === "ready").length,
    icon: CheckCircle2,
    color: "text-success",
  },
];

const notifications = [
  {
    id: "n1",
    text: "Есть проекты, требующие проверки",
    detail: "Логистический центр, склад А — поля с низкой уверенностью",
    tone: "warning" as const,
  },
  {
    id: "n2",
    text: "Есть готовые XML для скачивания",
    detail: "ЖК «Северный квартал», корпус 3",
    tone: "success" as const,
  },
  {
    id: "n3",
    text: "Найдены ошибки в проекте",
    detail: "Реконструкция школы №15 — XML не прошёл XSD",
    tone: "danger" as const,
  },
];

const Dashboard = () => {
  const recent = PROJECTS.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Здравствуйте, Иван</h1>
            <p className="text-muted-foreground">
              Тариф «Проект» · Баланс: 12 500 ₽
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/dashboard/billing-documents">
                <Wallet className="h-4 w-4 mr-2" />
                Пополнить
              </Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                Создать проект
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent projects */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Последние проекты</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/projects">Все проекты</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="hidden md:table-cell">Обновлён</TableHead>
                    <TableHead className="text-right">Открыть</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium max-w-[260px] truncate">
                        <Link
                          to={`/dashboard/projects/${p.id}`}
                          className="hover:underline"
                        >
                          {p.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {p.documentTypeLabel}
                        </div>
                      </TableCell>
                      <TableCell>
                        <ProjectStatusBadge status={p.status} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {p.updatedAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/dashboard/projects/${p.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Notifications + Quick actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Уведомления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-lg border p-3 text-sm ${
                      n.tone === "warning"
                        ? "border-amber-200 bg-amber-50/60 dark:bg-amber-500/5"
                        : n.tone === "danger"
                        ? "border-destructive/30 bg-destructive/5"
                        : "border-success/30 bg-success/5"
                    }`}
                  >
                    <p className="font-medium">{n.text}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{n.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/dashboard/projects/new">
                    <Plus className="h-4 w-4 mr-2" /> Создать проект
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/dashboard/billing-documents">
                    <Wallet className="h-4 w-4 mr-2" /> Перейти в оплату
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/dashboard/company">
                    <Users className="h-4 w-4 mr-2" /> Сотрудники
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
