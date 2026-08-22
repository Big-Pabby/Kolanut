"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ClaimsCtaSection() {
	const router = useRouter();

	return (
		<section className="bg-dark-bg">
			<div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-14 md:py-20 flex flex-col items-center text-center gap-6">
				<span className="font-body! text-xs md:text-sm font-semibold tracking-[0.15em] text-brand-red uppercase">
					Make a Claim
				</span>
				<h2 className="font-heading! max-w-2xl text-2xl md:text-3xl font-semibold text-white leading-tight">
					Be assured that we are committed to ensuring that the Claims Request
					process is stress-free and seamless.
				</h2>
				<Button
					className="font-body! rounded-full bg-brand-red text-white text-sm font-medium !px-6 !py-2.5 hover:bg-brand-red/90"
					onClick={() => router.push("/claims/new")}
				>
					Start your claim Process
					<ArrowRight className="w-4 h-4 ml-2" />
				</Button>
			</div>
		</section>
	);
}
