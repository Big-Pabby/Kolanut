const steps = [
  {
    number: "01",
    title: "Generate",
    description:
      "Choose the insurance benefit you want to offer, enter your details and your customer's information, then generate a coupon.",
  },
  {
    number: "02",
    title: "Share",
    description:
      "The coupon is delivered to your customer with everything they need to redeem their benefit.",
  },
  {
    number: "03",
    title: "Redeem",
    description:
      "Your customer visits Kolanut Africa, enters the coupon, and completes the redemption process.",
  },
];

export default function StepsSection() {
  return (
    <section className="bg-[#FBEEEF]">
      <div className="mx-auto max-w-1440px px-6 md:px-12 lg:px-100px py-16 md:py-16">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-xs md:text-s font-semibold tracking-[0.15em] text-brand-red uppercase">
            Three Simple Steps
          </span>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-text">
            Gift protection in three simple steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 rounded-xl bg-white p-8"
            >
              <span className="font-heading text-3xl font-semibold text-brand-red/40">
                {step.number}
              </span>
              <h3 className="font-heading text-lg -mt-[8px] font-semibold text-dark-text">
                {step.title}
              </h3>
              <p className="text-sm text-body-text">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-heading text-base font-bold md:text-xl text-dark-text">
            You issue the cover. They redeem it.{" "}
            <span className="font-heading text-base md:text-lg font-Extrabold text-brand-red">
              We handle the rest.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
