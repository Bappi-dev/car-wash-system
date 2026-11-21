"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SplitFeatureSection() {
  return (
    <section className="   px-4 py-10 sm:py-14">
      <div className="grid grid-cols-1 border-y border-[#E8DED3] bg-[#FFFAF5] md:grid-cols-2">
   
        <div className="flex items-center border-b border-[#E8DED3] px-6 py-8 sm:px-10 md:border-b-0 md:border-r md:py-12">
          <h2 className="font-serif text-4xl font-black leading-[1.08] tracking-tight text-[#281E18] sm:text-5xl lg:text-[52px]">
            We Will Help You to
            <br />
            Keep Your Table
            <br />
            Always Fresh
          </h2>
        </div>

        <div className="flex flex-col justify-center space-y-4 px-6 py-8 sm:px-10 md:py-12">
          <p className="max-w-xl text-sm leading-relaxed text-[#665B52] sm:text-base">
            At our kitchen, we&apos;re passionate about serving food crafted
            with care. From hand-stretched wood-fired pizzas to fresh daily
            specials, our team uses quality ingredients and fast preparation to
            keep every meal hot and flavorful. Experience the difference that
            freshly made dishes can bring to your day.
          </p>

          <div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9432D] transition hover:text-[#A93422]"
            >
              <span>Explore services</span>
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}