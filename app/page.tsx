import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import MemoryGraph from "@/components/sections/MemoryGraph";
import QueryDemo from "@/components/sections/QueryDemo";
import Features from "@/components/sections/Features";
import Analytics from "@/components/sections/Analytics";
import ApiSection from "@/components/sections/ApiSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Problem />
      <HowItWorks />
      <MemoryGraph />
      <QueryDemo />
      <Features />
      <Analytics />
      <ApiSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
