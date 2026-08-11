"use client";

import { useMutation } from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { toast } from "@/lib/utils/toast";

/**
 * Signup email verification. The API does not publish these routes yet — the
 * only OTP endpoints it documents are for the password-reset flow
 * (initiate_password_reset / verify_password_reset). The paths below follow the
 * same snake_case convention; update them to whatever the backend ships and the
 * dialog works unchanged.
 */
export const VERIFY_OTP_ENDPOINT = "/auth/verify_email";
export const RESEND_OTP_ENDPOINT = "/auth/resend_email_otp";

// POST /v1/auth/signup — UserSignUpData
export interface SignupPayload {
  email: string;
  password: string;
}

// UserModel
export interface SignupResponse {
  id: string;
  email: string;
  is_admin: boolean;
  date_created: string;
  date_updated: string;
}

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 50;

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      return admin.post<SignupResponse>("/auth/signup", payload);
    },
    onError: (error: Error) => {
      toast.error("Sign up failed", {
        description: error?.message || "Please try again.",
      });
    },
  });
};

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; code: string }) => {
      return admin.post<unknown>(VERIFY_OTP_ENDPOINT, payload);
    },
    onError: (error: Error) => {
      toast.error("Verification failed", {
        description: error?.message || "The code is invalid or has expired.",
      });
    },
  });
};

export const useResendEmailOtp = () => {
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      return admin.post<unknown>(RESEND_OTP_ENDPOINT, payload);
    },
    onSuccess: () => {
      toast.success("Code sent", {
        description: "We've sent a new verification code to your email.",
      });
    },
    onError: (error: Error) => {
      toast.error("Could not resend code", {
        description: error?.message || "Please try again in a moment.",
      });
    },
  });
};
