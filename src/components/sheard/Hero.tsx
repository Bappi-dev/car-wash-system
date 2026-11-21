import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    label: "Premium care",
  },
  {
    icon: CalendarCheck,
    label: "Easy booking",
  },
  {
    icon: ShieldCheck,
    label: "Trusted service",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden container mx-auto my-4 rounded-2xl bg-[#192f62] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 20%, rgba(251,191,36,.55), transparent 24%), radial-gradient(circle at 12% 85%, rgba(56,189,248,.25), transparent 28%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[420px] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            <Sparkles aria-hidden="true" className="size-4" />
            Professional car care
          </div>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            A spotless car,
            <span className="block text-amber-400">without the wait.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            Get a fast, reliable wash from trusted professionals. Choose your
            service and book in just a few clicks.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href="/booking" />}
              className="h-12 bg-amber-400 px-6 text-base font-semibold text-[#192f62] hover:bg-amber-300"
            >
              Book your wash
              <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/services" />}
              className="h-12 border-white/25 bg-white/10 px-6 text-base text-white hover:bg-white/15"
            >
              View services
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-slate-100"
              >
                <Icon aria-hidden="true" className="size-4 text-amber-400" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden h-[280px] lg:block"
        >
          <div className="absolute inset-x-8 bottom-3 h-10 rounded-[50%] bg-sky-950/70 blur-xl" />
          <div className="absolute inset-8 rounded-full border border-white/10 bg-white/5" />
          <div className="absolute left-1/2 top-1/2 flex size-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/10 shadow-[0_0_60px_rgba(251,191,36,.16)]">
            <Sparkles className="size-20 text-amber-400" strokeWidth={1.25} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;