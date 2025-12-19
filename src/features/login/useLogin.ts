import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "./loginApi";
import { useAuthStore } from "../../store/authStore";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
};
