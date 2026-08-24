"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { toast } from "@/lib/utils/toast";
import { useUserStore, type UserData } from "@/lib/store/user-store";

export const ME_QUERY_KEY = ["auth", "me"];
export const IDENTITY_CARD_QUERY_KEY = ["auth", "me", "identity-card"];

// GET /v1/auth/me
export interface MeResponse extends UserData {
  phone_number: string | null;
  date_of_birth: string | null;
  state: string | null;
  city: string | null;
  home_address: string | null;
}

// PATCH /v1/auth/me — UpdateUserModel. Every field is optional, so the same
// mutation covers the personal-details form and the change-password form.
export interface UpdateMePayload {
  fullname?: string;
  phone_number?: string;
  date_of_birth?: string;
  state?: string;
  city?: string;
  home_address?: string;
  old_password?: string;
  new_password?: string;
}

// GET / PUT /v1/auth/me/identity_card — IdentityCardModel
export interface IdentityCard {
  image: string;
  id_type: string;
  identification_number: string;
  /** yyyy-mm-dd */
  date_issued: string;
  /** yyyy-mm-dd */
  expiry_date: string;
}

export const FULLNAME_MIN_LENGTH = 3;
export const FULLNAME_MAX_LENGTH = 250;
export const PHONE_MIN_LENGTH = 11;
export const PASSWORD_MIN_LENGTH = 8;

export const useMe = () =>
  useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: () => admin.get<MeResponse>("/auth/me"),
    staleTime: 30000,
  });

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: UpdateMePayload) =>
      admin.patch<MeResponse>("/auth/me", payload),
    onSuccess: (data) => {
      queryClient.setQueryData(ME_QUERY_KEY, data);
      // keep the sidebar/header in step with the new name
      if (data) setUser(data);
    },
    onError: (error: Error) => {
      toast.error("Update failed", {
        description: error?.message || "Please try again.",
      });
    },
  });
};

export const useIdentityCard = () =>
  useQuery({
    queryKey: IDENTITY_CARD_QUERY_KEY,
    queryFn: () => admin.get<IdentityCard>("/auth/me/identity_card"),
    retry: false,
    staleTime: 30000,
  });

export const useUpdateIdentityCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IdentityCard) =>
      admin.put<IdentityCard>("/auth/me/identity_card", payload),
    onSuccess: (data) => {
      queryClient.setQueryData(IDENTITY_CARD_QUERY_KEY, data);
      toast.success("Identification card saved");
    },
    onError: (error: Error) => {
      toast.error("Could not save your ID card", {
        description: error?.message || "Please try again.",
      });
    },
  });
};

interface UploadResponse {
  url: string;
}

/** POST /v1/misc/upload — returns the hosted URL stored on the ID card. */
export const useUploadIdentityCardImage = () =>
  useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("upload_target", "IDENTIFICATION_CARD");
      formData.append("file", file);

      return admin.post<UploadResponse>("/misc/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onError: (error: Error) => {
      toast.error("Upload failed", {
        description: error?.message || "Please try again.",
      });
    },
  });
