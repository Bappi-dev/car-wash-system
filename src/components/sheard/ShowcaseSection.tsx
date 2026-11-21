import Image from "next/image";

const ShowcaseSection = () => {
  return (
    <section className="bg-black px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,.75fr)] lg:gap-14">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
            Keep Your <span className="text-amber-400">Car Clean</span> Always
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-[1.35] text-white/95 sm:text-base">
            <p>
              Your car is more than just a vehicle—it&apos;s a personal space
              that reflects your style, values, and attention to detail.
              Keeping your car clean isn&apos;t just about aesthetics; it&apos;s
              about maintaining the health, safety, and longevity of your
              vehicle.
            </p>
            <p>
              A clean car is a healthy car that ensures a more comfortable and
              pleasant driving experience. Over time, dust, dirt, and grime
              can accumulate on your car&apos;s exterior and interior surfaces,
              leading to contamination and bacterial growth.
            </p>
            <p>
              Moreover, a well-maintained car can significantly boost its resale
              value, making it a sound investment in the long run. Whether
              you&apos;re preparing for a special event or simply want to enjoy
              the pride of owning a spotless vehicle, regular car cleaning is
              essential.
            </p>
            <p>
              Don&apos;t wait for dirt and debris to take a toll on your
              vehicle. Make cleanliness a priority and enjoy the peace of mind
              that comes with driving a car that&apos;s not only clean but truly
              cared for.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[300px]">
          <div className="relative mx-auto aspect-[9/15] overflow-hidden rounded-[38px] border-[9px] border-[#111827] bg-[#161d2a] shadow-[0_18px_55px_rgba(0,0,0,.32)]">
            <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[#111827]" />
            <Image
              src="/carwash.png"
              alt="Professional car wash"
              fill
              sizes="(max-width: 1024px) 320px, 300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/35" />

            <div className="absolute inset-y-0 right-2 z-10 flex w-[58px] items-center justify-center sm:right-3 sm:w-[68px]">
              <p className="vertical-copy text-center text-[28px] font-black leading-[0.86] tracking-tight text-amber-400 sm:text-[32px]">
                HOW CAR WASHING
                <br />
                CAN BENEFIT YOUR
                <br />
                FINGERTIPS
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;