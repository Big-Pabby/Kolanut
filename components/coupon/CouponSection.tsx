"use client";

import { Button } from "@/components/ui/button";
import CouponIcon from "@/src/assets/icons/coupon-icon.svg";

const cards = [
  {
    title: "Generate Coupon Code",
    description:
      "Generate a unique coupon code by purchasing an insurance premium on behalf of someone else.",
    buttonLabel: "Generate Coupon",
  },
  {
    title: "Redeem Coupon Code",
    description:
      "Use the coupon code you received to activate the premium level of coverage on your insurance plan.",
    buttonLabel: "Redeem Coupon",
  },
];

export default function CouponSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-4 rounded-xl border border-card-border bg-white p-8 md:p-10"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-[10px] p-2.5 bg-[#FEF2F2] flex items-center justify-center">
              <CouponIcon
                width={26}
                height={20}
                style={{ color: "#af060d" }}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl md:text-2xl font-semibold text-dark-text capitalize">
                {card.title}
              </h2>
              <p className="text-sm text-body-text">
                {card.description}
              </p>
            </div>

            {/* Button */}
            <div>
              <Button
                className="rounded-full bg-brand-red text-white text-sm font-medium !px-5 !py-2 hover:bg-brand-red/90"
                
              >
                {card.buttonLabel}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
