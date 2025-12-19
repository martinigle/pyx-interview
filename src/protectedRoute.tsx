import { Navigate } from "react-router";
import { useAuthStore } from "./store/authStore";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" />;
  return children;
};
