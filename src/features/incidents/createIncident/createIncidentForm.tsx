import {
  Box,
  Button,
  DialogActions,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  EChannel,
  EService,
  type IIncidentForm,
} from "../../../models/backend";
import { useAuthStore } from "../../../store/authStore";

interface IncidentFormDTO extends IIncidentForm {
  creadoPor: string;
}

export default function CreateIncidentForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  onSubmit: (data: IncidentFormDTO) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    servicio: "",
    canal: "",
    instalador: "",
    cliente: "",
  });

  const createdBy = useAuthStore((s) => {
    return s.user?.email;
  });

  const isFormValid =
    form.titulo.trim() !== "" &&
    form.descripcion.trim() !== "" &&
    form.servicio !== "" &&
    form.canal !== "" &&
    form.instalador.trim() !== "" &&
    form.cliente.trim() !== "" &&
    createdBy !== "";

  const handleChange =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !createdBy) return;
    const dto = { ...form, creadoPor: createdBy! };
    onSubmit(dto);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Nuevo incidente
      </Typography>

      <TextField
        label="Título"
        fullWidth
        required
        sx={{ mb: 3 }}
        value={form.titulo}
        onChange={handleChange("titulo")}
      />

      <TextField
        label="Descripción"
        fullWidth
        multiline
        minRows={5}
        sx={{ mb: 4 }}
        value={form.descripcion}
        onChange={handleChange("descripcion")}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        }}
      >
        <TextField
          select
          label="Servicio"
          fullWidth
          value={form.servicio}
          required
          onChange={(e) => setForm({ ...form, servicio: e.target.value })}
        >
          {Object.keys(EService).map((service) => (
            <MenuItem key={service} value={service}>
              {service}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Canal"
          fullWidth
          value={form.canal}
          required
          onChange={(e) => setForm({ ...form, canal: e.target.value })}
        >
          {Object.keys(EChannel).map((channel) => (
            <MenuItem key={channel} value={channel}>
              {channel}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Instalador"
          fullWidth
          value={form.instalador}
          required
          onChange={(e) => setForm({ ...form, instalador: e.target.value })}
        />

        <TextField
          label="Cliente"
          fullWidth
          value={form.cliente}
          required
          onChange={(e) => setForm({ ...form, cliente: e.target.value })}
        />
      </Box>

      <DialogActions sx={{ mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={!isFormValid || isSubmitting}
        >
          Guardar
        </Button>
        <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
      </DialogActions>
    </Box>
  );
}
