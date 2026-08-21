"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useAdminLogin } from "@/app/login/hooks";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const loginMutation = useAdminLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { user } = await loginMutation.mutateAsync({
        username: form.username,
        password: form.password,
      });

      // Admins land in the admin area, everyone else in the customer dashboard
      router.push(user?.is_admin ? "/admin/resources" : "/customer/dashboard");
    } catch (error) {
      // Error handling is done in the mutation's onError callback
      console.error("Login failed:", error);
    }
  };

  const isLoading = loginMutation.isPending;

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

      <div className="flex flex-1 items-center justify-center">
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
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
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
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="h-12 rounded-lg border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              Password
            </label>
            <PasswordInput
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="h-12 rounded-lg border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
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
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
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
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
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
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-brand-red hover:bg-brand-red/90 text-white text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Create account link */}
          <p className="text-center text-sm text-[#4b5563]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-brand-red hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}
