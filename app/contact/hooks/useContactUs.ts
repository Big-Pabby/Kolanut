"use client";

import { useMutation } from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { toast } from "@/lib/utils/toast";

// Payload for POST /v1/support/contact-us
export interface ContactUsPayload {
  fullname: string;
  email: string;
  phone_number: string;
  message: string;
}

export interface ContactUsResponse {
  message?: string;
}

export const useContactUs = () => {
  return useMutation({
    mutationFn: async (payload: ContactUsPayload) => {
      return admin.post<ContactUsResponse>("/support/contact-us", payload);
    },
    onSuccess: (data) => {
      toast.success("Message sent", {
        description:
          data?.message || "Thank you for reaching out. We'll get back to you shortly.",
      });
    },
    onError: (error: Error) => {
      toast.error("Message not sent", {
        description: error?.message || "Something went wrong. Please try again.",
      });
    },
  });
};
