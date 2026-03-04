"use client";

import { useRef as useRefReact } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect } from "react";
import SimplicityIcon from "@/src/assets/icons/about-simplicity.svg";
import TrustIcon from "@/src/assets/icons/about-trust.svg";
import SpeedIcon from "@/src/assets/icons/about-speed.svg";
import CustomerIcon from "@/src/assets/icons/about-customer.svg";
import EducationIcon from "@/src/assets/icons/about-education.svg";
import InnovationIcon from "@/src/assets/icons/about-innovation.svg";

const values = [
  {
    Icon: SimplicityIcon,
    iconW: 25,
    iconH: 25,
    title: "Simplicity",
    desc: "We remove complexity from Insurance so people clearly understand what they're buying and how it protects them.",
  },
  {
    Icon: TrustIcon,
    iconW: 23,
    iconH: 25,
    title: "Trust",
    desc: "We operate with transparency, partnering only with reputable insurers and putting our customers' interests at the center of every decision.",
  },
  {
    Icon: SpeedIcon,
    iconW: 23,
    iconH: 25,
    title: "Speed & Efficiency",
    desc: "From quotes to claims, we leverage technology to deliver quick, seamless experiences that respect people's time.",
  },
  {
    Icon: CustomerIcon,
    iconW: 25,
    iconH: 23,
    title: "Customer First",
    desc: "Customer First: We design our products, pricing, and platforms for real people in real African markets—mobile-first, flexible, and inclusive.",
  },
  {
    Icon: EducationIcon,
    iconW: 25,
    iconH: 23,
    title: "Education & Empowerment",
    desc: "We don't just sell insurance — we explain why it matters. When people understand their options, they make better choices. Our platform is built to teach, simplify, and guide.",
  },
  {
    Icon: InnovationIcon,
    iconW: 25,
    iconH: 25,
    title: "Innovation",
    desc: "We constantly explore smarter ways to bundle, distribute, and deliver insurance so it fits modern lifestyles, businesses, and cross-border realities.",
  },
];

function ValueCard({
  Icon,
  iconW,
  iconH,
  title,
  desc,
  index,
}: {
  Icon: React.ComponentType<{
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  }>;
  iconW: number;
  iconH: number;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRefReact(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className="flex flex-col gap-3 md:gap-4 rounded-xl border border-card-border bg-white p-5 md:p-8"
    >
      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[10px] bg-[#FEF2F2]">
        <Icon width={iconW} height={iconH} style={{ color: "#af060d" }} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg md:text-xl lg:text-2xl font-medium capitalize text-dark-text">
          {title}
        </h3>
        <p className="text-sm md:text-base leading-[23.2px] text-body-text">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function CoreValues() {
  const ref = useRefReact(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const titleVariants = {
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
    <section className="py-12 md:py-20" style={{ backgroundColor: "#fdfdfd" }}>
      <div className="mx-auto max-w-[1440px] px-4 md:px-10">
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="mb-6 md:mb-10 font-heading text-2xl md:text-3xl lg:text-[40px] font-bold capitalize text-dark-text">
            Our <span className="text-brand-red">Core Values</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-5 md:gap-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values
              .slice(0, 3)
              .map(({ Icon, iconW, iconH, title, desc }, index) => (
                <ValueCard
                  key={title}
                  Icon={Icon}
                  iconW={iconW}
                  iconH={iconH}
                  title={title}
                  desc={desc}
                  index={index}
                />
              ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values
              .slice(3)
              .map(({ Icon, iconW, iconH, title, desc }, index) => (
                <ValueCard
                  key={title}
                  Icon={Icon}
                  iconW={iconW}
                  iconH={iconH}
                  title={title}
                  desc={desc}
                  index={index + 3}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
