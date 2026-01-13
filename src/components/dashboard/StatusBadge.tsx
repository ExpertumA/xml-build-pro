import { Badge } from "@/components/ui/badge";

type StatusType = "success" | "error" | "processing" | "pending";

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  success: {
    label: "Готов",
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  error: {
    label: "Ошибка",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
  processing: {
    label: "Обработка",
    className: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  pending: {
    label: "В очереди",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
