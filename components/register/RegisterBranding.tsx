export default function RegisterBranding() {
  return (
    <div className="relative hidden lg:flex w-1/2 shrink-0 min-h-screen flex-col justify-center px-20 py-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.55)),url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col gap-4 max-w-[520px]">
        <h1 className="font-heading text-white text-[40px] xl:text-[54px] font-bold leading-[1.2]">
          Insurance Made Simple, Fast And Truly African
        </h1>
        <p className="text-white text-base xl:text-lg leading-7">
          Get covered from your phone or laptop—no queues, no heavy paperwork.
          Protect your home, vehicle, travels, and cargo with ease.
        </p>
      </div>
    </div>
  );
}
