import {
  BadgeCheck,
  CarFront,
  Clock3,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import MarqueeText from "react-marquee-text";

const benefits = [
  { icon: CarFront, label: "All vehicle types" },
  { icon: Sparkles, label: "Premium cleaning" },
  { icon: Clock3, label: "Fast service" },
  { icon: ShieldCheck, label: "Trusted professionals" },
  { icon: Star, label: "Quality guaranteed" },
  { icon: BadgeCheck, label: "Easy online booking" },
];

const Merquee = () => {
  const repeatedBenefits = [...benefits, ...benefits];

  return (
    <section
      aria-label="Car wash benefits"
      className="overflow-hidden border-y container mx-auto rounded-md border-slate-200  py-1 bg-orange-200"
    >
        <MarqueeText className="cursor-pointer"   direction="right" duration={9} pauseOnHover={true}>
     
          <div className="marquee-track flex w-max items-center">
            {repeatedBenefits.map(({ icon: Icon, label }, index) => (
              <div
                key={`${label}-${index}`}
                aria-hidden={index >= benefits.length ? "true" : undefined}
                className="flex items-center"
              >
                <div className="flex items-center gap-2.5 px-5 sm:px-8">
                  <span className="flex size-9 items-center justify-center rounded-full bg-amber-400/15 text-amber-500">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="whitespace-nowrap text-sm font-semibold text-[#192f62] sm:text-base">
                    {label}
                  </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-8 bg-slate-200"
                />
              </div>
            ))}
          </div>
        </MarqueeText>
    </section>
  );
};

export default Merquee;
