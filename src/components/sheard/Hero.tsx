"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MAIN_CAR_WASH_IMAGE =
  "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200";

const CAR_WASH_THUMBS = [
  {
    id: "scratch-removal",
    label: "Scratch Removal",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=600",
  },
  {
    id: "car-washing-repair",
    label: "Car Washing & Repair",
    image:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=600",
  },
  {
    id: "paint-polish",
    label: "Foam & Gloss Polish",
    image:
      "https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=600",
  },
];

export default function CarWashPromoBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-15 sm:py-12">
      <div className="relative overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#121212] text-white shadow-2xl">
     
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 size-[420px] rounded-full bg-[#FF6B00]/15 blur-3xl"
        />

       
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-[#FF6B00] via-[#FF851B] to-[#FF6B00]"
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-8 px-6 pb-12 pt-8 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:pb-14 lg:pt-10">

          <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center">
           
            <div className="z-20 flex w-full flex-row justify-center gap-2.5 sm:w-36 sm:shrink-0 sm:flex-col sm:gap-3">
              {CAR_WASH_THUMBS.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex-1 overflow-hidden rounded-xl border-2 border-white/85 bg-[#1E1E1E] shadow-lg sm:flex-none"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-[#FF6B00] px-2 py-1 text-center text-[10px] font-extrabold tracking-tight text-white">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative w-full flex-1">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A] shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
                <Image
                  width={400}
                  height={400}
                  src={MAIN_CAR_WASH_IMAGE}
                  alt="Professional car wash service"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/65" />
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-[#FF6B00]/35 bg-[#181818]/95 px-4 py-2.5 text-center shadow-xl backdrop-blur-md sm:absolute sm:-right-4 sm:bottom-4 sm:mt-0 sm:flex-col sm:gap-0 sm:px-5 sm:py-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Upto
                </span>
                <span className="text-2xl font-black leading-none text-[#FF6B00] sm:text-3xl">
                  45%
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-white">
                  DISCOUNT
                </span>
              </div>
            </div>
          </div>

    
          <div className="flex flex-col items-center space-y-5 text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF851B]">
              <Sparkles className="size-3.5 text-[#FF6B00]" />
              Complete Auto Care
            </span>

            <div className="space-y-1">
              <p className="text-xl font-extrabold tracking-tight text-[#FF6B00] sm:text-2xl">
                Professional
              </p>
              <h1 className="text-4xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-5xl">
                Car Wash
                <span className="block text-[#FF6B00]">SERVICE</span>
              </h1>
              <p className="pt-1 text-base font-medium text-zinc-300 sm:text-lg">
                In your Town
              </p>
            </div>

            <div className="pt-1">
              <Button
                size="lg"
                className="h-12 rounded-full bg-[#FF6B00] px-7 text-sm font-extrabold text-white shadow-lg shadow-[#FF6B00]/30 transition hover:bg-[#E05E00]"
                render={<Link href="/services" />}
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-white text-[#FF6B00]">
                  <ArrowRight className="size-3.5 stroke-[2.5]" />
                </span>
                Book Now
              </Button>
            </div>

            <div className="pt-1">
              <p className="flex items-center justify-center gap-2 text-lg font-black tracking-wide text-[#FF6B00] sm:text-xl lg:justify-start">
                <Phone className="size-4" />
                365-4585-7854
              </p>
              <p className="text-xs font-medium tracking-wider text-zinc-400">
                Typeyourwebsite.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
