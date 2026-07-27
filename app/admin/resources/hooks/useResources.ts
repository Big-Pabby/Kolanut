"use client";

import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { BLOG_PAGE_SIZE } from "@/lib/constants";
import { ResourceItem } from "@/components/admin/resources/ResourceCard";
import { toast } from "@/lib/utils/toast";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tag: string;
  cover_image: string;
  media?: string;
  video_link?: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface BlogListResponse {
  results: BlogPost[];
  count: number;
  total_pages: number;
}

export interface BlogCounts {
  published: number;
  draft: number;
  total: number;
}

// Blog filter parameters
export interface BlogFilters {
  status?: "published" | "draft";
  tag?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export interface CreateBlogPayload {
  tag: string;
  title: string;
  content: string;
  cover_image: string;
  media?: string;
  video_link?: string;
  status?: "published" | "draft";
}

export interface UploadResponse {
  url: string;
}

const transformBlogPost = (post: BlogPost) => ({
  id: post.id,
  title: post.title,
  description: post.description,
  category: post.tag,
  imageUrl: post.cover_image,
});

export const useResources = (filters: BlogFilters) => {
  const { status, tag, search, page = 1, page_size = BLOG_PAGE_SIZE } = filters;

  return useQuery({
    queryKey: ["resources", filters],
    queryFn: async () => {
      const response = await admin.get<BlogListResponse>("/blogs", {
        params: {
          status,
          tag,
          search,
          page,
          page_size,
          paginate: true,
        },
      });

      return {
        ...response,
        results: response.results ?? [],
        data: (response.results ?? []).map(transformBlogPost),
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
};

// Fetch blog stats (published, draft, total counts)
export const useBlogStats = () => {
  return useQuery({
    queryKey: ["blog-stats"],
    queryFn: async () => {
      const response = await admin.get<BlogCounts>("/blogs/stats");
      return response || { published: 0, draft: 0, total: 0 };
    },
    initialData: { published: 0, draft: 0, total: 0 },
    staleTime: 30000,
  });
};

export const useResource = (id: string) => {
  return useQuery({
    queryKey: ["resource", id],
    queryFn: async () => {
      const response = await admin.get<BlogPost>(`/blogs/${id}`);
      return response;
    },
    enabled: !!id,
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("upload_target", "TESTS");
      formData.append("file", file);

      const response = await admin.post<UploadResponse>(
        "/misc/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response;
    },
    onSuccess: () => {
      toast.success("File uploaded successfully");
    },
    onError: (error: Error) => {
      toast.error("Upload failed", {
        description: error.message,
      });
    },
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBlogPayload) => {
      const response = await admin.post<{ success: boolean; data: BlogPost }>(
        "/blogs",
        payload,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: ["blog-stats"] });
      toast.success("Blog created successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to create blog", {
        description: error.message,
      });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await admin.delete<{
        success: boolean;
        message: string;
      }>(`/blogs/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: ["blog-stats"] });
      toast.success("Blog deleted successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete blog", {
        description: error.message,
      });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: CreateBlogPayload;
    }) => {
      const response = await admin.patch<BlogPost>(`/blogs/${id}`, payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: ["blog-stats"] });
      toast.success("Blog updated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to update blog", {
        description: error.message,
      });
    },
  });
};
