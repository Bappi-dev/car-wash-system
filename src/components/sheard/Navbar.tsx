"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, CircleHelp, LayoutGrid } from "lucide-react";

const navigationLinks = [
  { href: "/services", label: "Services", icon: LayoutGrid },
  { href: "/compare", label: "Compare", icon: ArrowLeftRight },
  { href: "/about", label: "About Us", icon: CircleHelp },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="border-t-[3px] sticky top-14 z-50 border-t-[#192f62] border-b border-b-slate-200 bg-white"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          {navigationLinks.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex  items-center gap-2 text-md  ${
                  isActive
                    ? "font-semibold text-orange-300 underline"
                    : "text-slate-900"
                }`}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/booking"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-amber-400 px-5 text-sm font-semibold text-white transition-colors hover:bg-amber-500 sm:min-w-44"
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
