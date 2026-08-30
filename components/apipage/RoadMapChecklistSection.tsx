const checkoutCategories = [
  {
    title: "Real Estate & PropTech",
    description:
      "Home insurance offered at property listing or at the point of purchase.",
  },
  {
    title: "E-commerce & Retail",
    description:
      "Device and buyer-protection cover added as a checkout line item.",
  },
  {
    title: "Ride-hailing & Mobility",
    description: "Trip and passenger cover embedded at the point of booking.",
  },
  {
    title: "Logistics & Delivery",
    description: "Shipment and cargo insurance at the point of dispatch.",
  },
  {
    title: "Fintech & Lending",
    description: "Credit-life cover embedded directly into loan disbursement.",
  },
  {
    title: "Travel & Ticketing",
    description:
      "Trip insurance offered alongside flight or bus ticket purchase.",
  },
];

export default function RoadmapChecklistSection() {
  return (
    <section className="bg-[#F7F1EE]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          <span className="font-body! text-xs md:text-sm font-semibold tracking-[0.15em] text-brand-red uppercase">
            Roadmap
          </span>
          <h2 className="font-heading! mt-3 text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-text">
            Six checkouts we&apos;re building for.
          </h2>
          <p className="font-body! mt-3 text-base text-body-text">
            Each of these is a platform category already running transactions at
            scale in Nigeria. Insurance is the missing line item at checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {checkoutCategories.map((category) => (
            <div
              key={category.title}
              className="flex flex-col gap-2 rounded-xl bg-white p-6"
            >
              <h3 className="font-heading! text-base font-semibold text-dark-text">
                {category.title}
              </h3>
              <p className="font-body! text-sm text-body-text">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
