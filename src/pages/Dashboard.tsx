import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatusBadge from "@/components/dashboard/StatusBadge";
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
  Upload, 
  FileCheck, 
  AlertCircle, 
  Gauge,
  Plus,
  Download,
  Eye
} from "lucide-react";

const stats = [
  {
    title: "Загружено документов",
    value: "24",
    icon: Upload,
    color: "text-primary",
  },
  {
    title: "Успешно сформировано",
    value: "21",
    icon: FileCheck,
    color: "text-success",
  },
  {
    title: "С ошибками",
    value: "3",
    icon: AlertCircle,
    color: "text-destructive",
  },
  {
    title: "Остаток по тарифу",
    value: "26 / 50",
    icon: Gauge,
    color: "text-primary",
  },
];

const recentDocuments = [
  {
    id: "1",
    name: "ПЗ_Жилой_комплекс_Новый.pdf",
    type: "Пояснительная записка",
    status: "success" as const,
    schema: "minstroyPZ_v2.1",
    date: "12.01.2025",
  },
  {
    id: "2",
    name: "Задание_проектирование_склад.docx",
    type: "Задание на проектирование",
    status: "success" as const,
    schema: "minstroyZP_v1.3",
    date: "11.01.2025",
  },
  {
    id: "3",
    name: "Конъюнктурный_анализ_Q4.xlsx",
    type: "Конъюнктурный анализ",
    status: "error" as const,
    schema: "minstroyKA_v1.0",
    date: "10.01.2025",
  },
  {
    id: "4",
    name: "Ведомость_объемов_офис.pdf",
    type: "Ведомость объёмов работ",
    status: "processing" as const,
    schema: "minstroyVOR_v2.0",
    date: "10.01.2025",
  },
  {
    id: "5",
    name: "ПЗ_Торговый_центр.pdf",
    type: "Пояснительная записка",
    status: "success" as const,
    schema: "minstroyPZ_v2.1",
    date: "09.01.2025",
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Обзор</h1>
            <p className="text-muted-foreground">
              Статистика и последние документы
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/upload">
              <Plus className="h-4 w-4 mr-2" />
              Загрузить документ
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
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

        {/* Recent documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Последние документы</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/documents">Все документы</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead className="hidden md:table-cell">Тип</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="hidden lg:table-cell">XML-схема</TableHead>
                  <TableHead className="hidden sm:table-cell">Дата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {doc.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {doc.type}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={doc.status} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground font-mono text-sm">
                      {doc.schema}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {doc.date}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/dashboard/documents/${doc.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        {doc.status === "success" && (
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
