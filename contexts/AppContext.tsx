"use client";
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Organisation, UserRole } from '@/types/organisation';
import { MOCK_ORGANISATIONS } from '@/types/organisation';

interface AppContextValue {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentOrg: Organisation | null;
  setCurrentOrg: (org: Organisation | null) => void;
  organisations: Organisation[];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [currentOrg, setCurrentOrg] = useState<Organisation | null>(null);

  return (
    <AppContext.Provider value={{
      currentRole,
      setCurrentRole,
      currentOrg,
      setCurrentOrg,
      organisations: MOCK_ORGANISATIONS,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
