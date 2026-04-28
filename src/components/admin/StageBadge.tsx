import { Badge } from "@/components/ui/badge";
import { TICKET_STAGE_LABELS, TICKET_STAGE_TONE, TicketStage } from "@/lib/adminData";

const TONE_CLASSES: Record<string, string> = {
  neutral: "bg-muted text-muted-foreground hover:bg-muted",
  info: "bg-primary/10 text-primary hover:bg-primary/15 border-0",
  warning: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 dark:bg-amber-500/10 dark:text-amber-300",
  success: "bg-success/10 text-success hover:bg-success/15 border-0",
  danger: "bg-destructive/10 text-destructive hover:bg-destructive/15 border-0",
};

const StageBadge = ({ stage }: { stage: TicketStage }) => {
  const tone = TICKET_STAGE_TONE[stage];
  return <Badge className={TONE_CLASSES[tone]}>{TICKET_STAGE_LABELS[stage]}</Badge>;
};

export default StageBadge;
