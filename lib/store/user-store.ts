import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminRole } from "@/lib/auth/roles";

/** Mirrors the API's UserModel (returned nested inside the /auth/token Token). */
export interface UserData {
  id: string;
  email: string;
  is_admin: boolean;
  is_operator?: boolean;
  is_regulator?: boolean;
  /** Admin access role. Optional until the API returns it. */
  role?: AdminRole | null;
  fullname: string | null;
  phone_number?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  street_address?: string | null;
  street_address_2?: string | null;
  identification_number?: string | null;
  identification_verified?: boolean;
  identification_verified_at?: string | null;
  date_created: string;
  date_updated: string;
}

interface UserStore {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // localStorage key
    },
  ),
);
