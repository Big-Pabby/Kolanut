"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhoneIcon from "@/src/assets/icons/phone-icon.svg";
import EmailIcon from "@/src/assets/icons/email-icon.svg";
import LocationIcon from "@/src/assets/icons/location-icon.svg";

const contactDetails = [
  {
    IconComponent: PhoneIcon,
    label: "Phone",
    lines: ["+234 800 000 0000", "+234 701 234 5678"],
  },
  {
    IconComponent: EmailIcon,
    label: "Email",
    lines: ["info@sellerrand.com", "support@sellerrand.com"],
  },
  {
    IconComponent: LocationIcon,
    label: "Office Address",
    lines: [
      "123 Victoria Island Road, Lagos, Nigeria 101241",
      "Visit us Monday to Friday, 9AM - 5PM",
    ],
  },
];

export default function ContactContent() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up form submission
  };

  return (
    <section className="bg-[#fdfdfd] px-6 md:px-12 lg:px-[100px] py-12 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Left: Send Us A Message ── */}
          <div className="flex-1 rounded-xl border border-card-border bg-white p-6 md:p-8 flex flex-col gap-6">
            {/* Heading */}
            <div className="flex flex-col gap-1">
              <h2 className="text-xl md:text-2xl font-semibold text-dark-text capitalize">
                Send Us A Message
              </h2>
              <p className="text-sm md:text-base text-body-text">
                Fill out the form below and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-[#374151]"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="rounded-lg h-12 border-[#e5e7eb] text-sm text-[#6b7280] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
                />
              </div>

              {/* Email + Phone */}
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#374151]"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="rounded-lg h-12 border-[#e5e7eb] text-sm text-[#6b7280] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-[#374151]"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="rounded-lg h-12 border-[#e5e7eb] text-sm text-[#6b7280] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[#374151]"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your inquiry or any questions you have..."
                  rows={6}
                  className="rounded-lg h-31 border-[#e5e7eb] text-sm text-[#6b7280] placeholder:text-[#6b7280] resize-none focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full rounded-lg bg-brand-red text-white font-medium text-base hover:bg-brand-red/90 h-12"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* ── Right: Get in Touch ── */}
          <div className="lg:w-[460px] rounded-xl border border-card-border bg-white p-6 md:p-8 flex flex-col gap-6 ">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl md:text-2xl font-semibold text-dark-text">
                Get in Touch
              </h2>
              <p className="text-sm md:text-base text-body-text">
                Multiple ways to reach our team
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {contactDetails.map(({ IconComponent, label, lines }) => (
                <div key={label} className="flex items-start gap-4">
                  {/* Icon circle */}
                  <div className="mt-0.5 shrink-0 w-9 h-9 rounded-[10px] p-1.5 bg-[#FEF2F2] flex items-center justify-center">
                    <IconComponent
                      width={18}
                      height={18}
                      style={{ color: "#af060d" }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-body-text">{label}</span>
                    {lines.map((line) => (
                      <span key={line} className="text-base text-dark-text">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
