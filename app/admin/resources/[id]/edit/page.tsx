"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResourcePostForm, { ResourceFormData } from "@/components/admin/resources/ResourcePostForm";

// Mock data keyed by ID — replace with real API fetch
const MOCK_POSTS: Record<string, ResourceFormData> = {
  "1": {
    category: "Premium",
    title: "Become an Insurance expert",
    content:
      "Are you passionate about finance and want to help others secure their future? Becoming an insurance expert can be a very fulfilling career choice. With in-depth knowledge of insurance products and good communication skills, you can help your clients make wise financial decisions. Canlife offers the opportunity for you to develop a career in insurance with the full support of our team of experts. Let's realize your dream of becoming a successful insurance expert together.\n\nAre you passionate about finance and want to help others secure their future? Becoming an insurance expert can be a very fulfilling career choice. With in-depth knowledge of insurance products and good communication skills, you can help your clients make wise financial decisions. Canlife offers the opportunity for you to develop a career in insurance with the full support of our team of experts. Let's realize your dream of becoming a successful insurance expert together.",
    coverImageUrl: "/images/cover-sample.jpg",
  },
};

interface EditResourcePageProps {
  params: Promise<{ id: string }>;
}

export default function EditResourcePage({ params }: EditResourcePageProps) {
  const router = useRouter();
  const { id } = use(params);
  const existing = MOCK_POSTS[id] ?? {
    category: "",
    title: "",
    content: "",
    coverImageUrl: null,
  };

  const [formData, setFormData] = useState<ResourceFormData>(existing);

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    // TODO: API call
    router.push("/admin/resources");
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
    // TODO: API call
    router.push("/admin/resources");
  };

  return (
    <div className="flex flex-col" style={{ padding: "24px 40px", gap: 16 }}>
      {/* Breadcrumb */}
      <Link
        href="/admin/resources"
        className="flex items-center gap-2 w-fit"
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

      {/* Title row + action buttons */}
      <div className="flex items-start justify-between gap-4">
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

        {/* Top-right action buttons */}
        <div className="flex items-center gap-4 shrink-0">
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
            onClick={handleSaveChanges}
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
            Save Changes
          </button>
        </div>
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
        <ResourcePostForm initialData={existing} onChange={setFormData} />
      </div>
    </div>
  );
}
