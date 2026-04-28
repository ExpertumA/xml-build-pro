import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_TONE, ProjectStatus } from "@/lib/projectsData";
import { cn } from "@/lib/utils";

const TONE_CLASSES: Record<string, string> = {
  neutral: "bg-secondary text-foreground hover:bg-secondary",
  info: "bg-primary/10 text-primary hover:bg-primary/15",
  warning: "bg-amber-100 text-amber-900 hover:bg-amber-100 dark:bg-amber-500/15 dark:text-amber-300",
  success: "bg-success/10 text-success hover:bg-success/15",
  danger: "bg-destructive/10 text-destructive hover:bg-destructive/15",
};

const ProjectStatusBadge = ({ status }: { status: ProjectStatus }) => {
  const tone = PROJECT_STATUS_TONE[status];
  return (
    <Badge variant="secondary" className={cn("font-medium border-0", TONE_CLASSES[tone])}>
      {PROJECT_STATUS_LABELS[status]}
    </Badge>
  );
};

export default ProjectStatusBadge;
