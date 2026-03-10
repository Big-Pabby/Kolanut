"use client";

import { useRef } from "react";
import HomeInsurance from "@/src/assets/icons/home-insurance.svg";
import MarineInsurance from "@/src/assets/icons/marine-insurance.svg";
import TravelInsurance from "@/src/assets/icons/travel-insurance.svg";
import MotorInsurance from "@/src/assets/icons/motor-insurance.svg";
import FeaturesPattern from "@/src/assets/icons/features-pattern.svg";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const features = [
  {
    Icon: HomeInsurance,
    title: "Home Insurance",
    desc: "Protect your home, building, or investment property against key risks. Perfect for homeowners and others.",
  },
  {
    Icon: MarineInsurance,
    title: "Marine (Cargo) Insurance",
    desc: "Safeguard goods in transit by sea, air, or land. Ideal for importers, exporters, and logistics operators.",
  },
  {
    Icon: TravelInsurance,
    title: "Travel Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
  },
  {
    Icon: MotorInsurance,
    title: "Motor Insurance",
    desc: "Get on the road with confidence with our 3rd Party and Comprehensive Insurance covers.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
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
    <section className="relative m-2 lg:m-4 rounded-[20px] bg-[#AF060D] py-4 lg:py-16 min-h-auto lg:h-[480px]">
      {/* Decorative pattern */}
      <div className="pointer-events-none absolute inset-0">
        <FeaturesPattern
          width="100%"
          height="100%"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 lg:px-10">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 lg:mb-10 flex flex-col items-center gap-3 lg:gap-4 text-center"
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold capitalize leading-tight text-white max-w-[1248px]">
            One Platform. <br  /> Multiple Ways To Protect
            What Matters.
          </h2>
          <p className="text-base lg:text-lg text-white max-w-[1248px] px-4">
            Choose the insurance that fits your needs and get covered in
            minutes.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1  lg:-mb-16 gap-3 lg:gap-5 rounded-[20px] border border-[#FFDFDF] bg-[#FFFFFF] p-3 lg:p-5 sm:grid-cols-2"
        >
          {features.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex items-start gap-3 lg:gap-4 rounded-xl bg-white p-4 lg:p-6 border border-[#ED202429]"
            >
              <div className="flex h-[45px] w-[45px] lg:h-[57px] lg:w-[57px] shrink-0 items-center justify-center rounded-full bg-brand-red">
                <Icon
                  width={32}
                  height={32}
                  className="lg:w-10 lg:h-10"
                  style={{ color: "#fff" }}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h3 className="text-lg lg:text-xl font-semibold text-dark-text">
                  {title}
                </h3>
                <p className="text-sm lg:text-base leading-[20.8px] text-muted-text line-clamp-2 lg:line-clamp-none">
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
