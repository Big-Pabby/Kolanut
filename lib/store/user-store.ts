import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  is_active: boolean;
  role: string;
  last_login_at: string;
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

