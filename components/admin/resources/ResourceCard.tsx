"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { BlogPost } from "@/app/admin/resources/hooks/useResources";

export interface ResourceItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

interface ResourceCardProps {
  resource: BlogPost;
  onViewPost?: (resource: BlogPost) => void;
  onEdit?: (resource: BlogPost) => void;
  onDelete?: (resource: BlogPost) => void;
}

export default function ResourceCard({ resource, onViewPost, onEdit, onDelete }: ResourceCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#fefefe",
        borderRadius: 8,
        border: "1px solid #f3f4f6",
      }}
    >
      {/* Article image */}
      <div className="overflow-hidden" style={{ height: 300 }}>
        <img
          src={resource.cover_image}
          alt={resource.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card content */}
      <div
        className="flex flex-col gap-4"
        style={{
          padding: "16px",
          borderTop: "1px solid #f3f4f6",
        }}
      >
        {/* Top row: category badge + 3-dot menu */}
        <div className="flex items-start justify-between">
          {/* Category badge */}
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              color: "#005aad",
              backgroundColor: "#f0f8ff",
              border: "1px solid #b3daff",
              borderRadius: 20,
              padding: "2px 10px",
            }}
          >
            {resource.tag}
          </span>

          {/* Three-dot menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreVertical size={16} color="#374151" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute right-0 z-20 mt-1 flex flex-col overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    minWidth: 130,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <button
                    className="text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: "#374151", fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif" }}
                    onClick={() => { setMenuOpen(false); onEdit?.(resource); }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-left px-4 py-2.5 text-sm hover:bg-red-50 transition-colors"
                    style={{ color: "#af060d", fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif" }}
                    onClick={() => { setMenuOpen(false); onDelete?.(resource); }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-1">
          <h3
            className="line-clamp-1"
            style={{
              color: "#161616",
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            {resource.title}
          </h3>
          <p
            className="line-clamp-2"
            style={{
              color: "#4b5563",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "22.54px",
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            {resource.content}
          </p>
        </div>

        {/* View Post link */}
        <button
          onClick={() => onViewPost?.(resource)}
          className="flex items-center gap-1.5 w-fit group"
        >
          <span
            style={{
              color: "#af060d",
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            View Post
          </span>
          <img
            src="/icons/admin/arrow-right.svg"
            alt=""
            style={{ width: 13, height: 13 }}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
