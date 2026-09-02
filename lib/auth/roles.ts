/**
 * Role-based access control for the admin dashboard.
 *
 * Roles:
 *  - super_admin         — technical/governance role. Full access to everything.
 *  - operational_officer — content role. Resources, FAQs and Settings only.
 *  - regulator           — read-only oversight of customers, policies,
 *                          transactions, claims and coupons. Cannot download.
 */

export type AdminRole = "super_admin" | "operational_officer" | "regulator";

export type AdminSection =
  | "dashboard"
  | "customers"
  | "policies"
  | "transactions"
  | "claims"
  | "coupon"
  | "resources"
  | "faqs"
  | "settings";

/** Canonical order — also the priority used to pick a role's landing section. */
export const ADMIN_SECTION_ORDER: AdminSection[] = [
  "dashboard",
  "customers",
  "policies",
  "transactions",
  "claims",
  "coupon",
  "resources",
  "faqs",
  "settings",
];

export const ADMIN_SECTION_PATH: Record<AdminSection, string> = {
  dashboard: "/admin/dashboard",
  customers: "/admin/customers",
  policies: "/admin/policies",
  transactions: "/admin/transactions",
  claims: "/admin/claims",
  coupon: "/admin/coupon",
  resources: "/admin/resources",
  faqs: "/admin/faqs",
  settings: "/admin/settings",
};

interface RolePermissions {
  sections: AdminSection[];
  /** View-only: no create / edit / delete / mutations. */
  readOnly: boolean;
  /** Whether the role may download documents, receipts and policies. */
  canDownload: boolean;
}

export const ROLE_PERMISSIONS: Record<AdminRole, RolePermissions> = {
  super_admin: {
    sections: [...ADMIN_SECTION_ORDER],
    readOnly: false,
    canDownload: true,
  },
  operational_officer: {
    sections: ["resources", "faqs", "settings"],
    readOnly: false,
    canDownload: true,
  },
  regulator: {
    sections: [
      "dashboard",
      "customers",
      "policies",
      "transactions",
      "claims",
      "coupon",
    ],
    readOnly: true,
    canDownload: false,
  },
};

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  operational_officer: "Operational Officer",
  regulator: "Regulator",
};

/** Reads the effective admin role off the signed-in user. */
export const hasAdminAccess = (
  user?: {
    role?: string | null;
    is_admin?: boolean | null;
    is_operator?: boolean | null;
    is_regulator?: boolean | null;
  } | null,
): boolean => {
  const role = user?.role;
  return Boolean(
    user?.is_admin ||
    user?.is_operator ||
    user?.is_regulator ||
    role === "super_admin" ||
    role === "operational_officer" ||
    role === "regulator",
  );
};

export const resolveAdminRole = (
  user?: {
    role?: string | null;
    is_admin?: boolean | null;
    is_operator?: boolean | null;
    is_regulator?: boolean | null;
  } | null,
): AdminRole | null => {
  const role = user?.role;
  if (
    role === "operational_officer" ||
    role === "regulator" ||
    role === "super_admin"
  ) {
    return role;
  }
  if (user?.is_admin) return "super_admin";
  if (user?.is_operator) return "operational_officer";
  if (user?.is_regulator) return "regulator";

  return null;
};

/** The admin section a URL belongs to, or null if it isn't a sectioned page. */
export const sectionFromPath = (pathname: string): AdminSection | null => {
  const match = ADMIN_SECTION_ORDER.find(
    (section) =>
      pathname === ADMIN_SECTION_PATH[section] ||
      pathname.startsWith(`${ADMIN_SECTION_PATH[section]}/`),
  );
  return match ?? null;
};

export const canAccessSection = (role: AdminRole, section: AdminSection) =>
  ROLE_PERMISSIONS[role].sections.includes(section);

export const firstAllowedSection = (role: AdminRole): AdminSection =>
  ROLE_PERMISSIONS[role].sections[0] ?? "dashboard";

export const firstAllowedPath = (role: AdminRole): string =>
  ADMIN_SECTION_PATH[firstAllowedSection(role)];
