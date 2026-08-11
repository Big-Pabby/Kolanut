"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { usePublicResource } from "@/app/resources/hooks/usePublicResources";

export default function CustomerResourceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: resource, isLoading, error } = usePublicResource(slug);

  const backLink = (
    <Link
      href="/customer/resources"
      className="flex w-fit items-center gap-2 text-sm text-[#6b7280] transition-colors hover:text-[#111827]"
    >
      <ArrowLeft size={18} />
      Back to Resources
    </Link>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {backLink}
        <div className="h-[280px] w-full animate-pulse rounded-xl bg-[#f3f4f6]" />
        <div className="flex flex-col gap-3">
          <div className="h-6 w-32 animate-pulse rounded-full bg-[#f3f4f6]" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-[#f3f4f6]" />
          <div className="h-4 w-full animate-pulse rounded bg-[#f3f4f6]" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-[#f3f4f6]" />
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="flex flex-col gap-6">
        {backLink}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-10 text-center">
          <h1 className="text-lg font-semibold text-[#374151]">
            Resource not found
          </h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            {error?.message ||
              "This resource doesn't exist or has been removed."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {backLink}

      <article className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
        {resource.cover_image && (
          <figure className="h-[240px] w-full overflow-hidden bg-[#f3f4f6] md:h-[340px]">
            <img
              src={resource.cover_image}
              alt={resource.title}
              className="h-full w-full object-cover"
            />
          </figure>
        )}

        <div className="flex flex-col gap-4 p-5 md:p-8">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full border border-[#B3DAFF] bg-[#F0F8FF] px-2.5 py-0.5 text-xs font-semibold text-[#005AAD]">
              {resource.tag}
            </span>

            <h1 className="font-heading text-2xl font-bold leading-tight text-[#111827] md:text-3xl">
              {resource.title}
            </h1>

            <p className="text-sm text-[#6b7280]">
              Updated{" "}
              {new Date(resource.date_updated).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {resource.description && (
            <p className="text-base font-medium leading-relaxed text-[#4b5563]">
              {resource.description}
            </p>
          )}

          <div
            className="prose max-w-none leading-relaxed text-[#374151]"
            dangerouslySetInnerHTML={{ __html: resource.content || "" }}
          />
        </div>
      </article>
    </div>
  );
}
