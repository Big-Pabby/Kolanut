"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResourcePostForm, { ResourceFormData } from "@/components/admin/resources/ResourcePostForm";

export default function CreateResourcePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ResourceFormData>({
    category: "",
    title: "",
    content: "",
    coverImageUrl: null,
  });

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    // TODO: API call
    router.push("/admin/resources");
  };

  const handlePublish = () => {
    console.log("Publishing:", formData);
    // TODO: API call
    router.push("/admin/resources");
  };

  return (
    <div className="flex flex-col" style={{ padding: "24px 40px", gap: 16 }}>
      {/* Breadcrumb */}
      <Link
        href="/admin/resources"
        className="flex items-center gap-2 w-fit"
        style={{ color: "#4b5563" }}
      >
        <img src="/icons/admin/back-chevron.svg" alt="" style={{ width: 7, height: 12 }} />
        <span
          style={{
            color: "#4b5563",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          Back to Posts
        </span>
      </Link>

      {/* Page title */}
      <div className="flex flex-col" style={{ gap: 4 }}>
        <h1
          style={{
            color: "#000000",
            fontSize: 20,
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
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          Create and publish resources post
        </p>
      </div>

      {/* Form card */}
      <div
        style={{
          backgroundColor: "#fefefe",
          border: "1px solid #f3f4f6",
          borderRadius: 8,
          padding: "16px",
          maxWidth: 800,
        }}
      >
        <ResourcePostForm onChange={setFormData} />

        {/* Bottom action buttons */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-6 py-2.5 transition-opacity hover:opacity-80"
            style={{
              color: "#af060d",
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              border: "1.5px solid #af060d",
              borderRadius: 24,
              backgroundColor: "transparent",
            }}
          >
            Save to Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="px-6 py-2.5 transition-opacity hover:opacity-90"
            style={{
              color: "#ffffff",
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              border: "none",
              borderRadius: 24,
              backgroundColor: "#af060d",
            }}
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}
