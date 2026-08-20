import Image from "next/image";

export default function LoginBranding() {
  return (
    <div className="relative hidden lg:flex lg:flex-col overflow-hidden w-full lg:w-1/2 shrink-0 min-h-screen px-8 lg:px-20 pt-36 pb-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.55)),url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
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
            Insurance made simple,fast and truly African
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
            Get covered from your phone or laptop—no queues, no heavy paperwork.
            Protect your home, vehicle, travels, and cargo with ease.
          </p>
        </div>
      </div>
    </div>
  );
}
