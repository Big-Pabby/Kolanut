import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminRole } from "@/lib/auth/roles";

/** Mirrors the API's UserModel (returned nested inside the /auth/token Token). */
export interface UserData {
  id: string;
  email: string;
  is_admin: boolean;
  /** Admin access role. Optional until the API returns it. */
  role?: AdminRole | null;
  fullname: string | null;
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
    }
  )
);
