import axios, { AxiosError, AxiosInstance } from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants";
import { useUserStore } from "@/lib/store/user-store";
import { ApiResponse, ValidationErrorDetail } from "@/lib/types";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
const apiAdmin: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_ADMIN,
});

// Admin API Request interceptor
apiAdmin.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Admin API Response interceptor
apiAdmin.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const errorData = error.response?.data as
      | {
          detail?: string | ValidationErrorDetail[];
          message?: string;
          path?: string;
          timestamp?: string;
        }
      | undefined;

    let errorMessage: string;

    // Handle Pydantic validation errors (array of errors)
    if (Array.isArray(errorData?.detail)) {
      errorMessage = errorData.detail.map((err) => err.msg).join(", ");
    } else {
      errorMessage =
        errorData?.detail ||
        errorData?.message ||
        error.message ||
        "An unknown error occurred";
    }

    // Treat any auth/expiry failure the same way: clear the session and send
    // the user back to sign in instead of leaving them stuck (e.g. the JWT
    // "Signature has expired" error after a token times out).
    const status = error.response?.status;
    const normalized = errorMessage.toLowerCase();
    const isAuthError =
      status === 401 ||
      normalized.includes("not authenticated") ||
      normalized.includes("signature has expired") ||
      normalized.includes("token has expired") ||
      normalized.includes("could not validate credentials");

    if (isAuthError && typeof window !== "undefined") {
      const hadToken = !!localStorage.getItem(ACCESS_TOKEN);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      const { clearUser } = useUserStore.getState();
      clearUser();

      // Only redirect authenticated sessions; skip public/unauthenticated pages.
      if (hadToken && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(new Error(errorMessage));
  },
);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Preserve original request config if needed for retries
    const originalRequest = error.config;

    // Attempt to extract custom error structure
    const errorData = error.response?.data as
      | {
          detail?: string | ValidationErrorDetail[];
          path?: string;
          timestamp?: string;
        }
      | undefined;

    let errorMessage: string;

    // Handle Pydantic validation errors (array of errors)
    if (Array.isArray(errorData?.detail)) {
      errorMessage = errorData.detail.map((err) => err.msg).join(", ");
    } else {
      errorMessage =
        errorData?.detail || error.message || "An unknown error occurred";
    }

    console.log(errorData);
    if (errorMessage === "Not authenticated") {
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.href = "/";
    }

    // Return a rejected Promise with a meaningful error message
    return Promise.reject(new Error(errorMessage));
  },
);

// Type-safe API methods
export const apiClient = {
  get: <T>(url: string) => api.get<T>(url).then((response) => response.data),

  post: <T>(url: string, data?: unknown) =>
    api.post<T>(url, data).then((response) => response.data),

  patch: <T>(url: string, data?: unknown) =>
    api.patch<T>(url, data).then((response) => response.data),
  put: <T>(url: string, data?: unknown) =>
    api.put<T>(url, data).then((response) => response.data),

  delete: <T>(url: string) =>
    api.delete<T>(url).then((response) => response.data),
};
export const AdminApiClient = {
  get: <T>(url: string, config?: any) =>
    apiAdmin.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data?: unknown, config?: any) =>
    apiAdmin.post<T>(url, data, config).then((response) => response.data),

  patch: <T>(url: string, data?: unknown, config?: any) =>
    apiAdmin.patch<T>(url, data, config).then((response) => response.data),
  put: <T>(url: string, data?: unknown, config?: any) =>
    apiAdmin.put<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config?: any) =>
    apiAdmin.delete<T>(url, config).then((response) => response.data),
};

export { apiClient as api, AdminApiClient as admin };
