import { Chip } from "@mui/material";
import type { TServiceState } from "../models/backend";

const STATUS_COLOR_MAP: Record<
  TServiceState,
  "default" | "primary" | "secondary" | "success" | "warning" | "error"
> = {
  NUEVO: "default",
  EN_ANALISIS: "warning",
  ASIGNADO: "primary",
  EN_CURSO: "secondary",
  ESPERANDO_CLIENTE: "warning",
  ESPERANDO_PROVEEDOR: "warning",
  RESUELTO: "success",
  CERRADO: "success",
  CANCELADO: "error",
};

interface StatusChipProps {
  status: TServiceState;
}

export function StatusChip({ status }: StatusChipProps) {
  return (
    <Chip
      label={status.replace("_", " ")}
      color={STATUS_COLOR_MAP[status]}
      size="small"
    />
  );
}
