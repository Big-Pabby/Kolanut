"use client";

import { useRef } from "react";
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
        delayChildren: 0.1,
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
          className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10"
        >
          {/* Left text */}
          <motion.div
            variants={itemVariants}
            className="flex w-full flex-col gap-2 lg:gap-2 lg:w-[40%]"
          >
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold capitalize leading-tight text-dark-text">
              Never Miss A Payment
            </h2>
            <p className="text-base lg:text-lg text-body-text">
              Dummy Text here
            </p>
          </motion.div>

          {/* Right image */}
          <motion.div
            variants={imageVariants}
            className="w-full lg:w-[60%]"
          >
            <img
              src="/images/umbrella.jpg"
              alt="Red umbrella standing out among grey umbrellas"
              className="h-[280px] sm:h-[380px] lg:h-[490px] w-full rounded-xl object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
