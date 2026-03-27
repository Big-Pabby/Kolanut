"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Simulate password reset (in real app, call API)
    alert("Password has been reset successfully!");
    router.push("/login");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-[477px]">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center mb-6">
          <h2
            className="text-[#111827] font-heading"
            style={{
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: "1.25",
            }}
          >
            Forgot Password
          </h2>
          <p
            style={{
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#4b5563",
            }}
          >
            Kindly enter the email address and a new password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
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
              placeholder="Enter your email"
              required
              className="h-12 rounded-lg border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              New Password
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              className="h-12 rounded-lg border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              required
              className="h-12 rounded-lg border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#dc2626",
              }}
            >
              {error}
            </p>
          )}

          {/* Reset Password button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-brand-red hover:bg-brand-red/90 text-white text-base font-medium"
            style={{
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            Change Password
          </Button>

          {/* Back to Login link */}
          <div className="text-center text-[#4B5563] text-sm">
            <p>
              Remember Password?{" "}
              <Link
                href="/login"
                style={{
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#af060d",
                }}
                className="hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
