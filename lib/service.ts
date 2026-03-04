import axios, { AxiosError, AxiosInstance } from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants";
import { useUserStore } from "@/lib/store/user-store";
import { ApiResponse } from "@/lib/types";

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
      | { detail?: string; message?: string; path?: string; timestamp?: string }
      | undefined;

    const errorMessage =
      errorData?.detail ||
      errorData?.message ||
      error.message ||
      "An unknown error occurred";

    if (
      errorMessage === "Not authenticated" ||
      error.response?.status === 401
    ) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      // Clear user store
      if (typeof window !== "undefined") {
        const { clearUser } = useUserStore.getState();
        clearUser();
        if (window.location.pathname !== "/admin") {
          window.location.href = "/admin";
        }
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
      | { detail?: string; path?: string; timestamp?: string }
      | undefined;

    const errorMessage =
      errorData?.detail || error.message || "An unknown error occurred";
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
  get: <T>(url: string) =>
    api.get<ApiResponse<T>>(url).then((response) => response.data),

  post: <T>(url: string, data?: unknown) =>
    api.post<ApiResponse<T>>(url, data).then((response) => response.data),

  patch: <T>(url: string, data?: unknown) =>
    api.patch<ApiResponse<T>>(url, data).then((response) => response.data),
  put: <T>(url: string, data?: unknown) =>
    api.put<ApiResponse<T>>(url, data).then((response) => response.data),

  delete: <T>(url: string) =>
    api.delete<ApiResponse<T>>(url).then((response) => response.data),
};
export const AdminApiClient = {
  get: <T>(url: string, config?: any) =>
    apiAdmin.get<ApiResponse<T>>(url, config).then((response) => response.data),

  post: <T>(url: string, data?: unknown, config?: any) =>
    apiAdmin
      .post<ApiResponse<T>>(url, data, config)
      .then((response) => response.data),

  patch: <T>(url: string, data?: unknown, config?: any) =>
    apiAdmin
      .patch<ApiResponse<T>>(url, data, config)
      .then((response) => response.data),
  put: <T>(url: string, data?: unknown, config?: any) =>
    apiAdmin
      .put<ApiResponse<T>>(url, data, config)
      .then((response) => response.data),

  delete: <T>(url: string, config?: any) =>
    apiAdmin
      .delete<ApiResponse<T>>(url, config)
      .then((response) => response.data),
};

export { apiClient as api, AdminApiClient as admin };
