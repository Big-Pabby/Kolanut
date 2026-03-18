"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { FaqItem } from "@/components/admin/faqs/FaqAccordionItem";
import { toast } from "@/lib/utils/toast";

// API Response type from /v1/faqs/
export interface ApiFaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// Generate unique ID for FAQ items (since API doesn't provide one)
function generateFaqId(
  category: string,
  question: string,
  index: number,
): number {
  const str = `${category}-${question}-${index}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Transform API response to FaqItem format
const transformFaqItem = (item: ApiFaqItem, index: number): FaqItem => ({
  id: item.id,
  category: item.category,
  question: item.question,
  answer: item.answer,
});

// Fetch all FAQs
export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const data = await admin.get<ApiFaqItem[]>("/faqs/");
      return data.map((item, index) => transformFaqItem(item, index));
    },
    staleTime: 30000,
  });
};

// Create FAQ payload
export interface CreateFaqPayload {
  category: string;
  question: string;
  answer: string;
}

// Create FAQ
export const useCreateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateFaqPayload) => {
      const response = await admin.post<ApiFaqItem>("/faqs/", payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("FAQ created successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to create FAQ", {
        description: error.message,
      });
    },
  });
};

// Update FAQ payload (uses question as identifier since API has no ID)
export interface UpdateFaqPayload {
  category: string;
  question: string;
  answer: string;
}

// Update FAQ mutation parameters
interface UpdateFaqParams {
  id: string;
  payload: UpdateFaqPayload;
}

// Update FAQ
export const useUpdateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: UpdateFaqParams) => {
      const response = await admin.patch<ApiFaqItem>(`/faqs/${id}`, payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("FAQ updated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to update FAQ", {
        description: error.message,
      });
    },
  });
};

// Delete FAQ (uses question as identifier since API has no ID)
export const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await admin.delete<{
        success: boolean;
        message: string;
      }>(`/faqs/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("FAQ deleted successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete FAQ", {
        description: error.message,
      });
    },
  });
};
