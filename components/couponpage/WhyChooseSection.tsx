import { Sparkles, ShieldCheck, Gem, Link2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const benefits: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
}[] = [
  {
    icon: Sparkles,
    eyebrow: "Stand out",
    title: "Offer something extra.",
    description:
      "Give customers a benefit that goes beyond what the product or service they're purchasing.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Build trust",
    title: "Show your customers you care.",
    description:
      "Protection adds another layer of value to the relationship you're building with your customers.",
  },
  {
    icon: Gem,
    eyebrow: "Create more value",
    title: "Make every purchase count.",
    description:
      "Turn a simple transaction into a more complete customer experience.",
  },
  {
    icon: Link2,
    eyebrow: "Stay connected",
    title: "Keep the relationship going.",
    description:
      "Give customers another reason to engage with your business even after the transaction is complete.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-[#F7F1EE]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-16 md:py-20">
        <div className="flex flex-col items-center text-center gap-3 mb-12 max-w-2xl mx-auto">
          <span className="text-xs md:text-sm font-semibold tracking-[0.15em] text-brand-red uppercase">
            More Than a Transaction
          </span>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-dark-text">
            Gift customers a reason to <br /> choose you and remember you.
          </h2>
          <p className="text-base text-body-text">
            Insurance can be more than a policy. It can be a meaningful benefit
            that strengthens your relationship with your customers.
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map(({ icon: Icon, eyebrow, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-xl border border-card-border bg-white p-8"
            >
              <div className="w-10 h-10 rounded-[10px] p-2 bg-[#FEF2F2] flex items-center justify-center text-brand-red">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                {eyebrow}
              </span>
              <h3 className="font-heading text-lg font-semibold text-dark-text">
                {title}
              </h3>
              <p className="text-sm text-body-text">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
