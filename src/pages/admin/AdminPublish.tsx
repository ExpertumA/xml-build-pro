import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Send, Package } from "lucide-react";
import { PUBLISH_QUEUE } from "@/lib/adminData";

const AdminPublish = () => {
  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Публикация результата</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Готовые архивы, ожидающие выдачи клиенту
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Заявка</TableHead>
                  <TableHead>Проект</TableHead>
                  <TableHead>Заказчик</TableHead>
                  <TableHead>Одобрил</TableHead>
                  <TableHead>Когда</TableHead>
                  <TableHead>Архив</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PUBLISH_QUEUE.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {p.ticketId}
                    </TableCell>
                    <TableCell className="font-medium">{p.projectName}</TableCell>
                    <TableCell className="text-muted-foreground">{p.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{p.approvedBy}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {p.approvedAt}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Package className="h-3.5 w-3.5" />
                        {p.archiveSize}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => toast.success(`${p.id}: статус «Готов к скачиванию»`)}
                      >
                        <Send className="h-4 w-4 mr-1" /> Опубликовать клиенту
                      </Button>
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

export default AdminPublish;
