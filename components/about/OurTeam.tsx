"use client";

import { useRef as useRefReact } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect } from "react";

const teamMembers = [
  { name: "Noah Ibrahim", role: "MD/CEO" },
  { name: "Oluwaseyi Ibileke", role: "Head of Operations" },
  { name: "Mauteen Adeleke", role: "Tech Product Manager" },
  { name: "Edith Adebayo", role: "Client Relations Officer" },
];

function TeamCard({
  name,
  role,
  index,
}: {
  name: string;
  role: string;
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
        delay: index * 0.15,
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
      className="flex flex-col overflow-hidden rounded-xl border border-card-border bg-white"
    >
      {/* Placeholder image */}
      <div
        className="h-[250px] w-full rounded-t-xl md:h-[300px] lg:h-[360px]"
        style={{ backgroundColor: "#c4c4c4" }}
      />
      {/* Info */}
      <div className="flex flex-col gap-1 px-4 py-4">
        <p className="text-lg md:text-xl lg:text-2xl font-medium text-dark-text">
          {name}
        </p>
        <p className="text-sm md:text-base text-[#5b5b5b]">{role}</p>
      </div>
    </motion.div>
  );
}

export default function OurTeam() {
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
    <section className="bg-page-bg pt-12 md:pt-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-10">
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="mb-6 md:mb-10 font-heading text-2xl md:text-3xl lg:text-[40px] font-bold text-dark-text">
            Our Team
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map(({ name, role }, index) => (
            <TeamCard key={name} name={name} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
