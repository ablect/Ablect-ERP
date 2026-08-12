import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { desktopApi } from "../lib/desktopApi";

const TOKEN_KEY = "ablect-erp-session-token";
export type AuthUser = { id: string; name: string; email: string; role: string; roleId: string | null; permissions: { module: string; view: boolean; create: boolean; edit: boolean; delete: boolean }[] };
type AuthContextValue = { user: AuthUser | null; isAuthenticated: boolean; ready: boolean; login: (identifier: string, password: string) => Promise<void>; logout: () => Promise<void>; can: (module: string, action?: "view" | "create" | "edit" | "delete") => boolean };
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const api = desktopApi();
    const token = localStorage.getItem(TOKEN_KEY);
    if (!api || !token) { setReady(true); return; }
    void api.auth.validate(token).then((sessionUser) => {
      setUser(sessionUser);
      if (!sessionUser) localStorage.removeItem(TOKEN_KEY);
    }).catch(() => localStorage.removeItem(TOKEN_KEY)).finally(() => setReady(true));
  }, []);

  async function login(identifier: string, password: string) {
    const api = desktopApi();
    if (!api) throw new Error("Start Ablect Business Suite through the desktop application.");
    if (!identifier.trim() || !password) throw new Error("Enter your username/email and password.");
    const session = await api.auth.login(identifier.trim(), password);
    localStorage.setItem(TOKEN_KEY, session.token);
    setUser(session.user);
  }

  async function logout() {
    const api = desktopApi();
    const token = localStorage.getItem(TOKEN_KEY);
    if (api && token) await api.auth.logout(token).catch(() => undefined);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

  function can(module: string, action: "view" | "create" | "edit" | "delete" = "view") {
    if (!user) return false;
    if (user.role.toLowerCase() === "administrator") return true;
    const permission = user.permissions.find((item) => item.module === module);
    return Boolean(permission?.[action]);
  }

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), ready, login, logout, can }), [user, ready]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
