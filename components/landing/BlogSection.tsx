"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ArrowRight from "@/src/assets/icons/arrow-right.svg";
import { motion, useInView, type Variants } from "framer-motion";
import { usePublicResources } from "@/app/resources/hooks/usePublicResources";

export default function BlogSection() {
  const router = useRouter();
  const { data: blogsData, isLoading } = usePublicResources({
    page_size: 3,
    page: 1,
  });
  const articles = blogsData?.results || [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="bg-white py-10 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 lg:mb-12 flex flex-col items-center gap-1 text-center"
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold text-dark-text">
            <span className="text-brand-red">Learn Insurance</span> In Simple
            Language
          </h2>
          <p className="max-w-[830px] text-base lg:text-lg leading-[26.1px] text-body-text px-4">
            Insurance doesn't have to be confusing. Our guides, videos, and
            tools explain how different covers work, what to look out for, and
            how to make the best decisions for your home, car, trips, and
            business.
          </p>
        </motion.div>

        {/* Article cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8 lg:mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-body-text">Loading blogs...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-body-text">
                No blogs available at the moment.
              </p>
            </div>
          ) : (
            articles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className="overflow-hidden rounded-lg border border-card-border bg-white"
              >
                {/* Article image */}
                <img
                  src={article.cover_image || "/images/article.png"}
                  alt={article.title}
                  className="h-[180px] sm:h-[220px] lg:h-[301px] w-full rounded-t-lg object-cover"
                />

                {/* Article content */}
                <div className="flex flex-col gap-3 lg:gap-4 border-b border-l border-r border-card-border rounded-b-lg p-3 lg:p-4">
                  <div className="flex flex-col gap-3 lg:gap-4">
                    <Badge className="w-fit rounded-full border border-category-blue bg-[#F0F8FF] px-2.5 py-0.5 text-xs font-medium text-[#005AAD]">
                      {article.tag || "Blog"}
                    </Badge>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg lg:text-xl font-medium text-dark-text">
                        {article.title}
                      </h3>
                      <p className="text-sm lg:text-base leading-[25.76px] text-body-text line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      router.push(`/resources/resource-detail/${article.slug}`)
                    }
                    className="flex items-center gap-2 text-sm lg:text-base font-medium text-brand-red hover:opacity-80 transition-opacity text-left"
                  >
                    Read More
                    <ArrowRight
                      width={13}
                      height={13}
                      style={{ color: "#af060d" }}
                    />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Explore button */}
        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/resources")}
            className="rounded-full bg-brand-red !py-2.5 !px-6 lg:!py-3 lg:!px-10 text-sm lg:text-base font-medium text-white hover:bg-brand-red/90 h-auto"
          >
            Explore More Resources
          </Button>
        </div>
      </div>
    </section>
  );
}
