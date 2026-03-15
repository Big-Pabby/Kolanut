"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  usePublicResource,
  PublicResource,
} from "../../hooks/usePublicResources";

// Animation styles
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

// Simple inline loader component
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

const ResourceDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [isVisible, setIsVisible] = useState(false);

  // Fetch resource by slug
  const { data: resource, isLoading, error } = usePublicResource(slug);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleGoBack = () => {
    router.push("/resources");
  };

  if (isLoading) {
    return (
      <>
        <style>{animationStyles}</style>
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      </>
    );
  }

  if (error || !resource) {
    return (
      <>
        <style>{animationStyles}</style>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Resource not found
          </h2>
          <p className="text-gray-500">
            The resource you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Resources
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>

      {/* Banner Section */}
      <div
        className="relative min-h-[300px] bg-cover bg-center flex items-end justify-start px-6 md:px-12 lg:px-20 pb-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/images/faq_bg.jpg')`,
          backgroundColor: "#808080",
        }}
      >
        <div className="flex flex-col justify-start items-start text-left z-10 max-w-4xl">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Resources
          </button>

          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="w-fit font-semibold px-3 py-1 rounded-full text-white bg-red-600 text-sm mb-4">
              {resource.tag}
            </p>

            <h1
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{
                fontFamily: "var(--font-merriweather), Merriweather, serif",
              }}
            >
              {resource.title}
            </h1>

            <p className="text-white/80 text-sm">
              Updated{" "}
              {new Date(resource.updated_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-12 lg:px-24 py-8 md:py-12">
        <div
          className="max-w-4xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease-out 0.3s",
          }}
        >
          {/* Cover Image */}
          {resource.cover_image && (
            <figure className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
              <img
                src={resource.cover_image}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </figure>
          )}

          {/* Article Content */}
          <article
            className="prose prose-lg max-w-none"
            style={{
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            {/* Render description as intro if available */}
            {resource.description && (
              <p className="text-xl text-gray-600 leading-relaxed mb-6 font-medium">
                {resource.description}
              </p>
            )}

            {/* Render content - could be HTML or plain text */}
            <div
              className="text-gray-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
                __html: resource.content || "",
              }}
            />
          </article>
        </div>
      </div>
    </>
  );
};

export default ResourceDetail;
