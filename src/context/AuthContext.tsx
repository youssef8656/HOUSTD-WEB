import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, Role } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, role: Role) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string, role: Role) => { success: boolean; error?: string };
  logout: () => void;
  allUsers: User[];
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SEED_USERS: User[] = [
  { id: 'admin-1', name: 'Admin User', email: 'admin@houstd.com', role: 'admin', password: 'admin123' },
  { id: 'owner-1', name: 'Ahmed Al-Rashid', email: 'ahmed@houstd.com', role: 'owner', password: 'owner123' },
  { id: 'owner-2', name: 'Sara Mansour', email: 'sara@houstd.com', role: 'owner', password: 'owner123' },
  { id: 'student-1', name: 'Youssef Khalil', email: 'youssef@houstd.com', role: 'student', password: 'student123' },
  { id: 'student-2', name: 'Nour Hassan', email: 'nour@houstd.com', role: 'student', password: 'student123' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('houstd_users');
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      setUsers(SEED_USERS);
      localStorage.setItem('houstd_users', JSON.stringify(SEED_USERS));
    }
    const sessionUser = localStorage.getItem('houstd_current_user');
    if (sessionUser) {
      setCurrentUser(JSON.parse(sessionUser));
    }
  }, []);

  const saveUsers = useCallback((updated: User[]) => {
    setUsers(updated);
    localStorage.setItem('houstd_users', JSON.stringify(updated));
  }, []);

  const login = useCallback((email: string, password: string, role: Role) => {
    const stored = localStorage.getItem('houstd_users');
    const allU: User[] = stored ? JSON.parse(stored) : users;
    const user = allU.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password' };
    if (user.role !== role) return { success: false, error: `This account is registered as "${user.role}", not "${role}"` };
    setCurrentUser(user);
    localStorage.setItem('houstd_current_user', JSON.stringify(user));
    return { success: true };
  }, [users]);

  const register = useCallback((name: string, email: string, password: string, role: Role) => {
    const stored = localStorage.getItem('houstd_users');
    const allU: User[] = stored ? JSON.parse(stored) : users;
    if (allU.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser: User = { id: `${role}-${Date.now()}`, name, email, role, password };
    const updated = [...allU, newUser];
    saveUsers(updated);
    setCurrentUser(newUser);
    localStorage.setItem('houstd_current_user', JSON.stringify(newUser));
    return { success: true };
  }, [users, saveUsers]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('houstd_current_user');
  }, []);

  const deleteUser = useCallback((id: string) => {
    const stored = localStorage.getItem('houstd_users');
    const allU: User[] = stored ? JSON.parse(stored) : users;
    const updated = allU.filter(u => u.id !== id);
    saveUsers(updated);
  }, [users, saveUsers]);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, allUsers: users, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
