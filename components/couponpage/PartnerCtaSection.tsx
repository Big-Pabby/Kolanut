"use client";

import { Button } from "@/components/ui/button";

export default function PartnerCtaSection() {
  const scrollToPartnerForm = () => {
    document
      .getElementById("partner-registration")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-dark-bg">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-xs md:text-s font-semibold tracking-[0.15em] text-[#DEAE62] uppercase">
              For Businesses &amp; Partners
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight">
              Turn every transaction into an opportunity to add <br /> more
              value.
            </h2>
            <div>
              <Button
                className="rounded-full bg-brand-red text-white text-sm font-medium !px-6 !py-6 hover:bg-brand-red/90"
                onClick={scrollToPartnerForm}
              >
                Become a partner
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-base text-white/80">
              Give your customers more than what they came to buy. With Kolanut
              Africa, you can offer your customers an insurance benefit
              alongside your products or services — helping you create a better
              customer experience while giving your customers protection that
              matters.
            </p>
            <p className="text-base text-white/80">
              Whether you&apos;re a property developer, auto business, retailer,
              service provider, or another customer-facing business, you can use
              Kolanut Africa to offer relevant insurance benefits to your
              customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
