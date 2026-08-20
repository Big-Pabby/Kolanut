"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AdminContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminShell() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminShell must be used within an AdminProvider");
  }
  return context;
}
