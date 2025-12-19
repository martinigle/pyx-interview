import { Dialog, DialogContent } from "@mui/material";
import { useIncidentModalStore } from "../../../store/incidentFormStore";
import CreateIncidentForm from "./createIncidentForm";
import type { IIncidentForm } from "../../../models/backend";
import { useCreateIncident } from "./useCreateIncident";

export default function CreateIncidentModal() {
  const close = useIncidentModalStore((s) => s.closeCreateIncident);
  const { mutate, isPending } = useCreateIncident();

  const isOpen = useIncidentModalStore((state) => state.isCreateIncidentOpen);

  const handleCreate = (data: IIncidentForm) => {
    mutate(data, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={close} fullWidth maxWidth="md">
      <DialogContent>
        <CreateIncidentForm
          onSubmit={handleCreate}
          onCancel={close}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
