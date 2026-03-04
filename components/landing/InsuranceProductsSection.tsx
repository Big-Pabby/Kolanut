"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import HomeProduct from "@/src/assets/icons/home-product.svg";
import MarineProduct from "@/src/assets/icons/marine-product.svg";
import TravelProduct from "@/src/assets/icons/travel-product.svg";
import MotorProduct from "@/src/assets/icons/motor-product.svg";
import { motion, useInView, type Variants } from "framer-motion";

const products = [
  {
    Icon: HomeProduct,
    title: "Home Insurance",
    desc: "Protect your home, building, or investment property against key risks. Perfect for homeowners, renters, and real estate developers.",
  },
  {
    Icon: MarineProduct,
    title: "Marine (Cargo) Insurance",
    desc: "Safeguard goods in transit by sea, air, or land. Ideal for importers, exporters, and logistics operators.",
  },
  {
    Icon: TravelProduct,
    title: "Travel Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
  },
  {
    Icon: MotorProduct,
    title: "Motor Insurance",
    desc: "Get on the road with confidence with our 3rd Party and Comprehensive Insurance covers. Quick quotes, instant e-policies, and support when accidents happen.",
  },
];

export default function InsuranceProductsSection() {
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
    <section className="bg-[#FFFAFA] py-10 lg:py-20 px-4 lg:px-20">
      <div className="mx-auto md:w-9/12">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 lg:mb-12 flex flex-col items-center gap-1 text-center"
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold text-dark-text">
            Choose Your Insurance Product
          </h2>
          <p className="text-base lg:text-lg text-body-text px-4">
            Choose the insurance that fits your needs and get covered in
            minutes.
          </p>
        </motion.div>

        {/* Products grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3 lg:gap-0"
        >
          <div className="grid grid-cols-1 gap-3 lg:gap-4 sm:grid-cols-2">
            {products.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="flex flex-col items-center gap-3 lg:gap-4 border border-card-border bg-[#FFFFFF] py-4 lg:py-6 px-3 lg:px-4 text-center rounded-xl lg:rounded-2xl"
              >
                <Icon width={50} height={50} style={{ color: "#af060d" }} />
                <div className="flex flex-col gap-1.5 lg:gap-2">
                  <h3 className="text-base lg:text-lg font-semibold text-dark-text">
                    {title}
                  </h3>
                  <p className="text-xs lg:text-sm leading-[20.3px] text-product-card-text line-clamp-2 lg:line-clamp-none">
                    {desc}
                  </p>
                </div>
                <Button className="mt-1 lg:mt-2 rounded-full bg-brand-red !px-6 !py-2 lg:!px-8 lg:!py-3 text-sm lg:text-sm font-medium text-white hover:bg-brand-red/90 h-auto">
                  Get Insured Now
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
