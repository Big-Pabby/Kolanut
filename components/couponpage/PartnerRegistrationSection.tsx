"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import PartnerSuccessModal from "./PartnerSuccessModal";

const BUSINESS_TYPES = ["Property Developer"];

interface PartnerFormValues {
  fullName: string;
  businessName: string;
  businessType: string;
  email: string;
  whatsappNumber: string;
  callNumber: string;
}

const INITIAL_VALUES: PartnerFormValues = {
  fullName: "",
  businessName: "",
  businessType: "",
  email: "",
  whatsappNumber: "",
  callNumber: "",
};

export default function PartnerRegistrationSection() {
  const [values, setValues] = useState<PartnerFormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const updateField =
    (field: keyof PartnerFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Wire this up to your partner-registration endpoint.
      await fetch("/api/partners/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setValues(INITIAL_VALUES);
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="partner-registration"
      className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-16 md:py-20 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration form */}
        <div className="rounded-2xl border border-brand-red/30 bg-white p-8 md:p-10">
          <h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
            Register As A Partner
          </h2>
          <p className=" font-body! mt-2 text-sm text-body-text">
            Takes 2 minutes. We&apos;ll follow up on WhatsApp to walk you
            through the next steps.
          </p>

          <form
            onSubmit={handleSubmit}
            className="font-body! mt-6 flex flex-col gap-4"
          >
            <Field label="Your Full name">
              <input
                type="text"
                required
                placeholder="Full name"
                value={values.fullName}
                onChange={updateField("fullName")}
                className={inputClasses}
              />
            </Field>

            <Field label="Business name">
              <input
                type="text"
                required
                placeholder="e.g. Adalifas Lagos"
                value={values.businessName}
                onChange={updateField("businessName")}
                className={inputClasses}
              />
            </Field>

            <Field label="Business type">
              <select
                required
                value={values.businessType}
                onChange={updateField("businessType")}
                className={inputClasses}
              >
                <option value="" disabled>
                  What kind of business do you run?
                </option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Email Address">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={values.email}
                onChange={updateField("email")}
                className={inputClasses}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="WhatsApp Number">
                <input
                  type="tel"
                  required
                  placeholder="Enter"
                  value={values.whatsappNumber}
                  onChange={updateField("whatsappNumber")}
                  className={inputClasses}
                />
              </Field>
              <Field label="Call Number">
                <input
                  type="tel"
                  required
                  placeholder="Enter"
                  value={values.callNumber}
                  onChange={updateField("callNumber")}
                  className={inputClasses}
                />
              </Field>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full bg-brand-red text-white text-sm font-medium !py-3 hover:bg-brand-red/90 disabled:opacity-60"
            >
              {isSubmitting ? "Registering..." : "Register as a partner"}
            </Button>
          </form>
        </div>

        {/* Get in touch */}
        <div className="rounded-2xl bg-brand-red p-8 md:p-10 text-white flex flex-col gap-6">
          <div>
            <h2 className="font-heading! text-xl md:text-2xl font-semibold">
              Get in Touch
            </h2>
            <p className="font-body! mt-2 text-sm text-white/80">
              Multiple ways to reach our team
            </p>
          </div>

          <div className="font-body! flex flex-col gap-5">
            <ContactRow icon={Phone} label="Phone and whatsapp">
              +234 911 600 0658
            </ContactRow>
            <ContactRow icon={Mail} label="Email">
              support@kolanutafrica.com
            </ContactRow>
            <ContactRow icon={MapPin} label="Office Address">
              28, Daniyan Natalia Street, Lekki Phase 1, Lagos, Nigeria
              <br />
              Visit us Monday to Friday, 9AM – 5PM
            </ContactRow>
          </div>
        </div>
      </div>

      <PartnerSuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
      />
    </section>
  );
}

const inputClasses =
  "w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-dark-text placeholder:text-body-text/60 focus:outline-none focus:ring-2 focus:ring-brand-red/40";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-dark-text">{label}</span>
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
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 shrink-0">
        <Icon className="w-4 h-4" />
      </span>
      <div className="text-sm">
        <p className="text-white/70">{label}</p>
        <p className="font-medium">{children}</p>
      </div>
    </div>
  );
}
