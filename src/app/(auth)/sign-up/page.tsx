"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CarFront, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const benefits = [
  "Book a wash whenever it suits you",
  "Keep your vehicle details in one place",
  "Get updates on your upcoming bookings",
];

const SignUpPage = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };
    console.log(data);

    const { data: resdata, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    router.push("/");
    if (resdata) {
      console.log(resdata);
      toast.add({
        description: "Sign Up Successfully!!!",
        type: "success",
      });
    }
    if (error) {
      console.log(error);
    }

    setMessage(
      "Your details haven't been submitted because account creation isn't connected yet.",
    );
  };

  return (
    <main className="relative isolate flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6 lg:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-96 rounded-full bg-amber-100/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-96 rounded-full bg-blue-100/70 blur-3xl"
      />

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#192f62] p-10 text-white lg:flex xl:p-12">
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -right-24 size-80 rounded-full border-[40px] border-white/5"
          />
          <div
            aria-hidden="true"
            className="absolute right-10 top-24 size-28 rounded-full border border-white/10"
          />

          <div className="relative">
            <div className="mb-12 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-amber-300 ring-1 ring-white/15">
              <CarFront aria-hidden="true" className="size-8" />
            </div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">
              A brighter kind of car care
            </p>
            <h2 className="max-w-sm text-3xl leading-tight font-semibold tracking-tight xl:text-4xl">
              Your next great wash starts here.
            </h2>
            <p className="mt-4 max-w-sm leading-7 text-blue-100/80">
              Create an account and make keeping your car clean the easiest part
              of your day.
            </p>
          </div>

          <ul className="relative space-y-4">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 text-sm text-blue-50"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="relative flex items-center gap-2 text-sm text-blue-100/70">
            <Sparkles aria-hidden="true" className="size-4 text-amber-300" />A
            little shine goes a long way.
          </div>
        </aside>

        <section className="px-6 py-9 sm:px-10 sm:py-11 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-md">
            <div className="mb-8 lg:mb-9">
              <p className="mb-2 text-sm font-semibold text-amber-600">
                Get started for free
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your details below to join us.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  minLength={8}
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-sm leading-5 text-slate-600">
                <input
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-0.5 size-4 shrink-0 accent-[#192f62] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-[#192f62] underline decoration-slate-300 underline-offset-4 hover:decoration-[#192f62]"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-[#192f62] underline decoration-slate-300 underline-offset-4 hover:decoration-[#192f62]"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <Button
                type="submit"
                className="h-11 w-full rounded-lg bg-amber-400 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-500"
              >
                Create account
              </Button>

              <p aria-live="polite" className="min-h-5 text-sm text-rose-700">
                {message}
              </p>
            </form>

            <p className="mt-4 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-[#192f62] hover:text-amber-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;
