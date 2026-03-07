import Image from "next/image";

export default function LoginBranding() {
  return (
    <div className="relative flex flex-col overflow-hidden w-1/2 shrink-0 min-h-screen bg-brand-red px-20 pt-36 pb-16">
      {/* Top decorative vector */}
      <div className="absolute top-0 left-0 w-full pointer-events-none select-none">
        <img
          src="/images/login/vector-bg.svg"
          alt=""
          aria-hidden="true"
          className="w-full object-cover"
        />
      </div>

      {/* Bottom decorative ellipse */}
      <div className="absolute bottom-0 left-0 pointer-events-none select-none">
        <img
          src="/images/login/ellipse-decoration.svg"
          alt=""
          aria-hidden="true"
          className="w-[360px] opacity-90"
        />
      </div>

      {/* Bottom blurred circle */}
      <div
        className="absolute bottom-0 right-0 w-[431px] h-[132px] rounded-full pointer-events-none"
        style={{
          background: "#ff6e72",
          filter: "blur(80px)",
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Headline + description */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              fontSize: "clamp(40px, 4.5vw, 64px)",
              fontWeight: 500,
              letterSpacing: "-1.28px",
              lineHeight: "1.25",
            }}
          >
            Understand Your Property Insurance Better
          </h1>
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "28px",
            }}
          >
            Learn the ins and outs of property insurance - from basic concepts
            to coverage types. Your journey to insurance literacy starts here.
          </p>
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-3">
          <img
            src="/images/login/avatar-stack.svg"
            alt="Happy users"
            className="h-8 w-auto"
          />
          <div className="flex flex-col gap-1">
            <span
              style={{
                fontFamily: "var(--font-jakarta), sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#f7e6e7",
              }}
            >
              Over 10k happy users
            </span>
            <img
              src="/images/login/stars.svg"
              alt="5 star rating"
              className="h-4 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
