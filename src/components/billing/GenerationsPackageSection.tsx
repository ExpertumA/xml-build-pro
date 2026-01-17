import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type PackageStatus = "active" | "exhausted" | "expired" | "inactive";

interface GenerationsPackageSectionProps {
  offerAccepted: boolean;
  packageData?: {
    name: string;
    status: PackageStatus;
    generationsRemaining: number;
    generationsTotal: number;
    expiresAt: string;
  };
  onBuyPackage: () => void;
  onTopUp: () => void;
}

const getStatusConfig = (status: PackageStatus) => {
  switch (status) {
    case "active":
      return {
        label: "Пакет активен",
        color: "bg-success/10 text-success hover:bg-success/20",
        icon: CheckCircle2,
        iconColor: "text-success",
      };
    case "exhausted":
      return {
        label: "Лимит исчерпан",
        color: "bg-warning/10 text-warning hover:bg-warning/20",
        icon: AlertCircle,
        iconColor: "text-warning",
      };
    case "expired":
      return {
        label: "Срок действия истёк",
        color: "bg-muted text-muted-foreground",
        icon: AlertCircle,
        iconColor: "text-muted-foreground",
      };
    case "inactive":
    default:
      return {
        label: "Пакет не активирован",
        color: "bg-muted text-muted-foreground",
        icon: AlertCircle,
        iconColor: "text-muted-foreground",
      };
  }
};

const GenerationsPackageSection = ({
  offerAccepted,
  packageData,
  onBuyPackage,
  onTopUp,
}: GenerationsPackageSectionProps) => {
  const hasPackage = !!packageData;
  const displayData = packageData || {
    name: "",
    status: "inactive" as PackageStatus,
    generationsRemaining: 0,
    generationsTotal: 0,
    expiresAt: "—",
  };

  const statusConfig = getStatusConfig(displayData.status);
  const StatusIcon = statusConfig.icon;
  const usagePercent =
    displayData.generationsTotal > 0
      ? (displayData.generationsRemaining / displayData.generationsTotal) * 100
      : 0;
  const hasActivePackage =
    displayData.status === "active" || displayData.status === "exhausted";

  const renderButton = (
    text: string,
    onClick: () => void,
    variant: "default" | "outline" = "default"
  ) => {
    const button = (
      <Button variant={variant} onClick={onClick} disabled={!offerAccepted}>
        {text}
      </Button>
    );

    if (!offerAccepted) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{button}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Для продолжения необходимо принять публичную оферту</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Текущий пакет генераций
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status badge */}
        <div className="flex items-center gap-3">
          <Badge className={statusConfig.color}>
            <StatusIcon
              className={`h-3.5 w-3.5 mr-1.5 ${statusConfig.iconColor}`}
            />
            {statusConfig.label}
          </Badge>
          {hasActivePackage && hasPackage && (
            <span className="text-sm text-muted-foreground">
              Тариф: {displayData.name}
            </span>
          )}
        </div>

        {/* Main stats - large display */}
        {hasPackage ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Осталось генераций</p>
              <p className="text-4xl font-bold tracking-tight">
                {displayData.generationsRemaining}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Действует до</p>
              <p className="text-4xl font-bold tracking-tight flex items-center gap-2">
                <Calendar className="h-6 w-6 text-muted-foreground" />
                {displayData.expiresAt}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">
              У вас нет активного пакета генераций.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Приобретите пакет или активируйте тестовый доступ для начала работы.
            </p>
          </div>
        )}

        {/* Progress bar */}
        {hasActivePackage && hasPackage && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Использовано</span>
              <span className="font-medium">
                {displayData.generationsTotal - displayData.generationsRemaining}{" "}
                из {displayData.generationsTotal}
              </span>
            </div>
            <Progress value={100 - usagePercent} className="h-2" />
          </div>
        )}

        {/* Warning text */}
        {hasPackage && (
          <p className="text-sm text-muted-foreground">
            Неиспользованные генерации аннулируются после окончания срока
            действия пакета.
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {renderButton(hasPackage ? "Изменить пакет" : "Купить пакет", onBuyPackage)}
          {hasActivePackage && renderButton("Пополнить лимит", onTopUp, "outline")}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationsPackageSection;
