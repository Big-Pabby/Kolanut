const comparisonRows = [
  {
    coupon: "Developer-initiated, at property sale",
    api: "Partner-initiated, at any checkout",
  },
  {
    coupon: "Redeemed on Kolanut's platform",
    api: "Bound inside the partner's own app",
  },
  {
    coupon: "Leadway underwrites",
    api: "Leadway underwrites",
  },
];

export default function RailsComparisonSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Copy */}
        <div className="flex flex-col gap-4">
          <span className="font-body! text-xs md:text-sm font-semibold tracking-[0.15em] text-brand-red uppercase">
            Same Rails, Every Channel
          </span>
          <h2 className="font-heading! text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-text leading-tight">
            Distribution changes. Underwriting doesn&apos;t.
          </h2>
          <p className="font-body! text-base text-body-text">
            Whether a policy starts with a Coupon redemption or an API call, it
            moves through the same KYC, the same underwriting desk, and the same
            claims process at Leadway. Kolanut never carries risk and never
            holds client premium.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-xl border-4 border-card-border overflow-hidden">
          <div className="grid grid-cols-2 border-4 border-card-border">
            <span className="font-body! px-5 py-3 text-xs font-semibold tracking-wide  text-dark-text uppercase">
              Coupon
            </span>
            <span className="font-body! px-5 py-3 text-xs font-semibold tracking-wide bg-[#FBEEEF] text-brand-red uppercase">
              API
            </span>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.coupon}
              className={`grid grid-cols-2 ${
                i !== comparisonRows.length - 2
                  ? "border-b border-card-border"
                  : ""
              }`}
            >
              <p className="font-body! px-5 py-4 text-sm text-body-text border-r border-card-border">
                {row.coupon}
              </p>
              <p className="font-body! px-5 py-4 text-sm text-dark-text bg-[#FBEEEF] font-medium">
                {row.api}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
