"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="mx-auto -mt-[50px] max-w-[1440px] px-6 md:px-12 lg:px-[70px] py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ">
        {/* Copy */}
        <div className="flex flex-col gap-6 ">
          <span className="text-xs md:text-xs font-semibold -pb-[20px] tracking-[0.15em] text-brand-red uppercase">
            Insurance Benefits, Made Simple
          </span>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-dark-text">
            Give your customers more than a <br /> product.{" "}
            <span className="text-brand-red">Gift them protection.</span>
          </h1>

          <p className="text-sm md:text-sm -mt-[10px] text-body-text max-w-xl">
            With Kolanut Africa, property developers can give every homebuyer{" "}
            <br />
            access to home and property cover through a simple digital coupon.
          </p>

          <div className="flex flex-wrap items-center gap-4 -mt-[6px]">
            <Button
              className="rounded-full bg-brand-red text-white text-sm font-medium px-6 py-6 hover:bg-brand-red/90"
              onClick={() => router.push("/coupon/generate")}
            >
              Generate a Coupon
            </Button>
            <Button
              variant="outline"
              className="rounded-full border border-brand-red bg-transparent text-brand-red text-sm font-medium px-6 py-6 hover:bg-brand-red/5"
              onClick={() => router.push("/coupon/redeem")}
            >
              Redeem a Coupon
            </Button>
          </div>

          <p className="text-sm text-body-text -mt-[6px]">
            Simple for your business. Valuable for your customers.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4E9EA]">
          <Image
            src="/images/gift-your-customers.png"
            alt="A business owner handing a customer their insurance coupon"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
