"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ClaimsHeroSection() {
	const router = useRouter();

	return (
		<section className="mx-auto -mt-[50px] max-w-[1440px] px-6 md:px-12 lg:px-[80px] py-16 md:py-24">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
				{/* Copy */}
				<div className="flex flex-col gap-6">
					<span className="font-body! text-xs md:text-s font-semibold tracking-[0.15em] text-brand-red uppercase">
						Claims Made Simple
					</span>

					<h1 className="font-heading! text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-dark-text">
						When the <br /> unexpected happens,{" "}
						<span className="text-brand-red">we are here to help.</span>
					</h1>

					<p className="font-body! text-base md:text-lg text-body-text max-w-xl">
						Filing a claim should not be complicated. Our straightforward
						process helps you report, track, and resolve your insurance benefit
						claim with clarity and support.
					</p>

					<div className="flex flex-wrap items-center gap-4">
						<Button
							className="font-body! rounded-full bg-brand-red text-white text-sm font-medium !px-10 !py-6 hover:bg-brand-red/90"
							onClick={() => router.push("/claims/new")}
						>
							Make a Claim
						</Button>
						{/* <Button
							variant="outline"
							className="font-body! rounded-full border border-brand-red bg-transparent text-brand-red text-sm font-medium !px-6 !py-2.5 hover:bg-brand-red/5"
							onClick={() => router.push("/claims/how-it-works")}
						>
							How claims work
						</Button> */}
					</div>

					<p className="font-body! text-sm text-body-text">
						Need urgent help? Our claims team is ready to assist you.
					</p>
				</div>

				{/* Image */}
				<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4E9EA]">
					<Image
						src="/images/image-of-man.jpg"
						alt="A man on a call reviewing his claim details on a laptop"
						fill
						priority
						className="object-cover"
						sizes="(min-width: 1024px) 50vw, 100vw"
					/>
				</div>
			</div>
		</section>
	);
}
