import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import type { IIncident } from "../../../models/backend";

export const useIncident = (id?: string) => {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: async () => {
      const res = await api.get<IIncident>(`/api/incidentes/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
