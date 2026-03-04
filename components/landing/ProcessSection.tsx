"use client";

import { useRef } from "react";
import ProcessTell from "@/src/assets/icons/process-tell.svg";
import ProcessFill from "@/src/assets/icons/process-fill.svg";
import ProcessQuote from "@/src/assets/icons/process-quote.svg";
import ProcessPolicy from "@/src/assets/icons/process-policy.svg";
import { motion, useInView, type Variants } from "framer-motion";

const steps = [
  {
    number: "1.",
    Icon: ProcessTell,
    title: "Tell Us What You Want To Insure",
    desc: "Choose from Home, Motor, Travel, or Marine insurance.",
  },
  {
    number: "2.",
    Icon: ProcessFill,
    title: "Fill In Some Information",
    desc: "Answer a few quick questions about what you're protecting.",
  },
  {
    number: "3.",
    Icon: ProcessQuote,
    title: "Get A Quote And Pay Premium",
    desc: "Receive an instant quote and pay securely online.",
  },
  {
    number: "4.",
    Icon: ProcessPolicy,
    title: "Get Your Insurance Policy",
    desc: "Receive your policy document instantly via email.",
  },
];

export default function ProcessSection() {
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
          className="mb-8 lg:mb-12 flex flex-col items-center gap-2 text-center"
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold text-dark-text">
            The Kolanut{" "}
            <span className="text-brand-red">4-Step Process</span>
          </h2>
          <p className="text-base lg:text-lg text-body-text px-4">
            Getting insured has never been easier. Follow these simple steps.
          </p>
        </motion.div>

        {/* Steps container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map(({ number, Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex flex-col items-center gap-4 px-4 lg:px-6 py-5 lg:py-7 border border-card-border rounded-xl lg:rounded-2xl text-center"
            >
              {/* Icon — no circle bg, matches Figma */}
              <Icon
                width={24}
                height={24}
                className="lg:w-7 lg:h-7 shrink-0"
                style={{ color: "#af060d" }}
              />
              <div className="flex flex-col gap-1.5 lg:gap-2">
                <h3 className="text-sm lg:text-base font-semibold text-dark-text">
                  {number} {title}
                </h3>
                <p className="text-xs lg:text-sm leading-[20.3px] text-body-text">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
