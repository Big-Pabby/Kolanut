"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import FamilyInsuranceIcon from "@/src/assets/icons/family-insurance.svg";
import MotorCategoryIcon from "@/src/assets/icons/motor-category.svg";
import PropertyCategoryIcon from "@/src/assets/icons/property-category.svg";

const categories = [
  {
    label: "Home & Property Insurance",
    Icon: PropertyCategoryIcon,
    href: "/home-and-property-insurance",
  },
  {
    label: "Motor Insurance",
    Icon: MotorCategoryIcon,
    href: "/motor-insurance",
  },
  {
    label: "Life & Family Insurance",
    Icon: FamilyInsuranceIcon,
    href: "/life-and-family-insurance",
  },
];

export default function OtherInsuranceCategories() {
  const pathname = usePathname();

  return (
    <section className="bg-[#fffafa] py-10 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading text-2xl lg:text-[28px] font-bold text-dark-text mb-8 lg:mb-10 capitalize"
        >
          Other Insurance Categories To Explore
        </motion.h2>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {categories.map(({ label, Icon, href }, index) => {
            const active = pathname === href;
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Link
                  href={href}
                  aria-label={label}
                  className={`flex flex-col items-center gap-4 lg:gap-6 py-6 px-3 border rounded-[12px] transition-all duration-200 group
                  ${
                    active
                      ? "border-brand-red bg-white shadow-sm"
                      : "border-gray-200 bg-white hover:border-brand-red hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-center w-[60px] h-[60px]">
                    <Icon
                      width={60}
                      height={60}
                      style={{ color: "#af060d" }}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`font-body text-sm lg:text-[16px] font-semibold text-center leading-snug transition-colors
                    ${active ? "text-brand-red" : "text-dark-text group-hover:text-brand-red"}`}
                  >
                    {label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
