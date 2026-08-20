"use client";

import { Menu } from "lucide-react";
import { useAdminShell } from "./AdminContext";

interface AdminHeaderProps {
  userName?: string;
  userInitials?: string;
}

export default function AdminHeader({
  userName = "Mauteen Adeleke",
  userInitials = "MA",
}: AdminHeaderProps) {
  const { setIsMobileMenuOpen } = useAdminShell();

  return (
    <header
      className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-end gap-4 px-4 md:left-[250px] md:px-6"
      style={{ backgroundColor: "#fefefe", borderBottom: "1px solid #f3f4f6" }}
    >
      {/* Menu button — opens the sidebar drawer on small screens */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open menu"
        className="mr-auto rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Bell icon */}
      <button className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors">
        <img src="/icons/admin/bell.svg" alt="Notifications" style={{ width: 16, height: 18, color: "#af060d" }} />
      </button>

      {/* Avatar + Name */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 36,
            height: 36,
            backgroundColor: "#af060d",
            border: "1.5px solid #af060d",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 400,
              fontFamily: "Gilroy-Medium, HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              letterSpacing: "-0.14px",
            }}
          >
            {userInitials}
          </span>
        </div>
        <span
          className="hidden sm:inline max-w-[180px] truncate"
          style={{
            color: "#111827",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            letterSpacing: "-0.14px",
          }}
        >
          {userName}
        </span>
      </div>
    </header>
  );
}
