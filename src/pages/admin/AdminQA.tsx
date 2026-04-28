import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Eye } from "lucide-react";
import { QA_QUEUE } from "@/lib/adminData";

const PassFail = ({ ok }: { ok: boolean }) =>
  ok ? (
    <Badge className="bg-success/10 text-success border-0">
      <CheckCircle2 className="h-3 w-3 mr-1" /> прошёл
    </Badge>
  ) : (
    <Badge className="bg-destructive/10 text-destructive border-0">
      <XCircle className="h-3 w-3 mr-1" /> ошибки
    </Badge>
  );

const AdminQA = () => {
  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Внутренняя проверка (QA)</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Финальная проверка собранного XML перед публикацией клиенту
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>QA ID</TableHead>
                  <TableHead>Заявка</TableHead>
                  <TableHead>Проект</TableHead>
                  <TableHead>Собрал</TableHead>
                  <TableHead>XSD</TableHead>
                  <TableHead>Бизнес-правила</TableHead>
                  <TableHead>Ревьюер</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {QA_QUEUE.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-mono text-xs">{q.id}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {q.ticketId}
                    </TableCell>
                    <TableCell className="font-medium">{q.projectName}</TableCell>
                    <TableCell className="text-muted-foreground">{q.builtBy}</TableCell>
                    <TableCell>
                      <PassFail ok={q.xsdPassed} />
                    </TableCell>
                    <TableCell>
                      <PassFail ok={q.businessRulesPassed} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {q.reviewer ?? "не назначен"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toast("Открыт HTML / XML preview")}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Превью
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast("Возврат на доработку")}
                        >
                          На доработку
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toast.success("Одобрено, отправлено в публикацию")}
                        >
                          Одобрить
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminQA;
