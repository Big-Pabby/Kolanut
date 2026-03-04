"use client";

export default function HeroSection() {
  return (
    <section
      className="w-full flex items-end min-h-[340px] lg:min-h-[462px]"
      style={{
        background: `linear-gradient(0deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.25) 100%), url('/images/home-insurance-hero.png') center/cover no-repeat`,
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-20 pb-10 lg:pb-16 pt-24 lg:pt-32">
        <h1 className="font-heading text-4xl lg:text-[60px] font-bold capitalize leading-tight text-white mb-3 lg:mb-4">
          Home Insurance
        </h1>
        <p className="text-base lg:text-xl font-normal text-white max-w-[700px]">
          Follow the 4-step Kolanut process to get insured and receive your policy instantly.
        </p>
      </div>
    </section>
  );
}
