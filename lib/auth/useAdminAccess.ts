"use client";

import { useUserStore } from "@/lib/store/user-store";
import {
  ROLE_PERMISSIONS,
  canAccessSection,
  firstAllowedPath,
  resolveAdminRole,
  sectionFromPath,
  type AdminSection,
} from "./roles";

/** Access helpers for the signed-in admin, derived from their role. */
export function useAdminAccess() {
  const user = useUserStore((state) => state.user);
  const role = resolveAdminRole(user);
  const permissions = role ? ROLE_PERMISSIONS[role] : null;

  return {
    role,
    readOnly: permissions?.readOnly ?? true,
    canDownload: permissions?.canDownload ?? false,
    sections: permissions?.sections ?? [],
    canAccessSection: (section: AdminSection) =>
      role ? canAccessSection(role, section) : false,
    /** Non-sectioned paths (unknown routes) are allowed by default. */
    canAccessPath: (pathname: string) => {
      const section = sectionFromPath(pathname);
      if (!role) return false;
      return section ? canAccessSection(role, section) : true;
    },
    firstPath: role ? firstAllowedPath(role) : "/customer/dashboard",
  };
}
