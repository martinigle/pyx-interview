import { Button } from "@mui/material";
import { useIncidentModalStore } from "../store/incidentFormStore";

export default function IncidentButton() {
  const modal = useIncidentModalStore();

  const handleNewIncident = () => {
    modal.openCreateIncident();
  };

  return (
    <Button
      variant="contained"
      onClick={() => {
        handleNewIncident();
      }}
    >
      Nuevo incidente
    </Button>
  );
}
