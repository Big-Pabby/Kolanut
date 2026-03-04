"use client";

import { useRef as useRefReact } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect } from "react";
import MissionIcon from "@/src/assets/icons/about-mission.svg";
import VisionIcon from "@/src/assets/icons/about-vision.svg";

const cards = [
  {
    Icon: MissionIcon,
    title: "Our Mission",
    desc: "To simplify access to insurance for individuals and businesses in Africa through technology, education, and customer-first service, making it easy to buy, manage, and claim insurance anytime, anywhere.",
  },
  {
    Icon: VisionIcon,
    title: "Our Vision",
    desc: "To become Africa's most trusted insurtech platform, driving a new culture of protection where insurance is understood, accessible, and embraced as a way of life.",
  },
];

function VisionCard({
  Icon,
  title,
  desc,
  index,
}: {
  Icon: React.ComponentType<{
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  }>;
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
        delay: index * 0.2,
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
      className="flex flex-col gap-3 rounded-xl border border-card-border bg-white p-6 md:p-8"
    >
      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[10px] bg-[#FEF2F2]">
        <Icon width={25} height={25} style={{ color: "#af060d" }} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl md:text-2xl font-medium text-dark-text">
          {title}
        </h3>
        <p className="text-sm md:text-base leading-[23.2px] text-body-text">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function MissionVision() {
  return (
    <section className="bg-[#FFFAFA] py-12 md:py-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-10">
        <div className="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2">
          {cards.map(({ Icon, title, desc }, index) => (
            <VisionCard
              key={title}
              Icon={Icon}
              title={title}
              desc={desc}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
