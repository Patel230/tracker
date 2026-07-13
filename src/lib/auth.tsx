import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, ApiError } from "./api";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    // A stalled /auth/me can't leave the app stuck on "Loading…" forever: the
    // request times out and resolves to unauthenticated.
    const timeout = setTimeout(() => controller.abort(), 5000);
    api
      .get<User>("/auth/me", controller.signal)
      .then(setUser)
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (!(err instanceof ApiError && err.status === 401)) console.error(err);
      })
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const login = async (email: string, password: string) => {
    setUser(await api.post<User>("/auth/login", { email, password }));
  };
  const register = async (email: string, password: string) => {
    setUser(await api.post<User>("/auth/register", { email, password }));
  };
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };
  const deleteAccount = async () => {
    await api.delete("/auth/account");
    setUser(null);
  };
  const changePassword = async (currentPassword: string, newPassword: string) => {
    await api.post("/auth/change-password", { currentPassword, newPassword });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, deleteAccount, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside AuthProvider");
  return ctx;
}
