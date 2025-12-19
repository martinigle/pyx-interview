import { create } from "zustand";
import type { TServiceState } from "../models/backend";

export type TStatusFilter = TServiceState | "ALL";

interface FilterStore {
  status: TStatusFilter;
  search: string;
  setSearch: (v: string) => void;
  setStatus: (status: TServiceState | "ALL") => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: "",
  status: "ALL",
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
}));
