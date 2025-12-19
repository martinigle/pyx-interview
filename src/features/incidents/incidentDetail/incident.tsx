import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import { useParams } from "react-router";
import { useIncident } from "./useIncidentDetail";
import Loading from "../../../shared/loading";
import IncidentButton from "../../../shared/newIncidentButton";

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: incident, isLoading, error } = useIncident(id);

  if (isLoading) return <Loading message="Loading incident!" />;
  if (error) return <p>No incident that matches!</p>;

  return (
    <Box
      sx={{
        height: "100%",
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" fontWeight={600}>
          {incident!.titulo}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }} elevation={1}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Información de Incidente
          </Typography>
          <IncidentButton />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>
            <strong>Servicio:</strong> {incident!.servicio}
          </Typography>
          <Typography>
            <strong>Canal:</strong> {incident!.canal.replace("_", " ")}
          </Typography>
          <Typography>
            <strong>Estado:</strong> {incident!.estadoActual.replace("_", " ")}
          </Typography>
          <Typography>
            <strong>Descripción:</strong> {incident!.descripcion}
          </Typography>
          <Typography>
            <strong>Fecha de creación:</strong> {incident!.fechaCreacion}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }} elevation={1}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Workflow status
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button variant="contained">Cambiar estado</Button>
        </Box>

        <Box
          sx={{
            minHeight: 240,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="text.secondary">
            Workflow graph goes here (draw2d)
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
