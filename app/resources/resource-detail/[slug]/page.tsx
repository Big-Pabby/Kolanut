import type { Metadata } from "next";
import ResourceDetailClient from "./ResourceDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ADMIN_BASE = process.env.NEXT_PUBLIC_BASE_URL_ADMIN;
const SITE_NAME = "Kolanut Africa";
const FALLBACK_DESCRIPTION =
  "Insurance guides, videos, and tools from Kolanut Africa — learn insurance in simple language.";

async function fetchResource(slug: string) {
  if (!ADMIN_BASE) return null;
  try {
    const res = await fetch(`${ADMIN_BASE}/blogs/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    // The endpoint may return the resource directly or wrapped in `data`.
    return json?.data ?? json ?? null;
  } catch {
    return null;
  }
}

function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await fetchResource(slug);

  if (!resource) {
    return {
      title: `Resource | ${SITE_NAME}`,
      description: FALLBACK_DESCRIPTION,
    };
  }

  const description =
    resource.description ||
    (resource.content
      ? toPlainText(resource.content).slice(0, 160)
      : "") ||
    FALLBACK_DESCRIPTION;

  const images = resource.cover_image ? [resource.cover_image] : undefined;

  return {
    title: `${resource.title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: `/resources/resource-detail/${slug}` },
    openGraph: {
      type: "article",
      title: resource.title,
      description,
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: resource.title,
      description,
      images,
    },
  };
}

export default function ResourceDetailPage() {
  return <ResourceDetailClient />;
}
