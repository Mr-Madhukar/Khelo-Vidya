import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, RegisterData } from '../types/index.ts';
import { apiRequest } from '../services/api.ts';
import { saveOfflineSession, getOfflineSession, clearOfflineSession } from '../db/dexie.ts';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email_or_username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from offline Dexie storage first, then revalidate if online
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await getOfflineSession();
        if (session.token && session.user) {
          setToken(session.token);
          setUser(session.user);

          // Attempt background verify if online
          if (navigator.onLine) {
            try {
              const res = await apiRequest<{ success: boolean; user: User }>('/auth/me');
              if (res.success && res.user) {
                setUser(res.user);
                await saveOfflineSession(session.token, res.user);
              }
            } catch {
              console.warn('[Auth] Remote verify skipped, using offline session');
            }
          }
        }
      } catch (err) {
        console.error('[Auth Init Error]', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email_or_username: string, password: string) => {
    const res = await apiRequest<{ success: boolean; token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email_or_username, password }),
    });

    if (res.success && res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      await saveOfflineSession(res.token, res.user);
    }
  };

  const register = async (data: RegisterData) => {
    const res = await apiRequest<{ success: boolean; token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      await saveOfflineSession(res.token, res.user);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await clearOfflineSession();
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
