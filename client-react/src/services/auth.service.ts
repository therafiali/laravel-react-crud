import { authApi } from '../api/authApi';
import { TokenManager } from '../utils/TokenManager';
import { handleApiError } from '../utils/apiErrorHandler';
import type { LoginCredentials, RegisterData, AuthResult, User } from '../types/authTypes';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      const data = await authApi.login(credentials);
      TokenManager.setToken(data.token);
      return { success: true, user: { name: data.name, email: data.email } };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  register: async (userData: RegisterData): Promise<AuthResult> => {
    try {
      const data = await authApi.register(userData);
      TokenManager.setToken(data.token);
      return { success: true, user: { name: data.name, email: data.email } };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  getCurrentUser: async (): Promise<AuthResult & { user?: User }> => {
    try {
      const user = await authApi.me();
      return { success: true, user };
    } catch (error) {
      TokenManager.removeToken();
      return { success: false, error: handleApiError(error) };
    }
  },

  logout: async (): Promise<void> => {
    await authApi.logout();
    TokenManager.removeToken();
  }
};
