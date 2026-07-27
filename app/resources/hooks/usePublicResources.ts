"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { BLOG_PAGE_SIZE } from "@/lib/constants";

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
  results: PublicResource[];
  count: number;
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
  const { tag, search, page = 1, page_size = BLOG_PAGE_SIZE } = filters;

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
    placeholderData: keepPreviousData,
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
