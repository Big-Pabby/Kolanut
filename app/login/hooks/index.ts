import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants";
import { useUserStore, type UserData } from "@/lib/store/user-store";
import { toast } from "@/lib/utils/toast";

// POST /v1/auth/token — Token
interface LoginResponse {
  user: UserData;
  token_type: string;
  access_token: string;
  refresh_token: string;
  access_expires_at: string | null;
  refresh_expires_at: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export const useAdminLogin = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const formData = new FormData();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);

      const response = await admin.post<LoginResponse>("auth/token", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    onSuccess: (data) => {
      // Store tokens in localStorage
      if (data.access_token) {
        localStorage.setItem(ACCESS_TOKEN, data.access_token);
      }
      if (data.refresh_token) {
        localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
      }

      // Store user data in Zustand store
      if (data.user) {
        setUser(data.user);
      }

      toast.success("Login successful", {
        description: `Welcome back, ${data.user?.fullname || data.user?.email || "there"}!`,
      });
    },
    onError: (error: Error) => {
      toast.error("Login failed", {
        description:
          error?.message || "Please check your credentials and try again.",
      });
    },
  });
};

export const useAdminLogout = () => {
  const clearUser = useUserStore((state) => state.clearUser);

  return () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    clearUser();
    toast.success("Logged out successfully");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };
};
