"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

interface PartnerFormValues {
  fullName: string;
  email: string;
  whatsappNumber: string;
  callNumber: string;
}

const INITIAL_VALUES: PartnerFormValues = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  callNumber: "",
};

export default function ApiPartnerRegistrationSection() {
  const [values, setValues] = useState<PartnerFormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField =
    (field: keyof PartnerFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Wire this up to your API-partner registration endpoint.
      await fetch("/api/partners/api-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setValues(INITIAL_VALUES);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-brand-red to-[#5c0308]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[100px] py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          {/* Registration form */}
          <div className="rounded-2xl bg-white p-6 md:p-8">
            <h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
              Register As A Partner
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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

              <Field label="Email Address">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
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
                className="font-body! mt-2 w-full rounded-full bg-brand-red text-white text-sm font-medium !py-3 hover:bg-brand-red/90 disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Registering..."
                ) : (
                  <>
                    Register as a partner
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
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
