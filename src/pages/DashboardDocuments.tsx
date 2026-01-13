import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Download, Eye, Filter } from "lucide-react";

const documents = [
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
  {
    id: "6",
    name: "Заключение_экспертизы_ЖК.pdf",
    type: "Заключение экспертизы",
    status: "success" as const,
    schema: "minstroyZE_v1.5",
    date: "08.01.2025",
  },
  {
    id: "7",
    name: "ПЗ_Школа_№15.pdf",
    type: "Пояснительная записка",
    status: "success" as const,
    schema: "minstroyPZ_v2.1",
    date: "07.01.2025",
  },
  {
    id: "8",
    name: "Типовая_ПД_детсад.pdf",
    type: "Сведения о типовой ПД",
    status: "pending" as const,
    schema: "minstroyTPD_v1.0",
    date: "06.01.2025",
  },
];

const DashboardDocuments = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Документы</h1>
            <p className="text-muted-foreground">
              Все загруженные документы
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/upload">
              <Plus className="h-4 w-4 mr-2" />
              Загрузить документ
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
                  placeholder="Поиск по названию..." 
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents table */}
        <Card>
          <CardHeader>
            <CardTitle>Все документы</CardTitle>
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
                {documents.map((doc) => (
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

export default DashboardDocuments;
