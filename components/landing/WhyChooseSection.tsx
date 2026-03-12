"use client";

import { useRef } from "react";
import DigitalFirst from "@/src/assets/icons/digital-first.svg";
import LicensedPartner from "@/src/assets/icons/licensed-partner.svg";
import FastClaims from "@/src/assets/icons/fast-claims.svg";
import FlexiblePayments from "@/src/assets/icons/flexible-payments.svg";
import Education from "@/src/assets/icons/education.svg";
import { motion, useInView, type Variants } from "framer-motion";

const features = [
  {
    Icon: DigitalFirst,
    title: "Digital-First Experience",
    desc: "Get covered from your phone or laptop—no queues, no heavy paperwork.",
  },
  {
    Icon: LicensedPartner,
    title: "Licensed With Trusted Partner",
    desc: "We are duly Licensed by NAICOM and work with Cornerstone Insurance PLC.",
  },
  {
    Icon: FastClaims,
    title: "Fast Claims Support",
    desc: "We don't just sell policies, we guide you through the claims process when life happens.",
  },
  {
    Icon: FlexiblePayments,
    title: "Flexible Payments",
    desc: "Multiple payment options and reminders so you never miss a renewal.",
  },
];

export default function WhyChooseSection() {
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
    <section className="mx-auto max-w-[1440px] px-4 lg:px-20 pt-16 lg:pt-48 pb-10 lg:pb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-8 lg:mb-10 font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold capitalize text-dark-text"
      >
        Why People Choose <span className="text-brand-red">Kolanut Africa</span>
      </motion.h2>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col gap-8 lg:flex-row"
      >
        {/* Image */}
        <motion.div variants={itemVariants} className="w-full lg:w-[50%]">
          <img
            src="/images/about-story.png"
            alt="Red umbrella standing out among grey umbrellas"
            className="h-[250px] sm:h-[350px] lg:h-full lg:max-h-[553px] w-full rounded-xl object-cover"
          />
        </motion.div>

        {/* Feature grid */}
        <div className="flex w-full flex-col gap-3 lg:gap-4 lg:w-[50%]">
          {/* Top 2x2 grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-3 lg:gap-4 sm:grid-cols-2"
          >
            {features.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="flex flex-col p-3 lg:p-4 rounded-[12px] border border-[#F3F4F6] gap-2 lg:gap-3"
              >
                <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-[10px] bg-[#FEF2F2]">
                  <Icon width={18} height={24} style={{ color: "#af060d" }} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm lg:text-base font-semibold capitalize text-dark-text">
                    {title}
                  </h3>
                  <p className="text-xs lg:text-sm leading-[20.3px] text-body-text">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom single item */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col p-3 lg:p-4 rounded-[12px] border border-[#F3F4F6] gap-2 lg:gap-3"
          >
            <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-[10px] bg-[#FEF2F2]">
              <Education width={24} height={22} style={{ color: "#af060d" }} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm lg:text-base font-semibold capitalize text-dark-text">
                Education at the Center
              </h3>
              <p className="text-xs lg:text-sm leading-[20.3px] text-body-text">
                Our resources platform helps you understand your cover, not just
                pay for it.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
