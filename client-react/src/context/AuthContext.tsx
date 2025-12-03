import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
import type { AuthContextType, User } from '../types/authTypes';
import { TokenManager } from '../utils/TokenManager';
import { authService } from '../services/auth.service';


export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      if (TokenManager.hasToken()) {
        const result = await authService.getCurrentUser();
        if (result.success && result.user) {
          setUser(result.user as User);
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login: AuthContextType['login'] = async (credentials) => {
    setLoading(true);
    const result = await authService.login(credentials);
    if (result.success && result.user) {
      // Fetch full user data after login
      const userResult = await authService.getCurrentUser();
      if (userResult.success && userResult.user) {
        setUser(userResult.user as User);
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
    return result;
  };

  const register: AuthContextType['register'] = async (userData) => {
    setLoading(true);
    const result = await authService.register(userData);
    if (result.success && result.user) {
      // Fetch full user data after registration
      const userResult = await authService.getCurrentUser();
      if (userResult.success && userResult.user) {
        setUser(userResult.user as User);
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
    return result;
  };

  const logout: AuthContextType['logout'] = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};