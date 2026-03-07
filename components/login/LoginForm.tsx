"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up auth
  };

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-[477px]">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center mb-6">
          <h2
            className="text-[#111827]"
            style={{
              fontFamily: "var(--font-heading), serif",
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: "1.25",
            }}
          >
            Log in to your account
          </h2>
          <p
            style={{
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#4b5563",
            }}
          >
            Please enter your login details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              style={{
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="h-12 rounded-lg border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              style={{
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              style={{
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="h-12 rounded-lg border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              style={{
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border border-[#d1d5db] accent-brand-red cursor-pointer"
              />
              <span
                style={{
                  fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#4b5563",
                }}
              >
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              style={{
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#af060d",
              }}
              className="hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-brand-red hover:bg-brand-red/90 text-white text-base font-medium"
            style={{
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
