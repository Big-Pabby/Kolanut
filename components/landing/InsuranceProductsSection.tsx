"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCouponFlowStore } from "@/lib/store/couponFlowStore";

import { motion, useInView, type Variants } from "framer-motion";

export type InsuranceProduct = {
  /** Path to a public icon (uses the navbar "Get Insured" icons). */
  icon: string;
  title: string;
  desc: string;
  href?: string;
};

/** The three products Kolanut sells — shared with the customer dashboard. */
export const INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    icon: "/motor.svg",
    title: "Motor Insurance",
    desc: "Drive assured knowing your vehicle is  financially protected from unforeseen perils.",
    href: "/motor-insurance",
  },
  {
    icon: "/home.svg",
    title: "Home & Property Insurance",
    desc: "Our Property Insurance products you in the event of damage or theft of your property.",
    href: "/home-and-property-insurance",
  },
  {
    icon: "/life-family.svg",
    title: "Life & Family Insurance",
    desc: "This plan is designed to provide affordable life insurance to individuals and families.",
    href: "/life-and-family-insurance",
  },
];

interface InsuranceProductsSectionProps {
  title?: string;
  subtitle?: string;
  products?: InsuranceProduct[];
  /** When true, selecting a product starts the coupon generation flow. */
  couponFlow?: boolean;
}

export default function InsuranceProductsSection({
  title = "Choose Your Insurance Product",
  subtitle = "Choose the insurance that fits your needs and get covered in minutes.",
  products = INSURANCE_PRODUCTS,
  couponFlow = false,
}: InsuranceProductsSectionProps = {}) {
  const startCouponFlow = useCouponFlowStore((s) => s.startCouponFlow);
  const resetCouponFlow = useCouponFlowStore((s) => s.reset);

  const handleSelect = () => {
    if (couponFlow) {
      startCouponFlow();
    } else {
      resetCouponFlow();
    }
  };
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
    <section className="bg-[#FFFAFA] py-10 px-4 lg:px-20">
      <div className="mx-auto ">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 lg:mb-12 flex flex-col items-center gap-1 text-center"
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold text-dark-text">
            {title}
          </h2>
          <p className="text-base text-body-text px-4">{subtitle}</p>
        </motion.div>

        {/* Products grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3 lg:gap-0"
        >
          <div className="grid grid-cols-1 gap-3 lg:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(({ icon, title, desc, href }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="flex flex-col items-center gap-3 lg:gap-4  border-[#af060d]! !hover:border-2 bg-[#FFFFFF] py-4 lg:py-6 px-3 lg:px-4 text-center rounded-xl lg:rounded-2xl"
              >
                <span
                  role="img"
                  aria-label={title}
                  className="inline-block w-14 h-14"
                  style={{
                    backgroundColor: "#af060d",
                    maskImage: `url(${icon})`,
                    WebkitMaskImage: `url(${icon})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                  }}
                />
                <div className="flex flex-col gap-1.5 lg:gap-2">
                  <h3 className="text-base lg:text-lg font-semibold text-dark-text">
                    {title}
                  </h3>
                  <p className="text-xs lg:text-sm leading-[20.3px] text-product-card-text line-clamp-2 lg:line-clamp-none">
                    {desc}
                  </p>
                </div>
                <Button
                  asChild
                  className="mt-1 lg:mt-2 rounded-full bg-brand-red !px-6 !py-2 lg:!px-8 lg:!py-3 text-sm lg:text-sm font-medium text-white hover:bg-brand-red/90 h-auto"
                >
                  <Link href={href ?? "#"} onClick={handleSelect}>
                    Get Insured Now
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
