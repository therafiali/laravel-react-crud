import type {
  LoginCredentials,
  LoginResponse,
  RegisterData,
  User,
} from "../types/authTypes";
import { api } from "./axios";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/login", credentials);
    return response.data;
  },

  register: async (userData: RegisterData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/register", userData);
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await api.get<User[]>("/me");
    return response.data[0]; // Your API returns array
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    }
  },
};
