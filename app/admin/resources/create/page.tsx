"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateBlog, useUploadFile } from "../hooks/useResources";
import ResourcePostForm, {
  ResourceFormData,
} from "@/components/admin/resources/ResourcePostForm";

export default function CreateResourcePage() {
  const router = useRouter();

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

  const createBlogMutation = useCreateBlog();
  const uploadFileMutation = useUploadFile();

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

      // Upload file if selected
      if (formData.coverImageFile) {
        const uploadResponse = await uploadFileMutation.mutateAsync(
          formData.coverImageFile,
        );
        coverImageUrl = uploadResponse.url;
      }

      await createBlogMutation.mutateAsync({
        tag: formData.category,
        title: formData.title,
        content: formData.content,
        cover_image: coverImageUrl,
        status: "draft",
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

      // Upload file if selected
      if (formData.coverImageFile) {
        const uploadResponse = await uploadFileMutation.mutateAsync(
          formData.coverImageFile,
        );
        coverImageUrl = uploadResponse.url;
      }

      await createBlogMutation.mutateAsync({
        tag: formData.category,
        title: formData.title,
        content: formData.content,
        cover_image: coverImageUrl,
        status: "published",
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

  const isLoading = createBlogMutation.isPending || isUploading;

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
              Create Resource Post
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
              Create and publish a new resource post for your readers
            </p>
          </div>

          {/* Status indicator */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "#fef2f2" }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#ef4444" }}
            />
            <span
              style={{
                color: "#991b1b",
                fontSize: 12,
                fontWeight: 500,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Draft
            </span>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {errorMessage && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg animate-in slide-in-from-top-2"
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            boxShadow: "0 4px 12px rgba(239,68,68,0.15)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
            <path
              d="M10 6V10.5M10 13.5H10.01"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              color: "#b91c1c",
              fontSize: 14,
              fontWeight: 500,
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            {errorMessage}
          </span>
          <button
            onClick={() => setErrorMessage(null)}
            className="ml-auto p-1 hover:bg-red-100 rounded transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M1 13L13 1"
                stroke="#b91c1c"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg animate-in slide-in-from-top-2"
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            boxShadow: "0 4px 12px rgba(34,197,94,0.15)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="#22c55e"
              strokeWidth="1.5"
            />
            <path
              d="M7 10L9 12L13 8"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              color: "#15803d",
              fontSize: 14,
              fontWeight: 500,
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            Post saved successfully! Redirecting...
          </span>
        </div>
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
                  d="M8 2C4.688 2 2 4.688 2 8C2 11.312 4.688 14 8 14C11.312 14 14 11.312 14 8C14 4.688 11.312 2 8 2Z"
                  stroke="#af060d"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 5V8.5M8 11H8.01"
                  stroke="#af060d"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                color: "#111827",
                fontSize: 16,
                fontWeight: 600,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Post Details
            </span>
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
                Ready to publish
              </span>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div style={{ padding: "24px" }}>
          <ResourcePostForm onChange={setFormData} />
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
                  Publish Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
        <span>Tip: Save your work as draft before leaving</span>
      </div>
    </div>
  );
}
