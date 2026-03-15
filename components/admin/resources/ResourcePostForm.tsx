"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";

const CATEGORIES = [
  "Insurance Basics",
  "Claims",
  "Premiums",
  "Regulatory",
  "Premium",
];

export interface ResourceFormData {
  category: string;
  title: string;
  content: string;
  coverImageUrl: string | null;
  coverImageFile?: File | null;
}

interface ResourcePostFormProps {
  initialData?: Partial<ResourceFormData>;
  onChange?: (data: ResourceFormData) => void;
}

export default function ResourcePostForm({
  initialData,
  onChange,
}: ResourcePostFormProps) {
  const [formData, setFormData] = useState<ResourceFormData>({
    category: initialData?.category ?? "",
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
    coverImageUrl: initialData?.coverImageUrl ?? null,
    coverImageFile: null,
  });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category ?? "",
        title: initialData.title ?? "",
        content: initialData.content ?? "",
        coverImageUrl: initialData.coverImageUrl ?? null,
        coverImageFile: null,
      });
    }
  }, [initialData]);

  const update = (patch: Partial<ResourceFormData>) => {
    const next = { ...formData, ...patch };
    setFormData(next);
    onChange?.(next);
  };

  const handleCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      update({ coverImageUrl: url, coverImageFile: file });
    }
  };

  return (
    <div className="flex flex-col" style={{ gap: 24 }}>
      {/* ── Upload Cover Image ── */}
      <div className="flex flex-col" style={{ gap: 16 }}>
        <span
          style={{
            color: "#0e0e0e",
            fontSize: 16,
            fontWeight: 400,
            fontFamily: "var(--font-merriweather), Merriweather, serif",
            letterSpacing: "-0.16px",
          }}
        >
          Upload Cover&nbsp; Image
        </span>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverUpload}
        />

        <div
          onClick={() => coverInputRef.current?.click()}
          className="flex items-center justify-center cursor-pointer overflow-hidden"
          style={{
            height: 300,
            borderRadius: 8,
            border: formData.coverImageUrl
              ? "1px solid #d1d5db"
              : "2px dashed #d1d5db",
            backgroundColor: formData.coverImageUrl ? "transparent" : "#fafafa",
          }}
        >
          {formData.coverImageUrl ? (
            <img
              src={formData.coverImageUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center">
                <img
                  src="/icons/admin/upload-image.svg"
                  alt="upload"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <span
                style={{
                  color: "#6b7280",
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                }}
              >
                Click to upload image
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Post Details ── */}
      <div className="flex flex-col" style={{ gap: 16 }}>
        <div className="flex flex-col" style={{ gap: 16 }}>
          {/* Post Category */}
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label
              style={{
                color: "#374151",
                fontSize: 14,
                fontWeight: 500,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Post Category
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoryOpen((p) => !p)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: 10,
                  boxShadow: "0px 1px 2px rgba(18, 26, 43, 0.05)",
                  backgroundColor: "#ffffff",
                }}
              >
                <span
                  style={{
                    color: formData.category ? "#111827" : "#111827",
                    fontSize: 16,
                    fontWeight: 400,
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  {formData.category || "Select"}
                </span>
                <img
                  src="/icons/admin/chevron-down-dark.svg"
                  alt=""
                  style={{ width: 12, height: 7 }}
                />
              </button>

              {categoryOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCategoryOpen(false)}
                  />
                  <div
                    className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #d1d5db",
                      borderRadius: 8,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                        style={{
                          color: "#111827",
                          fontSize: 16,
                          fontWeight: formData.category === cat ? 500 : 400,
                          fontFamily:
                            "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                        }}
                        onClick={() => {
                          update({ category: cat });
                          setCategoryOpen(false);
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Post Title */}
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label
              style={{
                color: "#374151",
                fontSize: 14,
                fontWeight: 500,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Post Title
            </label>
            <input
              type="text"
              placeholder="Enter"
              value={formData.title}
              onChange={(e) => update({ title: e.target.value })}
              className="w-full px-4 py-3 outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
              style={{
                border: "1px solid #d1d5db",
                borderRadius: 10,
                boxShadow: "0px 1px 2px rgba(18, 26, 43, 0.05)",
                color: "#111827",
                fontSize: 16,
                fontWeight: 400,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          {/* Post Content */}
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label
              style={{
                color: "#374151",
                fontSize: 14,
                fontWeight: 500,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Post Content
            </label>

            <RichTextEditor
              value={formData.content}
              onChange={(content) => update({ content })}
              placeholder="Enter description..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
