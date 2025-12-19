import { useMemo } from "react";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useIncidents } from "./useIncidents";
import { useFilterStore, type TStatusFilter } from "../../store/filterStore";
import { EServiceStates } from "../../models/backend";
import { useNavigate } from "react-router";
import Loading from "../../shared/loading";
import IncidentButton from "../../shared/newIncidentButton";
import { StatusChip } from "../../shared/statusChip";

export default function IncidentList() {
  const { data: incidents, isLoading, error } = useIncidents();

  const titleFilter = useFilterStore((state) => state.search);
  const statusFilter = useFilterStore((state) => state.status);
  const setTitleFilter = useFilterStore((state) => state.setSearch);
  const setStatusFilter = useFilterStore((state) => state.setStatus);
  const navigate = useNavigate();

  const visibleIncidents = useMemo(() => {
    if (!incidents) return [];

    return incidents.filter((incident) => {
      const matchesTitle = incident.titulo
        .toLowerCase()
        .includes(titleFilter.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || incident.estadoActual === statusFilter;

      return matchesTitle && matchesStatus;
    });
  }, [incidents, titleFilter, statusFilter]);

  const handleRowClick = (incidentId: string) => {
    navigate(`/incidents/${incidentId}`);
  };
  if (isLoading) return <Loading />;
  if (error || !incidents)
    return <Typography>Error loading incidents</Typography>;

  return (
    <Box sx={{ p: 4, minHeight: "fit-content", minWidth: "95%" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <TextField
          label="Buscar"
          size="small"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          sx={{ minWidth: 260 }}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Estado</InputLabel>
          <Select
            labelId="status-filter-label"
            label="Estado"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TStatusFilter)}
          >
            <MenuItem value="ALL">TODOS</MenuItem>
            {Object.values(EServiceStates).map((status) => (
              <MenuItem key={status} value={status}>
                {status.replace("_", " ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />

        <IncidentButton />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Título</strong>
              </TableCell>
              <TableCell>
                <strong>Servicio</strong>
              </TableCell>
              <TableCell>
                <strong>Canal</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha de creación</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleIncidents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography>No incidents found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleIncidents.map((incident) => (
                <TableRow
                  key={incident.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      background: "#97b9f4ff",
                    },
                  }}
                  onClick={() => handleRowClick(incident.id)}
                >
                  <TableCell>{incident.titulo}</TableCell>
                  <TableCell>{incident.servicio}</TableCell>
                  <TableCell>{incident.canal}</TableCell>
                  <TableCell>
                    <StatusChip status={incident.estadoActual} />
                  </TableCell>
                  <TableCell>{incident.fechaCreacion}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
