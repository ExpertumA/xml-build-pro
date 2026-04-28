import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import StageBadge from "@/components/admin/StageBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ArrowUpRight } from "lucide-react";
import { ADMIN_TICKETS, TICKET_STAGE_LABELS, TicketStage } from "@/lib/adminData";

const PRIORITY_LABELS = { low: "Низкий", normal: "Обычный", high: "Высокий", urgent: "Срочно" };
const PRIORITY_TONE: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  normal: "bg-muted text-muted-foreground",
  high: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  urgent: "bg-destructive/10 text-destructive",
};

const AdminQueue = () => {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");

  const filtered = ADMIN_TICKETS.filter((t) => {
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.projectName.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === "all" || t.stage === stageFilter;
    return matchSearch && matchStage;
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Очередь заявок</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Все входящие заявки на формирование XML
          </p>
        </div>

        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ID, проект, заказчик…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Стадия" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все стадии</SelectItem>
                {(Object.keys(TICKET_STAGE_LABELS) as TicketStage[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {TICKET_STAGE_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Проект</TableHead>
                  <TableHead>Заказчик</TableHead>
                  <TableHead>Стадия</TableHead>
                  <TableHead>Приоритет</TableHead>
                  <TableHead>Инженер</TableHead>
                  <TableHead>SLA, ч</TableHead>
                  <TableHead>Обновлён</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                    <TableCell className="font-medium">{t.projectName}</TableCell>
                    <TableCell className="text-muted-foreground">{t.customer}</TableCell>
                    <TableCell>
                      <StageBadge stage={t.stage} />
                    </TableCell>
                    <TableCell>
                      <Badge className={`border-0 ${PRIORITY_TONE[t.priority]}`}>
                        {PRIORITY_LABELS[t.priority]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{t.assignee ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{t.slaHours}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {t.updatedAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast(`Открыта заявка ${t.id}`)}
                      >
                        Открыть <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-10">
                      Ничего не найдено
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminQueue;
