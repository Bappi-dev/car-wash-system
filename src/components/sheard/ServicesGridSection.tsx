import Link from "next/link";
import {
  Droplets,
  Sparkles,
  SprayCan,
  Waves,
  Wind,
  Wrench,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Exterior Wash",
    description:
      "A complete exterior clean to remove dirt, dust, and road grime.",
    price: "৳70",
    icon: Droplets,
  },
  {
    title: "Interior Cleaning",
    description:
      "Detailed vacuuming and surface care for a fresh cabin experience.",
    price: "৳90",
    icon: Wind,
  },
  {
    title: "Full Car Wash",
    description:
      "Inside and outside cleaning for a spotless, showroom-ready finish.",
    price: "৳120",
    icon: Waves,
    popular: true,
  },
  {
    title: "Premium Detailing",
    description:
      "Deep paint care, finishing, and polishing for a brilliant shine.",
    price: "৳150",
    icon: Sparkles,
  },
  {
    title: "Ceramic Protection",
    description:
      "Long-lasting protection that helps keep paint clean and glossy.",
    price: "৳190",
    icon: SprayCan,
  },
  {
    title: "Engine Bay Cleaning",
    description:
      "Careful cleaning to improve appearance and maintain engine areas.",
    price: "৳220",
    icon: Wrench,
  },
];

const ServicesGridSection = () => {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-500">
            Our services
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#192f62] sm:text-4xl">
            Choose the perfect clean
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            From a quick exterior wash to complete detailing, every service is
            handled with professional care and quality products.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(
            ({ title, description, price, icon: Icon, popular }) => (
              <article
                key={title}
                className="group relative flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-slate-200/70"
              >
                {popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#192f62]">
                    Popular
                  </span>
                )}

                <div className="flex size-12 items-center justify-center rounded-xl bg-[#192f62] text-amber-400 transition-colors group-hover:bg-amber-400 group-hover:text-[#192f62]">
                  <Icon aria-hidden="true" className="size-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#192f62]">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {description}
                </p>

                <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-500">Starting at</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#192f62]">
                      {price}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    render={<Link href="/booking" aria-label={`Book ${title}`} />}
                    className="size-10 rounded-full border-slate-200 text-[#192f62] transition-colors group-hover:border-amber-400 group-hover:bg-amber-400"
                  >
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Button>
                </div>
              </article>
            ),
          )}
        </div>

        <div className="mt-10 text-center">
          <Button
            size="lg"
            render={<Link href="/services" />}
            className="h-11 bg-[#192f62] px-6 text-white hover:bg-[#263e7c]"
          >
            View all services
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;