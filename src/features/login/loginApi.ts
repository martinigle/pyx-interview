import { api } from "../../api/api";
import type { IUser } from "../../models/backend";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  user: IUser;
  token: string;
};

export const loginRequest = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("api/auth/login", data);
  return response.data;
};
