"use client";

import { Bell, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomer } from "./CustomerContext";
import { useState, useEffect } from "react";
import { useUserStore } from "@/lib/store/user-store";

/** "Mauteen Adeleke" -> "MA", falls back to the first letter of the email. */
const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function CustomerHeader() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useCustomer();
  const [isMobile, setIsMobile] = useState(false);
  const user = useUserStore((state) => state.user);

  const displayName = user?.fullname || user?.email || "";
  const initials = displayName ? getInitials(displayName) : "";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header
      className="fixed top-0 right-0 h-16 flex items-center justify-between px-4 md:px-6 z-30"
      style={{
        left: isMobile ? 0 : 250,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        transition: "left 0.3s ease",
      }}
    >
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Spacer for desktop to balance the layout */}
      <div className="hidden md:block" />
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-brand-red rounded-full" />
        </button>

        {/* Profile - hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
          {/* The user is rehydrated from localStorage, so it is absent from the
              prerendered HTML — suppress the resulting hydration warning. */}
          <div className="text-right" suppressHydrationWarning>
            <p className="text-sm font-medium text-gray-800 max-w-[220px] truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-500">
              {user?.is_admin ? "Admin" : "Customer"}
            </p>
          </div>
          <button
            suppressHydrationWarning
            className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600"
          >
            {initials || <User className="h-5 w-5 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}
