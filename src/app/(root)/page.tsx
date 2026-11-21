import Hero from "@/components/sheard/Hero";
import Merquee from "@/components/sheard/Merquee";
import ShowcaseSection from "@/components/sheard/ShowcaseSection";
import SplitFeatureSection from "@/components/sheard/SplitFeatureSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Merquee />
      <SplitFeatureSection />
      <ShowcaseSection />
    </main>
  );
}
