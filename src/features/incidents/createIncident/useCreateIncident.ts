import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IIncidentForm } from "../../../models/backend";
import { api } from "../../../api/api";

export function useCreateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IIncidentForm) => {
      const response = await api.post("/incidents", {
        titulo: payload.title,
        descripcion: payload.description,
        servicio: payload.service,
        canal: payload.channel,
        instalador: payload.installer,
        cliente: payload.client,
      });

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["incidents"],
      });
    },
  });
}
