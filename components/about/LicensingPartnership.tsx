"use client";

import { useRef as useRefReact } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function LicensingPartnership() {
  const ref = useRefReact(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <section className="bg-page-bg py-12 md:py-20">
      <div className="mx-auto w-full px-4 md:px-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center gap-5 md:gap-6 text-center"
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-[40px] font-bold capitalize text-dark-text">
            Licensing And Partnership
          </h2>

          {/* Partner logos */}
          <img
            src="/images/partner-logos.svg"
            alt="Novarick licensing partnership logos"
            className="h-[40px] w-auto md:h-[50px] lg:h-[60px]"
          />

          {/* Description */}
          <p className="text-base md:text-lg lg:text-2xl font-normal text-body-text max-w-[800px] lg:max-w-[900px]">
            Kolanut Africa operates as an insurtech platform Licensed by the
            Nigerian Insurance Commission NAICOM, working in partnership with
            Cornerstone Insurance PLC. Our role is to make the journey digital,
            simple, and customer-friendly, while Cornerstone provides the
            regulated insurance products and underwriting expertise. Together,
            we offer you the best of both worlds: reliable insurance solutions
            and a modern, seamless experience.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
