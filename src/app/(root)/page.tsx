import Hero from "@/components/sheard/Hero";
import Merquee from "@/components/sheard/Merquee";
import ServicesGridSection from "@/components/sheard/ServicesGridSection";
import ShowcaseSection from "@/components/sheard/ShowcaseSection";
import SplitFeatureSection from "@/components/sheard/SplitFeatureSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Merquee />
      <SplitFeatureSection />
      <ShowcaseSection />
      <ServicesGridSection/>
    </main>
  );
}
