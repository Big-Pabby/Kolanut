"use client";

import { useRef as useRefReact } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { image } from "framer-motion/client";

const teamMembers = [
  { name: "Noah Ibrahim", role: "Chief Executive Officer", image: "/images/team/ceo.png" },
  { name: "Collins Oforgu", role: "Chief Of Operations", image: "/images/team/collins.png" },
  { name: "Mauteen Adeleke", role: "Technology Officer", image: "/images/team/mauteen.png" },
  { name: "Edith Adebayo", role: "Client Relations Officer", image: "/images/team/edith.png" },
];

function TeamCard({
  name,
  role,
  image,
  index,
}: {
  name: string;
  role: string;
  index: number;
  image: string;
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
      className="flex flex-col overflow-hidden "
    >
      {/* Placeholder image */}
      <div
        className="h-[250px] md:h-[300px] overflow-hidden w-full rounded-[16px]  "
        style={{ backgroundColor: "#c4c4c4" }}
      >
        {image && (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {/* Info */}
      <div className="flex flex-col gap-1 px-4 py-4 text-center">
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
    <section id="team" className="bg-page-bg pt-12 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-20">
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
          {teamMembers.map(({ name, role, image }, index) => (
            <TeamCard key={name} name={name} role={role} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
