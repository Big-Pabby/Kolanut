"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight } from "lucide-react";

export default function WalkthroughSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#FBEEEF] rounded-3xl px-8 py-8 lg:gap-16 items-center">
        <div className="flex flex-col gap-6">
          <span className="text-xs md:text-sm font-semibold tracking-[0.15em] text-brand-red uppercase">
            Watch the Walkthrough
          </span>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-dark-text leading-tight">
            See how simple it is to offer insurance to your customers.
          </h2>
          <p className="text-base text-body-text">
            Not sure how the coupon system works? Watch a quick walkthrough of
            how businesses generate coupons and how customers redeem their
            insurance benefits.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Button
              variant="outline"
              className="rounded-full bg-brand-red text-white text-sm font-medium !px-4 !py-6 hover:bg-brand-red/5"
            >
              Watch How It Works
              <PlayCircle className="w-4 h-4 mr-2" />
            </Button>

            <p className="text-sm text-body-text">
              Still got questions? Our team is happy to walk you through it.{" "}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 font-medium text-brand-red hover:underline"
              >
                Talk to Our Team
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Play walkthrough video"
          className="group relative w-full aspect-video rounded-xl overflow-hidden bg-dark-bg flex items-center justify-center"
        >
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-red text-white transition-transform group-hover:scale-105">
            <PlayCircle className="w-8 h-8" />
          </span>
        </button>
      </div>
    </section>
  );
}
