"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Book, BookOpen, Calculator, Shield } from "lucide-react";
import {
  usePublicResources,
  type PublicResource,
} from "@/app/resources/hooks/usePublicResources";
import { BLOG_PAGE_SIZE } from "@/lib/constants";
import { DOTS, getPageRange } from "@/lib/utils/pagination";

const CATEGORIES = [
  { label: "All Resources", icon: <BookOpen size={16} /> },
  { label: "Insurance policies", icon: <Book size={16} /> },
  { label: "Insurance procedures", icon: <BookOpen size={16} /> },
  { label: "Premiums in insurance", icon: <Calculator size={16} /> },
  { label: "Insurance claims process", icon: <Shield size={16} /> },
  { label: "Insurance regulatory", icon: <Book size={16} /> },
];

const ALL_RESOURCES = "All Resources";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const getExcerpt = (resource: PublicResource) =>
  resource.description ||
  resource.content?.replace(/<[^>]*>/g, "").substring(0, 150) ||
  "No description available";

export default function CustomerResourcesPage() {
  const [activeCategory, setActiveCategory] = useState(ALL_RESOURCES);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = BLOG_PAGE_SIZE;

  const { data, isLoading, error } = usePublicResources({
    tag: activeCategory === ALL_RESOURCES ? undefined : activeCategory,
    page: currentPage,
    page_size: pageSize,
  });

  const resources = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const totalCount = data?.count || 0;
  const pageNumbers = getPageRange(currentPage, totalPages);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    if (next === currentPage) return;
    setCurrentPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-[#111827]">Resources</h1>
        <p className="text-sm text-[#6b7280]">
          Guides and articles that explain how your covers work, in simple
          language.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, icon }) => {
          const isActive = activeCategory === label;
          return (
            <button
              key={label}
              onClick={() => handleCategoryChange(label)}
              className={`flex items-center gap-2 h-10 px-3.5 rounded-full border text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-brand-red text-white border-brand-red"
                  : "bg-white text-[#6b7280] border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
              }`}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-[#fecaca] bg-[#fef2f2] p-6 text-center">
          <h2 className="text-base font-semibold text-brand-red">
            Failed to load resources
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            {error.message || "Please try again later."}
          </p>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
            >
              <div className="h-[180px] w-full animate-pulse bg-[#f3f4f6]" />
              <div className="flex flex-col gap-3 p-4">
                <div className="h-5 w-24 animate-pulse rounded-full bg-[#f3f4f6]" />
                <div className="h-5 w-full animate-pulse rounded bg-[#f3f4f6]" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#f3f4f6]" />
              </div>
            </div>
          ))}
        </div>
      ) : resources.length === 0 ? (
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-10 text-center">
          <h2 className="text-base font-semibold text-[#374151]">
            No resources found
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Nothing matches this category yet. Try another one or check back
            later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <Link
              key={resource.id}
              href={`/customer/resources/${resource.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition-shadow hover:shadow-md"
            >
              <figure className="h-[180px] w-full overflow-hidden bg-[#f3f4f6]">
                {resource.cover_image && (
                  <img
                    src={resource.cover_image}
                    alt={resource.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </figure>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="w-fit rounded-full border border-[#B3DAFF] bg-[#F0F8FF] px-2.5 py-0.5 text-xs font-semibold text-[#005AAD]">
                  {resource.tag}
                </span>

                <h2 className="line-clamp-2 text-base font-semibold text-[#1C1C1C]">
                  {resource.title}
                </h2>

                <p className="line-clamp-3 text-sm leading-relaxed text-[#5B5B5B]">
                  {getExcerpt(resource)}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <span className="text-xs text-[#6b7280]">
                    {formatDate(resource.date_updated)}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-brand-red">
                    Read More
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded px-4 py-2 text-sm bg-brand-red text-white transition-colors hover:bg-brand-red/90 disabled:bg-[#e5e7eb] disabled:text-[#9ca3af]"
            >
              Previous
            </button>

            {pageNumbers.map((page, idx) =>
              page === DOTS ? (
                <span
                  key={`dots-${idx}`}
                  className="select-none px-2 py-2 text-[#9ca3af]"
                >
                  {DOTS}
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  className={`rounded px-4 py-2 text-sm transition-colors ${
                    currentPage === page
                      ? "bg-brand-red text-white"
                      : "border border-[#e5e7eb] bg-white text-brand-red hover:bg-[#f9fafb]"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded px-4 py-2 text-sm bg-brand-red text-white transition-colors hover:bg-brand-red/90 disabled:bg-[#e5e7eb] disabled:text-[#9ca3af]"
            >
              Next
            </button>
          </div>

          <p className="text-sm text-[#6b7280]">
            Showing {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{" "}
            resources
          </p>
        </div>
      )}
    </div>
  );
}
