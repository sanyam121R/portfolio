import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import LetsTalk from "@/components/sections/LetsTalk";
import Work from "@/components/sections/Work";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="flex flex-col font-inter text-sm">
      <Header />

      <Hero />
      <About />
      <Work />
      <Experience />
      <TechStack />
      <LetsTalk />
      <Footer />
    </div>
  );
}
