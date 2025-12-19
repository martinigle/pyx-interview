import { create } from "zustand";

interface ModalStore {
  isCreateIncidentOpen: boolean;
  openCreateIncident: () => void;
  closeCreateIncident: () => void;
}

export const useIncidentModalStore = create<ModalStore>((set) => ({
  isCreateIncidentOpen: false,
  openCreateIncident: () => set({ isCreateIncidentOpen: true }),
  closeCreateIncident: () => set({ isCreateIncidentOpen: false }),
}));
