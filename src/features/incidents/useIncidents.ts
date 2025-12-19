import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";
import type { IIncident } from "../../models/backend";

export function useIncidents() {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: async () => {
      const res = await api.get<IIncident[]>("/api/incidentes");
      return res.data;
    },
    staleTime: 60_000,
  });
}
