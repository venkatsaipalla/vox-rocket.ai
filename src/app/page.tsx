import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import FeaturesStepper from "@/components/FeaturesStepper";
import DashboardDemo from "@/components/DashboardDemo";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Footer from "@/components/Footer";
import TargetMarket from "@/components/TargetMarket";
import MarketMetrics from "@/components/MarketMetrics";
import Competition from "@/components/Competition";
import Pricing from "@/components/Pricing";
import ScrollInit from "@/components/ScrollInit";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollInit />
      <main id="main" className="relative">
        <Hero />
        <Problem />
        <Solution />
        {/* <FeaturesStepper /> */}
        {/* <DashboardDemo /> */}
        <TargetMarket />
        <MarketMetrics />
        <Competition />
        <Pricing />
        <TestimonialCarousel />
      </main>
      {/* <section id="get-started" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">Ready to launch?</h2>
          <p className="mt-3 text-gray-300">Book a Demo or Start Free Trial</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#demo" className="px-5 py-3 rounded-md border border-white/20 text-white/90 hover:text-white hover:border-white/40">Book a Demo</a>
            <a href="#get-started" className="px-5 py-3 rounded-md bg-[#6C63FF] hover:bg-[#5a53ff] text-white glow-purple">Start Free Trial</a>
          </div>
        </div>
      </section> */}
      <Footer />
    </>
  );
}
