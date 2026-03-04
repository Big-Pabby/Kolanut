"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

import Facebook from "@/src/assets/icons/facebook.svg";
import Instagram from "@/src/assets/icons/instagram.svg";
import Twitter from "@/src/assets/icons/twitter.svg";
import Telegram from "@/src/assets/icons/telegram.svg";
import Copyright from "@/src/assets/icons/copyright.svg";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";

const footerLinks = {
  kolanutAfrica: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
  ],
  insurance: [
    { label: "Marine (cargo) Insurance", href: "#" },
    { label: "Travel Insurance", href: "#" },
    { label: "Home Insurance", href: "#" },
    { label: "Motor Insurance", href: "#" },
  ],
  quickLinks: [
    { label: "Help & Support", href: "#" },
    { label: "Resources", href: "#" },
    { label: "Claims", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

const socials = [
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Telegram, label: "Telegram", href: "#" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
    hidden: { opacity: 0, y: 20 },
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
    <footer className="bg-brand-red py-10 lg:py-16">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-[1440px] px-4 lg:px-20"
      >
        {/* Main grid */}
        <motion.div
          variants={itemVariants}
          className="mb-8 lg:mb-12 flex flex-col gap-8 lg:flex-row lg:gap-16"
        >
          {/* Brand column */}
          <div className="flex w-full flex-col gap-4 lg:gap-6 lg:w-[30%]">
            <div className="flex flex-col gap-3 lg:gap-4">
              <Image
                alt="logo"
                width={100}
                height={40}
                src={"/images/LogoFooter.svg"}
                className="lg:w-[123px] lg:h-[50px]"
              />

              <p className="text-sm lg:text-base leading-6 text-white">
                Insurance made simple, fast and truly African. Licensed by
                NAICOM, in partnership with Cornerstone Insurance PLC.
              </p>
            </div>
            <Button className="w-fit rounded-full border-white bg-white !px-5 !py-2.5 lg:!px-6 lg:!py-4 text-sm lg:text-base font-medium text-brand-red hover:bg-white/10">
              Learn More
            </Button>
          </div>

          {/* Links columns */}
          <div className="flex flex-1 flex-wrap gap-6 lg:gap-10 lg:justify-around">
            {/* Kolanut Africa */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2 lg:gap-3"
            >
              <h4 className="text-base lg:text-lg font-medium text-white">
                Kolanut Africa
              </h4>
              <div className="flex flex-col gap-2 lg:gap-4">
                {footerLinks.kolanutAfrica.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm lg:text-base text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Insurance */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2 lg:gap-3"
            >
              <h4 className="text-base lg:text-lg font-medium text-white">
                Insurance
              </h4>
              <div className="flex flex-col gap-2 lg:gap-4">
                {footerLinks.insurance.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm lg:text-base text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2 lg:gap-3"
            >
              <h4 className="text-base lg:text-lg font-medium text-white">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2 lg:gap-4">
                {footerLinks.quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm lg:text-base text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 lg:gap-4"
        >
          {/* Social icons */}
          <div className="flex items-center gap-4 lg:gap-6">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-white hover:bg-white/30 transition-colors"
              >
                <Icon width={16} height={16} style={{ color: "#AF060D" }} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-1 lg:mt-2 w-full border-t border-white" />

          {/* Copyright */}
          <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-base text-white">
            <Copyright width={18} height={18} style={{ color: "#ffffff" }} />
            <span>2024</span>
            <span className="hidden sm:inline">
              All rights reserved to Kolanut Africa
            </span>
            <span className="sm:hidden">Kolanut Africa</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
