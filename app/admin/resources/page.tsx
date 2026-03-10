"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import ResourceMetricCard from "@/components/admin/resources/ResourceMetricCard";
import ResourceCard, { ResourceItem } from "@/components/admin/resources/ResourceCard";
import ResourcesFilters from "@/components/admin/resources/ResourcesFilters";

const CATEGORIES = ["Insurance Basics", "Claims", "Premiums", "Regulatory"];

const PUBLISHED_RESOURCES: ResourceItem[] = [
  {
    id: 1,
    title: "Insurance Basics",
    description:
      "Your introduction to property insurance essentials. Learn about coverage types, policy terms, and premium calculations.",
    category: "Category",
    imageUrl: "/images/article-resource.png",
  },
  {
    id: 2,
    title: "Insurance Basics",
    description:
      "Your introduction to property insurance essentials. Learn about coverage types, policy terms, and premium calculations.",
    category: "Category",
    imageUrl: "/images/article-resource.png",
  },
  {
    id: 3,
    title: "Insurance Basics",
    description:
      "Your introduction to property insurance essentials. Learn about coverage types, policy terms, and premium calculations.",
    category: "Category",
    imageUrl: "/images/article-resource.png",
  },
  {
    id: 4,
    title: "Insurance Basics",
    description:
      "Your introduction to property insurance essentials. Learn about coverage types, policy terms, and premium calculations.",
    category: "Category",
    imageUrl: "/images/article-resource.png",
  },
  {
    id: 5,
    title: "Insurance Basics",
    description:
      "Your introduction to property insurance essentials. Learn about coverage types, policy terms, and premium calculations.",
    category: "Category",
    imageUrl: "/images/article-resource.png",
  },
  {
    id: 6,
    title: "Insurance Basics",
    description:
      "Your introduction to property insurance essentials. Learn about coverage types, policy terms, and premium calculations.",
    category: "Category",
    imageUrl: "/images/article-resource.png",
  },
];

const DRAFT_RESOURCES: ResourceItem[] = [
  {
    id: 7,
    title: "Understanding Your Policy",
    description:
      "A comprehensive guide to reading and understanding your insurance policy documents and terms.",
    category: "Category",
    imageUrl: "/images/article-resource.png",
  },
  {
    id: 8,
    title: "Claims Process Guide",
    description:
      "Step-by-step walkthrough of how to file and manage an insurance claim from start to finish.",
    category: "Category",
    imageUrl: "/images/article-resource.png",
  },
];

export default function AdminResourcesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"published" | "drafts">("published");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const sourceData = activeTab === "published" ? PUBLISHED_RESOURCES : DRAFT_RESOURCES;

  const filtered = useMemo(() => {
    return sourceData.filter((r) => {
      const matchesSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = !selectedCategory || r.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [sourceData, search, selectedCategory]);

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
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
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
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
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
          <ResourceMetricCard label="Publish Posts" count={100} />
          <ResourceMetricCard label="Posts in Draft" count={100} />
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
          onTabChange={setActiveTab}
          search={search}
          onSearchChange={setSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={CATEGORIES}
        />

        {/* Resource grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p
              style={{
                color: "#4b5563",
                fontSize: 16,
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              No resources found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onViewPost={(r) => router.push(`/admin/resources/${r.id}/edit`)}
                onEdit={(r) => router.push(`/admin/resources/${r.id}/edit`)}
                onDelete={(r) => console.log("Delete", r.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
