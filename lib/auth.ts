import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants";
import { hasAdminAccess } from "@/lib/auth/roles";
import { useUserStore, type UserData } from "@/lib/store/user-store";

/** Where a signed-in user's dashboard lives. */
export const dashboardPathFor = (user?: UserData | null) =>
  hasAdminAccess(user) ? "/admin/resources" : "/customer/dashboard";

/** Name to show in menus, falling back to the email when no name is set. */
export const displayNameFor = (user?: UserData | null) =>
  user?.fullname || user?.email || "";

/** "Mauteen Adeleke" -> "MA", falls back to the first letter of the email. */
export const initialsFor = (user?: UserData | null) => {
  const name = displayNameFor(user);
  if (!name) return "";

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

/** Clears the session everywhere: tokens in localStorage and the user store. */
export const clearSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }
  useUserStore.getState().clearUser();
};
