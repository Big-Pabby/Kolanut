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
  X,
} from "lucide-react";
import { useAdminLogout } from "@/app/login/hooks";
import { useAdminShell } from "./AdminContext";

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
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAdminShell();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Backdrop — only ever visible while the drawer is open on mobile */}
      <div
        onClick={closeMobileMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col transition-transform duration-300 md:z-40 md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#af060d" }}
      >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-6">
        <img
          src="/images/LogoFooter.svg"
          alt="Kolanut"
          className="h-9 w-auto"
        />
        <button
          type="button"
          onClick={closeMobileMenu}
          aria-label="Close menu"
          className="rounded-lg p-2 transition-colors hover:bg-white/10 md:hidden"
        >
          <X className="h-5 w-5 text-white" />
        </button>
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
              onClick={closeMobileMenu}
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
    </>
  );
}
