"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/utils/toast";
import {
  FULLNAME_MAX_LENGTH,
  FULLNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  useResendEmailOtp,
  useSignup,
  useVerifyEmailOtp,
} from "@/app/register/hooks";
import VerificationCodeDialog from "./VerificationCodeDialog";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "h-12 rounded-lg border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [verifyingEmail, setVerifyingEmail] = useState("");

  const signup = useSignup();
  const verifyOtp = useVerifyEmailOtp();
  const resendOtp = useResendEmailOtp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const { password } = form;

    if (!fullName || !email || !password) {
      toast.error("Missing details", {
        description: "Please fill in every field to create your account.",
      });
      return;
    }

    if (
      fullName.length < FULLNAME_MIN_LENGTH ||
      fullName.length > FULLNAME_MAX_LENGTH
    ) {
      toast.error("Invalid full name", {
        description: `Full name must be between ${FULLNAME_MIN_LENGTH} and ${FULLNAME_MAX_LENGTH} characters.`,
      });
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      toast.error("Invalid email address", {
        description: "Enter a valid email address to continue.",
      });
      return;
    }

    if (
      password.length < PASSWORD_MIN_LENGTH ||
      password.length > PASSWORD_MAX_LENGTH
    ) {
      toast.error("Invalid password", {
        description: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`,
      });
      return;
    }

    signup.mutate(
      { email, password, fullname: fullName },
      {
        onSuccess: () => {
          // Account exists now — clear the form so it can't be resubmitted
          // while the user finishes verifying.
          setForm({ fullName: "", email: "", password: "" });
          setVerifyingEmail(email);

          toast.success("Account created", {
            description: `We've sent a verification code to ${email}.`,
          });
        },
      },
    );
  };

  const handleVerify = (code: string) => {
    verifyOtp.mutate(
      { email: verifyingEmail, code },
      {
        onSuccess: () => {
          setVerifyingEmail("");
          toast.success("Email verified", {
            description: "You can now sign in with your new account.",
          });
          router.push("/login");
        },
      },
    );
  };

  return (
    <div className="flex flex-1 flex-col bg-white px-6 py-8 lg:px-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 self-start text-sm text-[#111827] hover:text-brand-red"
      >
        <ChevronLeft className="h-4 w-4" />
        Go back to homepage
      </Link>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-[477px] py-10">
          <div className="mb-6 flex flex-col gap-2 text-center">
            <h2 className="font-heading text-[30px] font-bold leading-tight text-[#111827]">
              Create an account
            </h2>
            <p className="text-sm text-[#4b5563]">
              Enter your information to create an account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
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
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#374151]"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={inputClasses}
              />
            </div>

            <Button
              type="submit"
              disabled={signup.isPending}
              className="mt-1 h-12 w-full rounded-full bg-brand-red text-base font-medium text-white hover:bg-brand-red/90 disabled:opacity-70"
            >
              {signup.isPending ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-[#4b5563]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-red hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <VerificationCodeDialog
        open={!!verifyingEmail}
        email={verifyingEmail}
        isVerifying={verifyOtp.isPending}
        isResending={resendOtp.isPending}
        onVerify={handleVerify}
        onResend={() => resendOtp.mutate({ email: verifyingEmail })}
        onCancel={() => setVerifyingEmail("")}
      />
    </div>
  );
}
