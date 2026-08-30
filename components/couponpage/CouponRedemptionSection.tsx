"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CouponRedemptionSection() {
  const router = useRouter();

  return (
    <section className="bg-[#FBEEEF]">
      <div className="mx-auto max-w-1440px px-6 md:px-12 lg:px-100px py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 md:p-8 text-center flex flex-col items-center gap-4">
          <span className="text-xs md:text-s font-semibold tracking-[0.15em] text-brand-red uppercase">
            Received a Kolanut Africa Coupon?
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-dark-text">
            Your home & property cover is waiting.
          </h2>
          <p className="text-base text-body-text">
            If a developer has given you a Kolanut Africa coupon, <br /> you can
            redeem it online and activate cover for your new home & property.{" "}
            <br />
            Your coupon gives you access to home and property insurance
            protection
          </p>
          <Button
            className="rounded-full bg-brand-red text-white mb-2 text-sm font-medium px-8 py-6 hover:bg-brand-red/90"
            onClick={() => router.push("/coupon/redeem")}
          >
            Redeem my coupon
          </Button>
        </div>
      </div>
    </section>
  );
}
