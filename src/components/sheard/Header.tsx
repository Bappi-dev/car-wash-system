import Link from "next/link";
import {
  CarFront,
  MessageCircle,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import AccountMenu from "./AccountMenu";

const Header = async () => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return (
    <header className="border-r-2 sticky top-0 z-50 border-amber-400 bg-[#192f62] text-white">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="Car wash home"
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-[#263e7c] transition-colors hover:bg-[#304b8e]"
        >
          <CarFront aria-hidden="true" className="size-6 text-amber-400" />
          <Sparkles
            aria-hidden="true"
            className="absolute top-1 size-3 text-sky-200"
          />
        </Link>

        <div className="flex items-center gap-4 text-xs font-medium sm:gap-6 sm:text-sm">
          <a
            href="tel:+8801706785160"
            className="inline-flex items-center gap-2 whitespace-nowrap transition-colors"
            aria-label="Call us now at +880170678-5160"
          >
            <Phone aria-hidden="true" className="size-4 sm:hidden" />
            <span className="hidden sm:inline">
              Call us now:{" "}
              <span className="hover:text-green-400">+8801960349412</span>
            </span>
          </a>
          <a
            href="https://wa.me/8801706785160"
            aria-label="Contact us on WhatsApp"
            className="transition-colors hover:text-amber-300"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
          </a>
          {session ? (
            <AccountMenu  user={session.user}/>
          ) : (
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-amber-300"
            >
              <UserRound aria-hidden="true" className="size-4" />
              <span>Account</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
