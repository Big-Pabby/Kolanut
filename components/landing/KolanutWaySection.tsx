"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView, type Variants } from "framer-motion";

export default function KolanutWaySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="bg-white py-10 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-8 lg:flex-row lg:items-center"
        >
          {/* Left text */}
          <motion.div
            variants={itemVariants}
            className="flex w-full flex-col gap-6 lg:gap-10 lg:w-[45%]"
          >
            <div className="flex flex-col gap-4 lg:gap-6">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight">
                <span className="text-brand-red">The Kolanut Way</span>
                <br />
                <span className="text-dark-text">The Honorable Way</span>
              </h2>
              <p className="text-base lg:text-lg leading-[26.1px] text-body-text">
                Kolanut Africa goes further than selling policies—we provide
                clarity, support, and technology that make insurance feel less
                like a burden and more like a smart lifestyle decision.
              </p>
            </div>
            <Button className="w-fit rounded-full bg-brand-red !py-2.5 !px-6 lg:!py-3 lg:!px-8 text-sm lg:text-base font-medium text-white hover:bg-brand-red/90 h-auto">
              Get Insured Now
            </Button>
          </motion.div>

          {/* Right image */}
          <motion.div variants={imageVariants} className="w-full lg:w-[55%]">
            <img
              src="/images/umbrella.jpg"
              alt="Red umbrella standing out among grey umbrellas - The Kolanut Way"
              className="h-[280px] sm:h-[350px] lg:h-[490px] w-full rounded-xl object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
