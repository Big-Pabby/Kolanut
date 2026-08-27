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
  const permissions = ROLE_PERMISSIONS[role];

  return {
    role,
    readOnly: permissions.readOnly,
    canDownload: permissions.canDownload,
    sections: permissions.sections,
    canAccessSection: (section: AdminSection) =>
      canAccessSection(role, section),
    /** Non-sectioned paths (unknown routes) are allowed by default. */
    canAccessPath: (pathname: string) => {
      const section = sectionFromPath(pathname);
      return section ? canAccessSection(role, section) : true;
    },
    firstPath: firstAllowedPath(role),
  };
}
