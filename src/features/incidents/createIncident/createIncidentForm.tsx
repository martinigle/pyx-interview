import {
  Box,
  Button,
  DialogActions,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { IIncidentForm } from "../../../models/backend";

const CHANNEL_OPTIONS = ["EMAIL", "TELEFONO", "WEB", "WHATSAPP"];

export default function CreateIncidentForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  onSubmit: (data: IIncidentForm) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    service: "",
    channel: "",
    installer: "",
    client: "",
  });

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
    onSubmit(form);
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
        value={form.title}
        onChange={handleChange("title")}
      />

      <TextField
        label="Descripción"
        fullWidth
        multiline
        minRows={5}
        sx={{ mb: 4 }}
        value={form.description}
        onChange={handleChange("description")}
      />

      <Grid spacing={3}>
        <TextField
          label="Servicio"
          fullWidth
          value={form.service}
          onChange={handleChange("service")}
        />

        <TextField
          select
          label="Canal"
          fullWidth
          value={form.channel}
          onChange={handleChange("channel")}
        >
          {CHANNEL_OPTIONS.map((channel) => (
            <MenuItem key={channel} value={channel}>
              {channel}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Instalador"
          fullWidth
          value={form.installer}
          onChange={handleChange("installer")}
        />

        <TextField
          label="Cliente"
          fullWidth
          value={form.client}
          onChange={handleChange("client")}
        />
      </Grid>

      <DialogActions sx={{ mt: 4 }}>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
      </DialogActions>
    </Box>
  );
}
