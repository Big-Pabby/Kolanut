"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useResource,
  useUpdateBlog,
  useUploadFile,
  useDeleteBlog,
} from "../../hooks/useResources";
import ResourcePostForm, {
  ResourceFormData,
} from "@/components/admin/resources/ResourcePostForm";

interface EditResourcePageProps {
  params: Promise<{ id: string }>;
}

export default function EditResourcePage({ params }: EditResourcePageProps) {
  const router = useRouter();
  const { id } = use(params);
  const numericId = id;

  const [formData, setFormData] = useState<ResourceFormData>({
    category: "",
    title: "",
    content: "",
    coverImageUrl: null,
    coverImageFile: null,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch existing resource data
  const {
    data: resourceData,
    isLoading: isLoadingResource,
    error: resourceError,
  } = useResource(numericId);
  const updateBlogMutation = useUpdateBlog();
  const uploadFileMutation = useUploadFile();
  const deleteBlogMutation = useDeleteBlog();

  // Set initial data when resource is loaded
  useEffect(() => {
    if (resourceData && !initialDataLoaded) {
      setFormData({
        category: resourceData.tag || "",
        title: resourceData.title || "",
        content: resourceData.content || "", // Use description as content
        coverImageUrl: resourceData.cover_image || null,
        coverImageFile: null,
      });
      setInitialDataLoaded(true);
    }
  }, [resourceData, initialDataLoaded]);

  // Validation
  const isFormValid =
    formData.title.trim().length > 0 && formData.content.trim().length > 0;
  const hasUnsavedChanges =
    formData.title || formData.content || formData.coverImageUrl;

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSaveDraft = async () => {
    if (!formData.title || !formData.content) {
      setErrorMessage("Please fill in the title and content to save as draft");
      return;
    }

    try {
      setIsUploading(true);
      let coverImageUrl = formData.coverImageUrl || "";

      if (formData.coverImageFile) {
        const uploadResponse = await uploadFileMutation.mutateAsync(
          formData.coverImageFile,
        );
        coverImageUrl = uploadResponse.url;
      }

      await updateBlogMutation.mutateAsync({
        id: numericId,
        payload: {
          tag: formData.category,
          title: formData.title,
          content: formData.content,
          cover_image: coverImageUrl,
          status: "draft",
        },
      });

      setShowSuccessToast(true);
      setTimeout(() => {
        router.push("/admin/resources");
      }, 1500);
    } catch (error) {
      console.error("Failed to save draft:", error);
      setErrorMessage("Failed to save draft. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.content) {
      setErrorMessage("Please fill in the title and content to publish");
      return;
    }

    try {
      setIsUploading(true);
      let coverImageUrl = formData.coverImageUrl || "";

      if (formData.coverImageFile) {
        const uploadResponse = await uploadFileMutation.mutateAsync(
          formData.coverImageFile,
        );
        coverImageUrl = uploadResponse.url;
      }

      await updateBlogMutation.mutateAsync({
        id: numericId,
        payload: {
          tag: formData.category,
          title: formData.title,
          content: formData.content,
          cover_image: coverImageUrl,
          status: "published",
        },
      });

      setShowSuccessToast(true);
      setTimeout(() => {
        router.push("/admin/resources");
      }, 1500);
    } catch (error) {
      console.error("Failed to publish:", error);
      setErrorMessage("Failed to publish post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading = updateBlogMutation.isPending || isUploading || isDeleting;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBlogMutation.mutateAsync(Number(numericId));
      router.push("/admin/resources");
    } catch (error) {
      console.error("Failed to delete:", error);
      setErrorMessage("Failed to delete post. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  // Loading state
  if (isLoadingResource) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ padding: "100px 40px", gap: 16 }}
      >
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2"
          style={{ borderColor: "#af060d" }}
        />
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          Loading post...
        </p>
      </div>
    );
  }

  // Error state
  if (resourceError) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ padding: "100px 40px", gap: 16 }}
      >
        <p
          style={{
            color: "#af060d",
            fontSize: 16,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          Failed to load post
        </p>
        <Link
          href="/admin/resources"
          className="px-4 py-2"
          style={{
            color: "#af060d",
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col"
      style={{
        padding: "24px 32px",
        gap: 24,
        maxWidth: 1000,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Breadcrumb */}
      <Link
        href="/admin/resources"
        className="flex items-center gap-2 w-fit group"
        style={{ color: "#6b7280" }}
      >
        <div
          className="flex items-center justify-center transition-transform group-hover:-translate-x-1"
          style={{ width: 24, height: 24 }}
        >
          <img
            src="/icons/admin/back-chevron.svg"
            alt=""
            style={{ width: 7, height: 12, transform: "rotate(180deg)" }}
          />
        </div>
        <span
          style={{
            color: "#6b7280",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            transition: "color 0.2s",
          }}
          className="group-hover:text-gray-900"
        >
          Back to Posts
        </span>
      </Link>

      {/* Page Header */}
      <div
        className="flex flex-col bg-white border border-[#F3F4F6] p-6 rounded-[12px]"
        style={{
          gap: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1
              style={{
                color: "#111827",
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "var(--font-merriweather), Merriweather, serif",
              }}
            >
              Edit Resource Post
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 14,
                fontWeight: 400,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Update and manage your resource post
            </p>
          </div>

          {/* Delete button */}
          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2 px-4 py-2 transition-all hover:opacity-80"
            style={{
              color: "#af060d",
              fontSize: 14,
              fontWeight: 500,
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              border: "1px solid #fecaca",
              borderRadius: 8,
              backgroundColor: "#fef2f2",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6H5H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowDeleteDialog(false)}
          />
          <div
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 24,
              maxWidth: 400,
              width: "90%",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="flex flex-col items-center" style={{ gap: 16 }}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#fef2f2",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6H5H21"
                    stroke="#af060d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z"
                    stroke="#af060d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="flex flex-col"
                style={{ gap: 8, textAlign: "center" }}
              >
                <h3
                  style={{
                    color: "#111827",
                    fontSize: 18,
                    fontWeight: 600,
                   
                  }}
                >
                  Delete Post
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </p>
              </div>
              <div className="flex w-full flex-col" style={{ gap: 12 }}>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full py-3 rounded-full w-full text-white font-medium transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    backgroundColor: "#af060d",
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="w-full py-3 rounded-full font-medium transition-all hover:bg-gray-50"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d1d5db",
                    color: "#374151",
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}


      {/* Form Card */}
      <div
        className="flex flex-col bg-white border border-[#F3F4F6] rounded-[12px]"
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
          overflow: "hidden",
        }}
      >
        {/* Form Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #f3f4f6" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#fef2f2",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M11.333 2.00004C11.5081 1.83194 11.716 1.69436 11.9447 1.59748C12.1735 1.5006 12.4187 1.44653 12.6663 1.43842C12.914 1.43031 13.1596 1.46836 13.3907 1.54984C13.6217 1.63132 13.8335 1.75411 14.013 1.91004C14.1924 2.06596 14.3357 2.25185 14.4351 2.45603C14.5345 2.66021 14.5877 2.87878 14.5916 3.09959C14.5955 3.32039 14.5501 3.53904 14.4581 3.74303C14.3661 3.94702 14.2297 4.13166 14.0566 4.28604L14.013 4.32304L10.36 7.33304C10.1797 7.48983 9.96743 7.61437 9.73466 7.69983C9.50188 7.78529 9.25266 7.8289 9.00001 7.8289C8.74736 7.8289 8.49814 7.78529 8.26536 7.69983C8.03259 7.61437 7.82034 7.48983 7.64001 7.33304L7.59668 7.29304C7.41635 7.13625 7.2041 7.01171 6.97132 6.92625C6.73855 6.84079 6.48933 6.79719 6.23668 6.79719C5.98403 6.79719 5.73481 6.84079 5.50204 6.92625C5.26926 7.01171 5.05701 7.13625 4.87668 7.29304L4.83334 7.33304L2.66668 9.15904V9.33304C2.39601 9.57157 2.17872 9.8739 2.03061 10.2221C1.88249 10.5703 1.80664 10.9542 1.80664 11.3434C1.80664 11.7326 1.88249 12.1165 2.03061 12.4647C2.17872 12.8129 2.39601 13.1152 2.66668 13.3537C2.93735 13.5922 3.25668 13.7723 3.60001 13.8819C3.94334 13.9914 4.30335 14.0275 4.65668 13.9874L4.83334 13.9667L7.00001 12.14C7.18034 11.9832 7.39259 11.8587 7.62536 11.7732C7.85814 11.6877 8.10736 11.6441 8.36001 11.6441C8.61266 11.6441 8.86188 11.6877 9.09465 11.7732C9.32743 11.8587 9.53968 11.9832 9.72001 12.14L9.76334 12.18L13.4167 9.16671C13.597 9.00992 13.8092 8.88538 14.042 8.79992C14.2748 8.71446 14.524 8.67085 14.7767 8.67085C15.0293 8.67085 15.2785 8.71446 15.5113 8.79992C15.7441 8.88538 15.9563 9.00992 16.1367 9.16671C16.317 9.3235 16.468 9.50939 16.5793 9.71357C16.6906 9.91775 16.7596 10.1363 16.7823 10.3571C16.805 10.5779 16.7808 10.7998 16.7114 11.0114C16.642 11.223 16.5288 11.4195 16.3787 11.5904L16.1367 11.8534L12.4833 14.8667C12.303 15.0235 12.0907 15.148 11.858 15.2335C11.6252 15.319 11.376 15.3626 11.1233 15.3626C10.8707 15.3626 10.6215 15.319 10.3887 15.2335C10.1559 15.148 9.94368 15.0235 9.76334 14.8667C9.58301 14.7099 9.432 14.524 9.32068 14.3198C9.20936 14.1156 9.14038 13.8971 9.11768 13.6763C9.09498 13.4555 9.11917 13.2336 9.18859 13.022C9.25801 12.8104 9.37119 12.6139 9.52134 12.443L9.76334 12.18L12.76 9.71337"
                  stroke="#af060d"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.6667 5.33337L14 8.66671"
                  stroke="#af060d"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2
              style={{
                color: "#111827",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Post Details
            </h2>
          </div>

          {/* Validation hint */}
          <div className="flex items-center gap-2">
            {!isFormValid && hasUnsavedChanges && (
              <span
                style={{
                  color: "#f59e0b",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                }}
              >
                Fill required fields
              </span>
            )}
            {isFormValid && (
              <span
                style={{
                  color: "#22c55e",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                }}
              >
                Ready to save
              </span>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div style={{ padding: "24px" }}>
          <ResourcePostForm
            initialData={initialDataLoaded ? formData : undefined}
            onChange={setFormData}
          />
        </div>

        {/* Bottom Action Bar */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            borderTop: "1px solid #f3f4f6",
            backgroundColor: "#fafafa",
          }}
        >
          {/* Left side - Unsaved indicator */}
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && !isLoading && (
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#f59e0b" }}
                />
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: 13,
                    fontWeight: 400,
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  Unsaved changes
                </span>
              </div>
            )}
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isLoading || !formData.title || !formData.content}
              className="flex items-center gap-2 px-5 py-2.5 transition-all hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                color: "#991b1b",
                fontSize: 14,
                fontWeight: 500,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                border: "1.5px solid #fecaca",
                borderRadius: 8,
                backgroundColor: "#fef2f2",
              }}
            >
              {isLoading ? (
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
                  Saving...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12.667 14.001H3.333C2.979 14.001 2.667 13.689 2.667 13.335V2.667C2.667 2.313 2.979 2.001 3.333 2.001H10.667L14 5.334V13.335C14 13.689 13.689 14.001 13.333 14.001H12.667Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.667 14.001V8.667H5.333V14.001"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.333 2.001V5.334H9.333"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Save as Draft
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={isLoading || !formData.title || !formData.content}
              className="flex items-center gap-2 px-5 py-2.5 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 500,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                border: "none",
                borderRadius: 8,
                backgroundColor: "#af060d",
                boxShadow: "0 1px 2px rgba(175, 6, 13, 0.3)",
              }}
            >
              {isLoading ? (
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
                  Publishing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M14 8L6.5 15.5L2 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 11V14H5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V7.5H8.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Publish Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
