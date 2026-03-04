"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import LogoNavbar from "@/src/assets/icons/logo-navbar.svg";
import ChevronDown from "@/src/assets/icons/chevron-down.svg";
import { Menu, X, LayoutGrid, Car, Anchor, Home, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Coupon", href: "#" },
  { label: "Make a Claim", href: "#" },
  { label: "Resources", href: "/resources" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact Us", href: "#" },
];

const insuredSubItems = [
  { label: "Overview", href: "/insured", Icon: '/dashboard.svg' },
  { label: "Home", href: "/home-insurance", Icon: '/home.svg' },
  { label: "Motor", href: "/motor-insurance", Icon: '/motor.svg' },
  { label: "Marine", href: "/marine-insurance", Icon: '/marine.svg' },
  { label: "Travel", href: "/travel-insurance", Icon: '/travel.svg' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [insuredDropdownOpen, setInsuredDropdownOpen] = useState(false);

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Check if any insured sub-item is active
  const isInsuredActive = () => {
    return pathname.startsWith("/insured");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-16 lg:h-20 max-w-[1440px] items-center justify-between px-4 lg:px-20">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <LogoNavbar
            width={100}
            height={40}
            className="lg:w-[121px] lg:h-[49px]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/about"
            className={`text-base transition-colors ${
              isActive("/about")
                ? "text-brand-red font-medium"
                : "text-nav-text hover:text-brand-red"
            }`}
          >
            About Us
          </Link>

          {/* Get Insured Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setInsuredDropdownOpen(true)}
            onMouseLeave={() => setInsuredDropdownOpen(false)}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <Link
                href="/insured"
                className={`text-base transition-colors ${
                  isInsuredActive()
                    ? "text-brand-red font-medium"
                    : "text-nav-text hover:text-brand-red"
                }`}
              >
                Get Insured
              </Link>
              <ChevronDown
                width={14}
                height={8}
                className={`text-dark-text transition-transform duration-200 ${
                  insuredDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu — horizontal card style */}
            <AnimatePresence>
              {insuredDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 z-50"
                  style={{ minWidth: "480px" }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
                    <span className="text-sm font-semibold text-gray-800">
                      Get Insured
                    </span>
                    <button
                      onClick={() => setInsuredDropdownOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Icon Grid */}
                  <div className="flex items-center gap-1 px-4 py-4">
                    {insuredSubItems.map(({ label, href, Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group min-w-[80px]"
                      >
                        <div className="w-25 h-22 rounded-xl border border-gray-200 bg-[#FBFBFB] flex flex-col gap-2 items-center justify-center group-hover:border-brand-red group-hover:text-brand-red transition-colors text-[#161616]">
                          <Image alt={label} width={40} height={40} src={Icon}/>
                            <span className="text-xs text-[#161616] group-hover:text-brand-red transition-colors font-medium whitespace-nowrap">
                          {label}
                        </span>
                        </div>
                      
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-base transition-colors ${
                isActive(link.href)
                  ? "text-brand-red font-medium"
                  : "text-nav-text hover:text-brand-red"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sign In */}
        <div className="hidden lg:flex">
          <Button
            variant="outline"
            className="rounded-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-colors"
          >
            Sign In
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-card-border px-5 py-6 flex flex-col gap-4 overflow-hidden"
          >
            <Link
              href="/about"
              className={`text-base transition-colors ${
                isActive("/about")
                  ? "text-brand-red font-medium"
                  : "text-nav-text hover:text-brand-red"
              }`}
            >
              About Us
            </Link>

            {/* Mobile Get Insured with sub-items */}
            <div className="flex flex-col gap-2">
              <span className="text-base text-nav-text font-medium">
                Get Insured
              </span>
              <div className="flex gap-3 pl-2 flex-wrap">
                {insuredSubItems.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg border border-gray-200 hover:border-brand-red hover:text-brand-red transition-colors text-gray-600 min-w-[60px]"
                  >
                    <Image alt={label} width={40} height={40} src={Icon}/>
                    <span className="text-xs font-medium">{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-base transition-colors ${
                  isActive(link.href)
                    ? "text-brand-red font-medium"
                    : "text-nav-text hover:text-brand-red"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="w-fit rounded-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
            >
              Sign In
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
