"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Shield,
  Banknote,
  FileKey,
  BadgeCheck,
  BookOpen,
  MessageCircleQuestionMark,
  Settings,
  LogOut,
} from "lucide-react";
import { useAdminLogout } from "@/app/login/hooks";

const navItems = [
  { label: "Dashboard", icon: <LayoutGrid />, href: "/admin/dashboard" },
  { label: "Customers", icon: <Users />, href: "/admin/customers" },
  { label: "Policies", icon: <Shield />, href: "/admin/policies" },
  { label: "Transactions", icon: <Banknote />, href: "/admin/transactions" },
  { label: "Claims", icon: <FileKey />, href: "/admin/claims" },
  { label: "Coupon", icon: <BadgeCheck />, href: "/admin/coupon" },
  { label: "Resources", icon: <BookOpen />, href: "/admin/resources" },
  { label: "FAQs", icon: <MessageCircleQuestionMark />, href: "/admin/faqs" },
  { label: "Settings", icon: <Settings />, href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const logout = useAdminLogout();

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-40"
      style={{ width: 250, backgroundColor: "#af060d" }}
    >
      {/* Logo */}
      <div className="px-4 py-6">
        <img
          src="/images/LogoFooter.svg"
          alt="Kolanut"
          className="h-9 w-auto"
        />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1 pb-6">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center h-11 gap-2 px-3 py-3  transition-colors"
              style={{
                color: isActive ? "#AF060D" : "white",
                backgroundColor: isActive ? "white" : "transparent",
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 18,
                  height: 18,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}

        {/* Divider + Logout */}
        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 px-3 py-3 rounded-lg transition-colors hover:bg-white/10"
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "-0.14px",
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: 18,
                height: 18,
                border: "1.5px solid #ffffff",
                borderRadius: 2,
              }}
            >
              <LogOut />
            </span>
            Log out
          </button>
        </div>
      </nav>
    </aside>
  );
}
