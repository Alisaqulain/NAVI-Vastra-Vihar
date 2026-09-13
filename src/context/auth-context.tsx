"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authProvider, saveSession, getSession, clearSession, AuthSession } from "@/lib/auth";

interface AuthContextValue {
  session: AuthSession | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getSession();
    if (stored) {
      authProvider.validateToken(stored.token).then((valid) => {
        if (valid) setSession(valid);
        else clearSession();
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authProvider.login(email, password, "customer");
    if (result) {
      saveSession(result);
      setSession(result);
      return true;
    }
    return false;
  }, []);

  const register = useCallback(
    async (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => {
      const result = await authProvider.register(data);
      if (result) {
        saveSession(result);
        setSession(result);
        return true;
      }
      return false;
    },
    []
  );

  const logout = useCallback(async () => {
    await authProvider.logout();
    clearSession();
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
