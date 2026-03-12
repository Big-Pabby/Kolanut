"use client";

import { useRef as useRefReact } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function OurStory() {
  const textRef = useRefReact(null);
  const imageRef = useRefReact(null);
  const isInViewText = useInView(textRef, { once: true, margin: "-50px" });
  const isInViewImage = useInView(imageRef, { once: true, margin: "-50px" });
  const controlsText = useAnimation();
  const controlsImage = useAnimation();

  useEffect(() => {
    if (isInViewText) {
      controlsText.start("visible");
    }
  }, [isInViewText, controlsText]);

  useEffect(() => {
    if (isInViewImage) {
      controlsImage.start("visible");
    }
  }, [isInViewImage, controlsImage]);

  const textVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="bg-page-bg py-12 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Left: text */}
          <motion.div
            ref={textRef}
            variants={textVariants}
            initial="hidden"
            animate={controlsText}
            className="flex w-full flex-col gap-6 md:gap-8 lg:w-[45%]"
          >
            <h2 className="font-heading text-2xl md:text-3xl lg:text-[40px] font-bold capitalize text-brand-red">
              Our Story
            </h2>
            <div className="flex flex-col gap-[14px]">
              <p className="text-base md:text-lg leading-[26.1px] text-body-text">
                Kolanut Africa was created to solve a simple but powerful
                problem: insurance in Africa is necessary, but often difficult
                to access, understand, and claim. Many people either don't trust
                it, don't understand it, or don't know where to start.
              </p>
              <p className="text-base md:text-lg leading-[26.1px] text-body-text">
                We decided to change that.
              </p>
              <p className="text-base md:text-lg leading-[26.1px] text-body-text">
                By combining technology, clear communication, and strong
                partnerships, Kolanut Africa is redefining the insurance
                experience. From the moment you request a quote to the moment
                you need to make a claim, we are here to guide you, step by
                step.
              </p>
              <p className="text-base md:text-lg leading-[26.1px] text-body-text">
                Today, we offer Home, Motor, Travel, and Marine (Cargo)
                insurance through our digital platform, in partnership with
                Cornerstone Insurance Company, one of Nigeria's established
                insurers. Tomorrow, we aim to extend this experience across more
                products, markets, and lives.
              </p>
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            ref={imageRef}
            variants={imageVariants}
            initial="hidden"
            animate={controlsImage}
            className="w-full lg:w-[55%]"
          >
            <img
              src="/images/honor.svg"
              alt="Happy African family celebrating together"
              className=" w-full rounded-xl object-cover "
              style={{ border: "1px solid rgba(175, 6, 13, 0.20)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
