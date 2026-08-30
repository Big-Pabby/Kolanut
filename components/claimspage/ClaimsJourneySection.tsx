const steps = [
  {
    number: "01",
    title: "Report your claim",
    description:
      "Share a few details about what happened. We guide you through the information we need to get started.",
  },
  {
    number: "02",
    title: "We verify the details",
    description:
      "Our team reviews the information and works with the insurer to confirm eligibility and next steps.",
  },
  {
    number: "03",
    title: "Track your progress",
    description:
      "Stay updated at every stage. You will know where your claim stands and what is needed from you.",
  },
  {
    number: "04",
    title: "Resolution & payout",
    description:
      "Once approved, the claim is resolved and your benefit is paid or fulfilled according to your cover.",
  },
];

export default function ClaimsJourneySection() {
  return (
    <section className="bg-gradient-to-b from-[#FBEEEF] to-[#FDF6F6]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          <span className="font-body! text-xs md:text-sm font-semibold tracking-[0.15em] text-brand-red uppercase">
            The Claims Journey
          </span>
          <h2 className="font-heading! mt-3 text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-text">
            A clear, four-step process to get you back on track.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-3 rounded-xl border border-card-border bg-white/70 p-6"
            >
              <span className="font-heading! text-2xl font-semibold text-brand-red/40">
                {step.number}
              </span>
              <h3 className="font-heading! text-base font-extrabold text-dark-text">
                {step.title}
              </h3>
              <p className="font-body! text-sm text-body-text">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
