"use client";

import { useMutation } from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { toast } from "@/lib/utils/toast";

// Signup email verification — POST /v1/auth/activation, /v1/auth/resend_activation
export const VERIFY_OTP_ENDPOINT = "/auth/activation";
export const RESEND_OTP_ENDPOINT = "/auth/resend_activation";

/** The activation code is a fixed-length string (UserVerificationModel). */
export const ACTIVATION_CODE_LENGTH = 4;

// POST /v1/auth/signup — UserSignUpData
export interface SignupPayload {
  email: string;
  password: string;
  fullname: string;
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
export const FULLNAME_MIN_LENGTH = 3;
export const FULLNAME_MAX_LENGTH = 250;

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

// POST /v1/auth/activation — UserVerificationModel
export interface ActivationPayload {
  email: string;
  code: string;
}

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: async (payload: ActivationPayload) => {
      return admin.post<unknown>(VERIFY_OTP_ENDPOINT, payload);
    },
    onError: (error: Error) => {
      toast.error("Verification failed", {
        description: error?.message || "The code is invalid or has expired.",
      });
    },
  });
};

// POST /v1/auth/resend_activation
export interface ResendActivationPayload {
  email: string;
}

export const useResendEmailOtp = () => {
  return useMutation({
    mutationFn: async (payload: ResendActivationPayload) => {
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
