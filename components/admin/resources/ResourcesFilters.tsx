"use client";

import { useState } from "react";

type Tab = "published" | "drafts";

interface ResourcesFiltersProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
}

export default function ResourcesFilters({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ResourcesFiltersProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Tabs */}
      <div
        className="flex items-center gap-2 p-1.5 shrink-0"
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: 8,
        }}
      >
        <button
          onClick={() => onTabChange("published")}
          className="px-3 py-2 rounded transition-colors"
          style={{
            fontSize: 14,
            fontWeight: activeTab === "published" ? 500 : 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            color: activeTab === "published" ? "#af060d" : "#6b7280",
            backgroundColor: activeTab === "published" ? "#ffffff" : "transparent",
            border: "none",
            boxShadow: activeTab === "published" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          }}
        >
          Published Posts
        </button>
        <button
          onClick={() => onTabChange("drafts")}
          className="px-3 py-2 rounded transition-colors"
          style={{
            fontSize: 14,
            fontWeight: activeTab === "drafts" ? 500 : 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            color: activeTab === "drafts" ? "#af060d" : "#6b7280",
            backgroundColor: activeTab === "drafts" ? "#ffffff" : "transparent",
            border: "none",
            boxShadow: activeTab === "drafts" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          }}
        >
          Post In Drafts
        </button>
      </div>

      {/* Category dropdown */}
      <div className="relative shrink-0">
        <button
          onClick={() => setCategoryOpen((prev) => !prev)}
          className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gray-50"
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            backgroundColor: "#ffffff",
          }}
        >
          <span
            style={{
              color: "#374151",
              fontSize: 16,
              fontWeight: 400,
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            {selectedCategory || "Category"}
          </span>
          <img src="/icons/admin/chevron-down.svg" alt="" style={{ width: 12, height: 7 }} />
        </button>

        {categoryOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setCategoryOpen(false)} />
            <div
              className="absolute left-0 top-full z-20 mt-1 flex flex-col overflow-hidden"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                minWidth: 140,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <button
                className="text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                style={{ color: "#374151" }}
                onClick={() => { onCategoryChange(""); setCategoryOpen(false); }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                  style={{ color: "#374151", fontWeight: selectedCategory === cat ? 500 : 400 }}
                  onClick={() => { onCategoryChange(cat); setCategoryOpen(false); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 flex-1"
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          backgroundColor: "#ffffff",
          padding: "10px 14px",
          minWidth: 200,
        }}
      >
        <img src="/icons/admin/search.svg" alt="search" style={{ width: 17, height: 17, flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 outline-none bg-transparent"
          style={{
            color: "#6b7280",
            fontSize: 16,
            fontWeight: 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
