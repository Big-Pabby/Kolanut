"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section
      className="relative flex items-end w-full min-h-[400px] lg:min-h-[500px]"
      style={{
        background: `linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.40) 100%), url('/images/calculator.jpg') center/cover no-repeat`,
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 lg:px-20 lg:pb-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-3 lg:gap-4 max-w-[760px]"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold capitalize leading-tight text-white"
          >
            Get A Quote In Minutes
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base lg:text-xl font-normal leading-7 text-white max-w-[640px]"
          >
            Choose what you want to insure, answer a few questions, and receive
            a personalized quote through our digital platform.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
