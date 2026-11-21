import Link from "next/link";
import {
  Camera,
  CarFront,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Play,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book a Wash" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About Us" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: Globe2 },
  { href: "https://instagram.com", label: "Instagram", icon: Camera },
  { href: "https://youtube.com", label: "YouTube", icon: Play },
];

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#192f62] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_1fr] lg:gap-14">
          <div>
            <Link
              href="/"
              aria-label="Car wash home"
              className="inline-flex items-center gap-3"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-amber-400 text-[#192f62]">
                <CarFront aria-hidden="true" className="size-6" />
              </span>
              <span>
                <span className="block text-lg font-bold">Car Wash</span>
                <span className="block text-xs text-slate-300">
                  Premium vehicle care
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Reliable, professional car wash services that keep your vehicle
              spotless, protected, and ready for every journey.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-slate-200 transition-colors hover:border-amber-400 hover:bg-amber-400 hover:text-[#192f62]"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-400">
              Quick links
            </h2>
            <nav aria-label="Footer" className="mt-5 grid gap-3">
              {quickLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-slate-300 transition-colors hover:text-amber-400"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-400">
              Contact
            </h2>
            <address className="mt-5 grid gap-4 not-italic">
              <a
                href="tel:+8801960349412"
                className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-amber-400"
              >
                <Phone aria-hidden="true" className="size-4 text-amber-400" />
                +880 1960-349412
              </a>
              <a
                href="mailto:hello@carwash.com"
                className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-amber-400"
              >
                <Mail aria-hidden="true" className="size-4 text-amber-400" />
                hello@carwash.com
              </a>
              <p className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-amber-400"
                />
                Dhaka, Bangladesh
              </p>
            </address>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Car Wash. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;