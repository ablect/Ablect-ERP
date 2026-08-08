import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const SESSION_KEY = "ablect-erp-session";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readSession);

  async function login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      throw new Error("Enter your email and password.");
    }

    // Temporary local authentication for the desktop prototype.
    // Replace this with the real user/authentication service when the backend is connected.
    if (normalizedEmail !== "admin@ablect.local" || password !== "admin1234") {
      throw new Error("Invalid login details.");
    }

    const nextUser: AuthUser = {
      id: "local-admin",
      name: "ABLECT Administrator",
      email: normalizedEmail,
      role: "Administrator",
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
