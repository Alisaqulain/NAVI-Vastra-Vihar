import { User, UserRole } from "@/lib/models";
import { userRepository } from "@/lib/repositories";

export interface AuthSession {
  user: Omit<User, "password">;
  token: string;
  role: UserRole;
}

export interface AuthProvider {
  login(email: string, password: string, role?: UserRole): Promise<AuthSession | null>;
  register(data: { email: string; password: string; firstName: string; lastName: string; phone: string }): Promise<AuthSession | null>;
  validateToken(token: string): Promise<AuthSession | null>;
  logout(): Promise<void>;
}

const AUTH_STORAGE_KEY = "navi_auth_session";
const ADMIN_STORAGE_KEY = "navi_admin_session";

function createSession(user: User): AuthSession {
  const { password: _, ...safeUser } = user;
  return {
    user: safeUser,
    token: btoa(`${user.id}:${Date.now()}:${user.role}`),
    role: user.role,
  };
}

class MockAuthProvider implements AuthProvider {
  async login(email: string, password: string, role?: UserRole): Promise<AuthSession | null> {
    const user = await userRepository.findByEmail(email);
    if (!user || user.password !== password) return null;
    if (role && user.role !== role) return null;
    if (user.status !== "active") return null;
    return createSession(user);
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<AuthSession | null> {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) return null;
    const user = await userRepository.create({
      ...data,
      role: "customer",
      status: "active",
    });
    return createSession(user);
  }

  async validateToken(token: string): Promise<AuthSession | null> {
    try {
      const decoded = atob(token);
      const [userId] = decoded.split(":");
      const user = await userRepository.findById(userId);
      if (!user || user.status !== "active") return null;
      return createSession(user);
    } catch {
      return null;
    }
  }

  async logout(): Promise<void> {
    // Client-side cleanup handled by caller
  }
}

export const authProvider: AuthProvider = new MockAuthProvider();

export function saveSession(session: AuthSession, isAdmin = false): void {
  if (typeof window === "undefined") return;
  const key = isAdmin ? ADMIN_STORAGE_KEY : AUTH_STORAGE_KEY;
  localStorage.setItem(key, JSON.stringify(session));
}

export function getSession(isAdmin = false): AuthSession | null {
  if (typeof window === "undefined") return null;
  const key = isAdmin ? ADMIN_STORAGE_KEY : AUTH_STORAGE_KEY;
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession(isAdmin = false): void {
  if (typeof window === "undefined") return;
  const key = isAdmin ? ADMIN_STORAGE_KEY : AUTH_STORAGE_KEY;
  localStorage.removeItem(key);
}

export const ADMIN_CREDENTIALS = {
  email: "Admin@1234",
  password: "Admin@1234",
};
