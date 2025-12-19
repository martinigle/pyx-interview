import { create } from "zustand";
import type { IUser } from "../models/backend";

export type AuthStore = {
  user: IUser | null;
  token: string | null;
  setAuth: (user: IUser, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  setAuth: (user, token) =>
    set({
      user,
      token,
    }),

  logout: () => set({ user: null }),
}));
