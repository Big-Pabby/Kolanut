"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Book, BookOpen, Calculator, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePublicResources, PublicResource } from "./hooks/usePublicResources";

// Animation keyframes style
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }
  .animate-slide-in-left {
    animation: slideInLeft 0.4s ease-out forwards;
  }
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  .image-hover {
    transition: transform 0.5s ease;
  }
  .image-hover:hover {
    transform: scale(1.05);
  }
  .filter-btn {
    transition: all 0.2s ease;
  }
  .filter-btn:active {
    transform: scale(0.95);
  }
  .pulse-btn:hover {
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
    }
  }
  .shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

// Simple inline loader component
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

const CATEGORIES = [
  { label: "All Resources", icon: <BookOpen size={18} /> },
  { label: "Claims", icon: <Shield size={18} /> },
  { label: "Premiums", icon: <Calculator size={18} /> },
  { label: "Regulatory", icon: <Book size={18} /> },
];

const Resources: React.FC = () => {
  const router = useRouter();
  const [activeResource, setActiveResource] = useState("All Resources");
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Map UI category to API tag
  const getTagFromCategory = (category: string): string | undefined => {
    if (category === "All Resources") return undefined;
    return category;
  };

  // Fetch resources from API
  const {
    data: resourcesData,
    isLoading,
    error,
  } = usePublicResources({
    tag: getTagFromCategory(activeResource),
    page: currentPage,
    page_size: pageSize,
  });

  const resources: PublicResource[] = resourcesData?.results || [];
  const totalPages = resourcesData?.total_pages || 1;
  const totalCount = resourcesData?.count || 0;

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setActiveResource(category);
    setCurrentPage(1);
  };

  // Initialize animation on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleCardClick = (resource: PublicResource) => {
    router.push(`/resources/resource-detail/${resource.id}`);
  };

  return (
    <>
      <style>{animationStyles}</style>
      {/* BANNER */}
      <div
        className="relative min-h-[400px] bg-cover bg-center flex items-end justify-start px-6 md:px-12 lg:px-20 pb-8 md:pb-15"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/images/faq_bg.jpg')`,
          backgroundColor: "#808080",
        }}
      >
        <div className="flex flex-col justify-start items-start text-left z-10 ">
          <h1
            className={`font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Learn insurance in simple language
          </h1>
          <p
            className={`md:w-[90%] lg:w-[70%] font-medium text-base md:text-lg leading-[22px] md:leading-[26px] text-left text-[#FBFBFB] transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Insurance doesn't have to be confusing. Our guides, videos, and
            tools explain how different covers work, what to look out for, and
            how to make the best decisions for your home, car, trips, and
            business.
          </p>
        </div>
      </div>
      <div className="px-6 md:px-12 lg:px-24 flex flex-col gap-4 py-4 my-5">
        <div className="lg:flex gap-4 items-center lg:my-5 lg:overflow-visible overflow-x-auto pb-2">
          <div className="flex gap-2 md:gap-4 items-center min-w-0">
            {CATEGORIES.map(({ label, icon }, idx) => (
              <button
                key={label}
                onClick={() => handleCategoryChange(label)}
                className={`filter-btn flex gap-2 items-center justify-between h-[45px] px-3 rounded-full border transition whitespace-nowrap ${
                  activeResource === label
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span
                  className={
                    activeResource === label ? "text-white" : "text-gray-500"
                  }
                >
                  {icon}
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="col-span-full text-center py-10">
            <h2 className="text-xl font-semibold text-red-600">
              Failed to load resources
            </h2>
            <p className="text-gray-500 mt-2">
              {error.message || "Please try again later."}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[400px] w-full max-w-[350px] flex flex-col border rounded-xl overflow-hidden bg-white"
              >
                <div className="w-full h-[200px] shimmer" />
                <div className="flex flex-col justify-between p-4 gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="h-6 w-24 shimmer rounded" />
                    <div className="h-6 w-full shimmer rounded" />
                    <div className="h-4 w-3/4 shimmer rounded" />
                  </div>
                  <div className="h-4 w-1/3 shimmer rounded mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {" "}
            {resources.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <h2 className="text-xl font-semibold text-gray-700">
                  No resources found
                </h2>
                <p className="text-gray-500 mt-2">
                  We couldn't find any resources matching your filters. Try
                  adjusting your category or check back later.
                </p>
              </div>
            ) : (
              resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="h-[400px] flex flex-col border rounded-xl overflow-hidden bg-white card-hover w-full"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.4s ease-out ${index * 50}ms`,
                  }}
                >
                  {/* Image Section */}
                  <figure className="w-full h-[200px] overflow-hidden">
                    <img
                      src={resource.cover_image}
                      alt={resource.title}
                      className="w-full h-full object-cover rounded-t-xl image-hover"
                    />
                  </figure>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between p-4">
                    <div className="flex flex-col gap-2">
                      <p className="w-fit font-semibold px-2.5 py-0.5 rounded-full text-[#005AAD] bg-[#F0F8FF] border border-[#B3DAFF] text-left text-sm">
                        {resource.tag}
                      </p>

                      <p className="text-left font-semibold text-lg text-[#1C1C1C] line-clamp-2">
                        {resource.title}
                      </p>

                      <p className="text-left text-sm text-[#5B5B5B] leading-relaxed line-clamp-3">
                        {resource.description ||
                          resource.content
                            ?.replace(/<[^>]*>/g, "")
                            .substring(0, 150) ||
                          "No description available"}
                      </p>
                    </div>

                    {/* Footer Section */}
                    <div className="flex justify-between items-center gap-3 mt-2">
                      <div className="flex justify-between items-center text-sm text-[#5B5B5B]">
                        <p className="flex items-center gap-2 ">
                          {new Date(resource.updated_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCardClick(resource)}
                        className="w-fit flex gap-1 items-center border-b-2 border-primary text-primary font-semibold text-sm hover:underline transition-colors duration-200 hover:text-red-600 hover:border-red-600"
                      >
                        Read More
                        <ArrowRight
                          size={18}
                          className="text-primary transition-colors duration-200"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-300 transition-colors duration-200 hover:bg-red-700 disabled:hover:bg-gray-300"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded transition-all duration-200 ${
                  currentPage === i + 1
                    ? "bg-primary text-white hover:bg-red-700"
                    : "bg-white border text-primary hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-300 transition-colors duration-200 hover:bg-red-700 disabled:hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Resources;
