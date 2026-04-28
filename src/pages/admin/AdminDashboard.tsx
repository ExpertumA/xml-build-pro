import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Inbox,
  Wrench,
  ShieldCheck,
  Send,
  Bug,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ADMIN_TICKETS, MANUAL_QUEUE, QA_QUEUE, PUBLISH_QUEUE, BUGS } from "@/lib/adminData";
import StageBadge from "@/components/admin/StageBadge";

const KPI = ({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  hint?: string;
}) => (
  <Card>
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-semibold mt-1">{value}</p>
          {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
        </div>
        <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const inQueue = ADMIN_TICKETS.filter((t) => !["published"].includes(t.stage)).length;
  const recentTickets = ADMIN_TICKETS.slice(0, 5);
  const criticalBugs = BUGS.filter((b) => b.severity === "critical" || b.severity === "high").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Инженерный обзор</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Состояние очередей, ручной обработки и QA на сегодня
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <KPI icon={Inbox} label="В очереди" value={inQueue} hint="Активных заявок" />
          <KPI icon={Wrench} label="Manual queue" value={MANUAL_QUEUE.length} hint="Требуют инженера" />
          <KPI icon={ShieldCheck} label="На QA" value={QA_QUEUE.length} />
          <KPI icon={Send} label="К публикации" value={PUBLISH_QUEUE.length} />
          <KPI icon={Bug} label="Баги high+" value={criticalBugs} hint="Открытых критичных" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Последние заявки</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin/queue">
                  Вся очередь <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentTickets.map((t) => (
                  <div key={t.id} className="px-6 py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                        <span className="text-sm font-medium truncate">{t.projectName}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {t.customer} · {t.documentType}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <StageBadge stage={t.stage} />
                      {t.priority === "urgent" && (
                        <Badge className="bg-destructive/10 text-destructive border-0">срочно</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">SLA и нагрузка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Среднее время обработки</p>
                  <p className="text-muted-foreground">12 мин · автоматический поток</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium">2 заявки приближаются к SLA</p>
                  <p className="text-muted-foreground">T-2040 · T-2039</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <p className="font-medium">98.4% автообработка</p>
                  <p className="text-muted-foreground">за последние 7 дней</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
