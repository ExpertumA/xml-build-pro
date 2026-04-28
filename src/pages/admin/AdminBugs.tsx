import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Plus, Bug as BugIcon } from "lucide-react";
import { BUGS, BUG_STATUS_LABELS, BugStatus, BugSeverity } from "@/lib/adminData";

const SEVERITY_TONE: Record<BugSeverity, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/10 text-primary",
  high: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  critical: "bg-destructive/10 text-destructive",
};
const SEVERITY_LABELS: Record<BugSeverity, string> = {
  low: "low",
  medium: "medium",
  high: "high",
  critical: "critical",
};
const STATUS_TONE: Record<BugStatus, string> = {
  new: "bg-primary/10 text-primary",
  in_progress: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  resolved: "bg-success/10 text-success",
  wontfix: "bg-muted text-muted-foreground",
};

const AdminBugs = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");

  const filtered = BUGS.filter((b) => {
    const okSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const okStatus = status === "all" || b.status === status;
    return okSearch && okStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Bug tracker</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Дефекты OCR, валидаторов, схемного редактора и UI
            </p>
          </div>
          <Button onClick={() => toast.success("Создана новая задача")}>
            <Plus className="h-4 w-4 mr-1.5" /> Новый баг
          </Button>
        </div>

        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ID или заголовок…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                {(Object.keys(BUG_STATUS_LABELS) as BugStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {BUG_STATUS_LABELS[s]}
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
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Заявка</TableHead>
                  <TableHead>Исполнитель</TableHead>
                  <TableHead>Создан</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.id}</TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      <BugIcon className="h-4 w-4 text-muted-foreground" />
                      {b.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{b.category}</TableCell>
                    <TableCell>
                      <Badge className={`border-0 ${SEVERITY_TONE[b.severity]}`}>
                        {SEVERITY_LABELS[b.severity]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`border-0 ${STATUS_TONE[b.status]}`}>
                        {BUG_STATUS_LABELS[b.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {b.ticketId ?? "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{b.assignee ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{b.createdAt}</TableCell>
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

export default AdminBugs;
