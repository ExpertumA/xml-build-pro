import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MANUAL_QUEUE } from "@/lib/adminData";
import { Wrench, AlertTriangle, User } from "lucide-react";

const AdminManualQueue = () => {
  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Manual queue</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Заявки, требующие ручной сборки в схемном редакторе
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {MANUAL_QUEUE.map((t) => (
            <Card key={t.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-amber-600" />
                      <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                      <Badge className="bg-amber-100 text-amber-700 border-0 dark:bg-amber-500/10 dark:text-amber-300">
                        SLA {t.slaHours}ч
                      </Badge>
                    </div>
                    <CardTitle className="text-base mt-1.5">{t.projectName}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.customer} · {t.documentType}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 p-3 rounded-md bg-amber-50 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/20 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Причина перевода в manual</p>
                    <p className="text-muted-foreground">{t.reason}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Инженер:</span>
                  <span className="font-medium">{t.assignee ?? "не назначен"}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Чек-лист обработки
                  </p>
                  {t.steps.map((s) => (
                    <div key={s.id} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={s.done} disabled />
                      <span className={s.done ? "text-muted-foreground line-through" : ""}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" onClick={() => toast.success("Открыт схемный редактор")}>
                    Схемный редактор
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast("Запущена повторная валидация")}
                  >
                    Перевалидировать
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success("Передано в QA")}
                  >
                    Передать в QA
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminManualQueue;
