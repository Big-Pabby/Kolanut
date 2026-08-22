"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";
import DocumentDropzone from "./DocumentDropzone";
import ImageUploadTile from "./ImageUploadTile";

interface ClaimFormValues {
	policyNumber: string;
	incidentType: string;
	dateOfIncident: string;
	timeOfIncident: string;
	locationOfIncident: string;
	circumstance: string;
}

const INITIAL_VALUES: ClaimFormValues = {
	policyNumber: "",
	incidentType: "",
	dateOfIncident: "",
	timeOfIncident: "",
	locationOfIncident: "",
	circumstance: "",
};

export default function ClaimRequestSection() {
	const [values, setValues] = useState<ClaimFormValues>(INITIAL_VALUES);
	const [supportingDocument, setSupportingDocument] = useState<File | null>(
		null,
	);
	const [imageEvidence, setImageEvidence] = useState<(File | null)[]>([
		null,
		null,
		null,
		null,
	]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const updateField =
		(field: keyof ClaimFormValues) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setValues((prev) => ({ ...prev, [field]: e.target.value }));

	const updateImageEvidence = (index: number, file: File | null) => {
		setImageEvidence((prev) => {
			const next = [...prev];
			next[index] = file;
			return next;
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) =>
				formData.append(key, value),
			);
			if (supportingDocument) {
				formData.append("supportingDocument", supportingDocument);
			}
			imageEvidence.forEach((file, i) => {
				if (file) formData.append(`imageEvidence[${i}]`, file);
			});

			// Wire this up to your claims-submission endpoint.
			await fetch("/api/claims/submit", {
				method: "POST",
				body: formData,
			});

			setValues(INITIAL_VALUES);
			setSupportingDocument(null);
			setImageEvidence([null, null, null, null]);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="mx-auto rounded-2xl -ml-[-20px] -mr-[-20px] -mb-[-20px] max-w-[1440px] bg-gradient-to-br from-brand-red to-[#5c0308] px-6 md:px-12 lg:px-[100px] py-16 md:py-20">
			<div className=" p-4 md:p-6">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
					{/* Claim request form */}
					<div className="rounded-2xl bg-white p-6 md:p-8">
						<h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
							Make a claim request
						</h2>
						<p className="font-body! mt-1 text-sm text-body-text">
							Please answer the following questions so we can help process your
							claim.
						</p>

						<form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Field label="Policy Number">
									<input
										type="text"
										required
										placeholder="e.g KA-123500912"
										value={values.policyNumber}
										onChange={updateField("policyNumber")}
										className={inputClasses}
									/>
								</Field>
								<Field label="Incident type">
									<input
										type="text"
										required
										placeholder="e.g Theft, Fire, Accident"
										value={values.incidentType}
										onChange={updateField("incidentType")}
										className={inputClasses}
									/>
								</Field>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Field label="Date of Incident">
									<div className="relative">
										<input
											type="text"
											required
											placeholder="e.g 12/05/2026"
											value={values.dateOfIncident}
											onChange={updateField("dateOfIncident")}
											className={`${inputClasses} pr-9`}
										/>
										<Calendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text" />
									</div>
								</Field>
								<Field label="Time of incident">
									<div className="relative">
										<input
											type="text"
											required
											placeholder="e.g 9:00 AM"
											value={values.timeOfIncident}
											onChange={updateField("timeOfIncident")}
											className={`${inputClasses} pr-9`}
										/>
										<Clock className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text" />
									</div>
								</Field>
							</div>

							<Field label="Location of Incident">
								<input
									type="text"
									required
									placeholder="e.g Ikeja, Lagos, Nigeria"
									value={values.locationOfIncident}
									onChange={updateField("locationOfIncident")}
									className={inputClasses}
								/>
							</Field>

							<Field label="Describe the full circumstance of the incident">
								<textarea
									required
									rows={4}
									placeholder="Tell us about the incident."
									value={values.circumstance}
									onChange={updateField("circumstance")}
									className={`${inputClasses} resize-none`}
								/>
							</Field>

							<DocumentDropzone
								label="Upload supporting documents (e.g police report)"
								file={supportingDocument}
								onFileSelect={setSupportingDocument}
							/>

							<div>
								<p className="font-body! text-xs font-medium text-dark-text mb-1.5">
									Upload supporting image evidences
								</p>
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
									{imageEvidence.map((file, i) => (
										<ImageUploadTile
											key={i}
											file={file}
											onFileSelect={(f) => updateImageEvidence(i, f)}
										/>
									))}
								</div>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="font-body! mt-2 w-full rounded-full bg-brand-red text-white text-sm font-medium !py-3 hover:bg-brand-red/90 disabled:opacity-60"
							>
								{isSubmitting ? "Submitting..." : "Submit"}
							</Button>
						</form>
					</div>

					{/* Get in touch */}
					<div className="rounded-2xl bg-white p-6 md:p-8 h-fit">
						<h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
							Get in Touch
						</h2>
						<p className="font-body! mt-1 text-sm text-body-text">
							Multiple ways to reach our team
						</p>

						<div className="mt-6 flex flex-col gap-5">
							<ContactRow icon={Phone} label="Phone and whatsapp">
								+234 911 600 0658
							</ContactRow>
							<ContactRow icon={Mail} label="Email">
								support@kolanutafrica.com
							</ContactRow>
							<ContactRow icon={MapPin} label="Office Address">
								28, Daniyan Nataila Street, Lekki Phase 1, Lagos, Nigeria
								<br />
								Visit us Monday to Friday, 9AM – 5PM
							</ContactRow>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

const inputClasses =
	"font-body! w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-dark-text placeholder:text-body-text/60 focus:outline-none focus:ring-2 focus:ring-brand-red/40";

function Field({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<label className="flex flex-col gap-1.5">
			<span className="font-body! text-xs font-medium text-dark-text">
				{label}
			</span>
			{children}
		</label>
	);
}

function ContactRow({
	icon: Icon,
	label,
	children,
}: {
	icon: typeof Phone;
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex items-start gap-3">
			<span className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-red/10 shrink-0 text-brand-red">
				<Icon className="w-4 h-4" />
			</span>
			<div className="font-body! text-sm">
				<p className="font-body! text-body-text">{label}</p>
				<p className="font-body! font-medium text-dark-text">{children}</p>
			</div>
		</div>
	);
}
