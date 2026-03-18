"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { admin } from "@/lib/service";

// Public blog/resource response type
export interface PublicResource {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  tag: string;
  cover_image: string;
  status: "published" | "draft";
  date_created: string;
  date_updated: string;
  published_at?: string;
}

export interface PublicResourceListResponse {
  success: boolean;
  message: string;
  results: PublicResource[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Filter parameters for public resources
export interface PublicResourceFilters {
  tag?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

// Fetch public resources
export const usePublicResources = (filters: PublicResourceFilters = {}) => {
  const { tag, search, page = 1, page_size = 12 } = filters;

  return useQuery({
    queryKey: ["public-resources", filters],
    queryFn: async () => {
      const response = await admin.get<PublicResourceListResponse>(
        `/blogs`,
        {
          params: {
            status: "published",
            tag: tag || undefined,
            search: search || undefined,
            page,
            page_size,
            paginate: true,
          },
        },
      );
      return response;
    },
    staleTime: 30000,
  });
};

// Fetch single public resource by slug
export const usePublicResource = (slug: string) => {
  return useQuery({
    queryKey: ["public-resource", slug],
    queryFn: async () => {
      const response = await admin.get<PublicResource>(
        `/blogs/${slug}`,
      );
      return response;
    },
    enabled: !!slug,
  });
};
