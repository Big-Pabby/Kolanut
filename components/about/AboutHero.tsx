"use client";

import { useEffect, useRef as useRefReact } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function AboutHero() {
  const ref = useRefReact(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="flex min-h-[400px] w-full items-end md:min-h-[500px]"
      style={{
        background: `linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 100%), url('/images/umbrella.jpg') center/cover no-repeat`,
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-24 md:px-10 md:pb-20 md:pt-32">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="flex flex-col gap-3 md:gap-4">
            <motion.h1
              variants={itemVariants}
              className="font-heading text-3xl md:text-4xl lg:text-[60px] font-bold capitalize leading-tight text-white"
            >
              Beyond Coverage
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg lg:text-xl font-normal text-white max-w-[600px] md:max-w-[700px] lg:max-w-[860px]"
            >
              The insurtech platform built to make insurance work for everyday
              Africans
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
