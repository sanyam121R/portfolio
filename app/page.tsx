import About from "@/components/sections/About";
import Experience from "@/components/sections/experience/ExperienceSection";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import LetsTalk from "@/components/sections/LetsTalk";
import Project from "@/components/sections/Project";
import Blogs from "@/components/sections/Blogs";
import ContactMe from "@/components/sections/ContactMe";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="flex flex-col font-inter text-sm">
      <Header />

      <Hero />
      <About />
      <Project />
      <Experience />
      <TechStack />
      <Blogs />
      <LetsTalk />
      <ContactMe />
      <Footer />
    </div>
  );
}
