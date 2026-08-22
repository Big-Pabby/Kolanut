"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const protectionTypes = [
	{
		title: "Protect their home. Protect their investment.",
		description:
			"Give customers access to protection for their homes and properties against eligible risks.",
		linkLabel: "Explore Home & Property Insurance",
		href: "home-and-property-insurance",
		image: "/images/tenant.png",
		alt: "A man standing in front of a house",
	},
	{
		title: "Keep them moving with confidence.",
		description:
			"Give customers an insurance benefit that helps protect their vehicle and keep them on the road.",
		linkLabel: "Explore Motor Insurance",
		href: "motor-insurance",
		image: "/images/comprehensive.png",
		alt: "A man driving a car",
	},
	{
		title: "Protection that goes beyond today.",
		description:
			"Give customers and their loved ones an added layer of life protection when it matters most.",
		linkLabel: "Explore Life & Family Insurance",
		href: "life-and-family-insurance",
		image: "/images/term-life.png",
		alt: "A family sitting together at home",
	},
];

export default function ProtectionTypesSection() {
	return (
		<section className="mx-auto max-w-1440px px-6 md:px-12 lg:px-100px py-16 md:py-20">
			<div className="max-w-2xl mb-12">
				<span className="text-xs md:text-s font-semibold tracking-[0.15em] text-brand-red uppercase">
					One Platform, Multiple Protections
				</span>
				<h2 className="font-heading mt-3 text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-text">
					Give your customers protection for what matters most.
				</h2>
				<p className="mt-4 text-base text-body-text">
					From their home and vehicle to their life and family, give your
					customers an insurance benefit they can actually use.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{protectionTypes.map((item) => (
					<div key={item.title} className="font-heading flex flex-col gap-4">
						<div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-[#F4E9EA]">
							<Image
								src={item.image}
								alt={item.alt}
								fill
								className="object-cover"
								sizes="(min-width: 768px) 33vw, 100vw"
							/>
						</div>
						<h3 className="text-lg font-semibold text-dark-text">
							{item.title}
						</h3>
						<p className="text-sm text-body-text">{item.description}</p>
						<Link
							href={item.href}
							className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:underline"
						>
							{item.linkLabel}
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}
