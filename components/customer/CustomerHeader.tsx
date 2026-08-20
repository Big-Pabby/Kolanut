"use client";

import { Bell, User, Menu } from "lucide-react";
import { useCustomer } from "./CustomerContext";
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
  const { setIsMobileMenuOpen } = useCustomer();
  const user = useUserStore((state) => state.user);

  const displayName = user?.fullname || user?.email || "";
  const initials = displayName ? getInitials(displayName) : "";

  return (
    // The offset is a breakpoint, not a measured viewport width, so the header
    // is positioned correctly on the very first paint.
    <header
      className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between px-4 md:left-[250px] md:px-6"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
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
