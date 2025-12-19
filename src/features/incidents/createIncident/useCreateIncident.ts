import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IIncidentForm } from "../../../models/backend";
import { api } from "../../../api/api";

export function useCreateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IIncidentForm) => {
      const response = await api.post("/api/incidentes", {
        titulo: payload.titulo,
        descripcion: payload.descripcion,
        servicio: payload.servicio,
        canal: payload.canal,
        instalador: payload.instalador,
        cliente: payload.cliente,
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
