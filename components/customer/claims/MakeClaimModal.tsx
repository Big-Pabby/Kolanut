"use client";

import { useRef, useState } from "react";
import { Clock, UploadCloud } from "lucide-react";
import CongratulationsIcon from "@/src/assets/icons/congratulations.svg";

interface MakeClaimModalProps {
  open: boolean;
  onClose: () => void;
}

const labelClass = "text-sm font-medium text-[#374151]";
const inputClass =
  "h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#9ca3af] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white";

interface FormState {
  policyNumber: string;
  incidentType: string;
  dateOfIncident: string;
  timeOfIncident: string;
  location: string;
  description: string;
}

const emptyForm: FormState = {
  policyNumber: "",
  incidentType: "",
  dateOfIncident: "",
  timeOfIncident: "",
  location: "",
  description: "",
};

export default function MakeClaimModal({ open, onClose }: MakeClaimModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [documentName, setDocumentName] = useState<string | null>(null);
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [submitted, setSubmitted] = useState(false);

  const docInputRef = useRef<HTMLInputElement>(null);
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!open) return null;

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const reset = () => {
    setForm(emptyForm);
    setDocumentName(null);
    setImages([null, null, null, null]);
    setSubmitted(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleImagePick = (index: number, name: string) =>
    setImages((prev) => prev.map((v, i) => (i === index ? name : v)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex w-full max-w-[720px] max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {submitted ? (
          /* ── Success ── */
          <div className="flex flex-col items-center gap-6 overflow-y-auto p-6 md:p-8 text-center">
            <CongratulationsIcon
              width={180}
              height={150}
              style={{ color: "#af060d" }}
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-[#161616]">
                Your claim request has been submitted successfully
              </h2>
              <p className="text-sm text-[#4b5563] max-w-[440px]">
                Our team has received your details and will review them shortly.
                We will reach out to you within one business day to guide you
                through the next steps.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full max-w-[440px] rounded-full bg-brand-red py-3 text-sm font-medium text-white hover:bg-brand-red/90 transition-colors"
            >
              Got it
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="flex min-h-0 flex-col">
            {/* Header (pinned) */}
            <div className="flex flex-col gap-1 shrink-0 p-6 md:p-8 pb-4">
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Make a claim request
              </h2>
              <p className="text-sm text-[#6b7280]">
                Please answer the following questions so we can help process
                your claim
              </p>
            </div>

            {/* Scrollable body */}
            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 md:px-8 pb-4">
              {/* Policy Number + Incident type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Policy Number</label>
                <input
                  className={inputClass}
                  placeholder="e.g KA-123500912"
                  value={form.policyNumber}
                  onChange={(e) => update("policyNumber", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Incident type</label>
                <input
                  className={inputClass}
                  placeholder="e.g Theft, Accident, Fire"
                  value={form.incidentType}
                  onChange={(e) => update("incidentType", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Date of Incident</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.dateOfIncident}
                  onChange={(e) => update("dateOfIncident", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Time of incident</label>
                <div className="relative">
                  <input
                    type="time"
                    className={inputClass}
                    value={form.timeOfIncident}
                    onChange={(e) => update("timeOfIncident", e.target.value)}
                    required
                  />
                  <Clock className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Location of incident</label>
              <input
                className={inputClass}
                placeholder="e.g Ikeja, Lagos, Nigeria"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Describe the full circumstance of the incident
              </label>
              <textarea
                rows={4}
                className="w-full rounded-[10px] border border-[#d1d5db] px-3 py-3 text-sm text-[#161616] placeholder:text-[#9ca3af] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white resize-none"
                placeholder="Tell us about the incident."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                required
              />
            </div>

            {/* Supporting documents */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Upload supporting documents{" "}
                <span className="text-[#9ca3af] font-normal">
                  (e.g police report)
                </span>
              </label>
              <input
                ref={docInputRef}
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                className="hidden"
                onChange={(e) =>
                  setDocumentName(e.target.files?.[0]?.name ?? null)
                }
              />
              <button
                type="button"
                onClick={() => docInputRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-[10px] border border-dashed border-[#d1d5db] bg-white px-4 py-4 text-sm text-[#4b5563] hover:border-brand-red transition-colors"
              >
                <UploadCloud className="w-5 h-5 text-gray-400" />
                {documentName ? (
                  <span className="text-[#161616] font-medium">
                    {documentName}
                  </span>
                ) : (
                  <span>
                    Drag &amp; drop file here or{" "}
                    <span className="text-[#2563eb] font-medium">
                      choose file
                    </span>
                  </span>
                )}
              </button>
            </div>

            {/* Image evidences */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Upload supporting image evidences
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((name, index) => (
                  <div key={index}>
                    <input
                      ref={(el) => {
                        imageRefs.current[index] = el;
                      }}
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      onChange={(e) =>
                        handleImagePick(index, e.target.files?.[0]?.name ?? "")
                      }
                    />
                    <button
                      type="button"
                      onClick={() => imageRefs.current[index]?.click()}
                      className="flex w-full flex-col items-center justify-center gap-1.5 rounded-[10px] border border-dashed border-[#d1d5db] bg-[#fafafa] px-2 py-5 hover:border-brand-red transition-colors"
                    >
                      <UploadCloud className="w-5 h-5 text-gray-400" />
                      <span className="text-xs font-medium text-brand-red">
                        {name ? "Uploaded" : "Click to upload"}
                      </span>
                      <span className="text-[10px] text-[#9ca3af]">
                        PNG, JPG (max.3MB)
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            </div>

            {/* Actions (pinned) */}
            <div className="grid grid-cols-2 gap-4 shrink-0 border-t border-[#F3F4F6] p-6 md:p-8 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-brand-red py-3 text-sm font-medium text-brand-red hover:bg-red-50 transition-colors"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="rounded-full bg-brand-red py-3 text-sm font-medium text-white hover:bg-brand-red/90 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
