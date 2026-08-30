"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BuyAndRedeemCoupon() {
  const router = useRouter();

  return (
    <section className="border-t border-[#F4D9DB]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-14 md:py-16">
        <div className="mx-auto max-w-xl flex flex-col items-center text-center gap-4">
          <span className="font-body! text-xs md:text-xs font-semibold tracking-[0.15em] text-brand-red uppercase">
            One Platform. Different Protections.
          </span>
          <h2 className="font-heading! text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-dark-text">
            Give your customers protection for what matters most.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              className="font-body! rounded-full bg-brand-red text-white text-sm font-medium !px-6 !py-6 hover:bg-brand-red/90"
              onClick={() => router.push("/coupon/generate")}
            >
              Generate a Coupon
            </Button>
            <Button
              variant="outline"
              className="font-body! rounded-full border border-brand-red bg-transparent text-brand-red text-sm font-medium !px-6 !py-6 hover:bg-brand-red/5"
              onClick={() => router.push("/coupon/redeem")}
            >
              Redeem a Coupon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
