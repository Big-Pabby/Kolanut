"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import ShieldNaicom from "@/src/assets/icons/shield-naicom.svg";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef as useRefReact } from "react";

export default function HeroSection() {
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
      className="flex w-full md:items-end items-center min-h-screen"
      style={{
        background: `linear-gradient(0deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.60) 100%), url('/images/hero-bg.jpg') center/cover no-repeat`,
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 lg:px-20 lg:pb-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* NAICOM badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex w-fit items-center gap-2 rounded-full bg-[#FFFFFF] border border-brand-red px-3 lg:px-4 py-1.5 lg:py-2 backdrop-blur-sm"
          >
            <ShieldNaicom
              width={13}
              height={15}
              className="text-brand-red"
              style={{ color: "#af060d" }}
            />
            <span className="text-xs text-brand-red whitespace-nowrap">
              Licensed by NAICOM • In Partnership with Cornerstone
            </span>
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-3 lg:gap-4">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold capitalize leading-tight text-white max-w-[774px]">
                Insurance Made Simple, Fast And Truly African
              </h1>
              <p className="text-base lg:text-xl font-normal leading-relaxed text-white max-w-[700px]">
                Get covered from your phone or laptop—no queues, no heavy
                paperwork. Protect your home, vehicle, travels, and cargo with
                ease.
              </p>
            </div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 lg:gap-6 mt-2"
            >
              <Button className="rounded-full bg-brand-red !py-2.5 !px-5 lg:!py-3 lg:!px-8 text-sm lg:text-base font-medium text-white !hover:bg-brand-red/90 h-auto">
                Get Insured Now
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white bg-transparent !py-2.5 !px-5 lg:!py-3 lg:!px-8 text-sm lg:text-base font-medium text-white !hover:bg-white/10 h-auto"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
