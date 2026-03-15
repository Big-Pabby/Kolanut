"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useResources,
  useDeleteBlog,
  useBlogStats,
  BlogFilters,
} from "./hooks/useResources";
import ResourceMetricCard from "@/components/admin/resources/ResourceMetricCard";
import { BlogPost } from "./hooks/useResources";
import ResourcesFilters from "@/components/admin/resources/ResourcesFilters";
import ResourceCard from "@/components/admin/resources/ResourceCard";

const CATEGORIES = ["Insurance Basics", "Claims", "Premiums", "Regulatory"];

export default function AdminResourcesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"published" | "drafts">(
    "published",
  );
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Delete confirmation modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    resource: BlogPost | null;
  }>({ isOpen: false, resource: null });

  // Build filter params
  const filters: BlogFilters = {
    status: activeTab === "drafts" ? "draft" : "published",
    tag: selectedCategory || undefined,
    search: search || undefined,
    page: currentPage,
    page_size: pageSize,
  };

  // Fetch resources with filters
  const { data: resourcesData, isLoading, error } = useResources(filters);
  const deleteMutation = useDeleteBlog();

  // Fetch stats
  const { data: blogStats } = useBlogStats();

  const resources: BlogPost[] = resourcesData?.results || [];

  // Pagination info from API
  const totalPages = resourcesData?.total_Pages || 1;
  const totalCount = resourcesData?.count || 0;

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: "published" | "drafts") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleDelete = (resource: BlogPost) => {
    setDeleteModal({ isOpen: true, resource });
  };

  const confirmDelete = async () => {
    if (deleteModal.resource) {
      await deleteMutation.mutateAsync(deleteModal.resource.id);
      setDeleteModal({ isOpen: false, resource: null });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, resource: null });
  };

  const handleEdit = (resource: BlogPost) => {
    router.push(`/admin/resources/${resource.id}/edit`);
  };

  const handleViewPost = (resource: BlogPost) => {
    router.push(`/admin/resources/${resource.id}/edit`);
  };

  const publishedCount = blogStats?.published ?? 0;
  const draftsCount = blogStats?.draft ?? 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header + metrics */}
      <div
        className="flex flex-col gap-4 p-4"
        style={{
          backgroundColor: "#fefefe",
          border: "1px solid #f3f4f6",
          borderRadius: 8,
        }}
      >
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h1
              style={{
                color: "#000000",
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "var(--font-merriweather), Merriweather, serif",
              }}
            >
              Resources
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              Create and manage properties
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/resources/create")}
            className="flex items-center justify-center px-5 py-2.5 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#af060d",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 500,
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              border: "none",
              borderRadius: 24,
              whiteSpace: "nowrap",
            }}
          >
            Add New Resource
          </button>
        </div>

        {/* Metrics row */}
        <div className="flex gap-4">
          <ResourceMetricCard
            label="Publish Posts"
            count={publishedCount}
            isLoading={isLoading}
          />
          <ResourceMetricCard
            label="Posts in Draft"
            count={draftsCount}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Filters + Grid */}
      <div
        className="flex flex-col gap-4 p-4"
        style={{
          backgroundColor: "#fefefe",
          border: "1px solid #f3f4f6",
          borderRadius: 8,
        }}
      >
        <ResourcesFilters
          activeTab={activeTab}
          onTabChange={handleTabChange}
          search={search}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={CATEGORIES}
        />

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2"
              style={{ borderColor: "#af060d" }}
            />
            <p
              style={{
                color: "#6b7280",
                fontSize: 14,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Loading resources...
            </p>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p
              style={{
                color: "#af060d",
                fontSize: 16,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Failed to load resources
            </p>
            <p
              style={{
                color: "#6b7280",
                fontSize: 14,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              {error.message}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && resources.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p
              style={{
                color: "#4b5563",
                fontSize: 16,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              No resources found.
            </p>
          </div>
        )}

        {/* Resources grid */}
        {!isLoading && !error && resources.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onViewPost={handleViewPost}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between"
          style={{
            padding: "16px 0",
          }}
        >
          <div
            style={{
              color: "#6b7280",
              fontSize: 14,
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{" "}
            results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              style={{
                color: "#374151",
                fontSize: 14,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 rounded-md ${currentPage === page ? "bg-[#af060d] text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                style={{
                  color: currentPage === page ? "#ffffff" : "#374151",
                  fontSize: 14,
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              style={{
                color: "#374151",
                fontSize: 14,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={cancelDelete}
          />

          {/* Modal Content */}
          <div
            className="relative flex flex-col gap-6 p-6"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              maxWidth: 400,
              width: "90%",
            }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#fef2f2",
                margin: "0 auto",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6H5H21"
                  stroke="#af060d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                  stroke="#af060d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2 text-center">
              <h2
                style={{
                  color: "#111827",
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                }}
              >
                Delete Post?
              </h2>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: 14,
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  lineHeight: 1.5,
                }}
              >
                Are you sure you want to delete{" "}
                <span style={{ fontWeight: 500, color: "#111827" }}>
                  "{deleteModal.resource?.title}"
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2.5 transition-colors hover:bg-gray-50"
                style={{
                  color: "#374151",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  backgroundColor: "#ffffff",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 transition-colors hover:opacity-90 disabled:opacity-50"
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  border: "none",
                  borderRadius: 8,
                  backgroundColor: "#af060d",
                }}
              >
                {deleteMutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M14 8C14 11.3137 11.3137 14 8 14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
