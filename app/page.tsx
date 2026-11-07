import About from "@/components/sections/About";
import Experience from "@/components/sections/experience/ExperienceSection";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import LetsTalk from "@/components/sections/LetsTalk";
import Project from "@/components/sections/Project";
import Blogs from "@/components/sections/Blogs";
import ContactMe from "@/components/sections/ContactMe";
import Credentials from "@/components/sections/Credentials";
import TechStack from "@/components/TechStack";
import { SITE_DESCRIPTION, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sanyam Rathore",
  url: SITE_URL,
  email: "mailto:sanyamr.work@gmail.com",
  jobTitle: "Full-Stack Software Engineer",
  description: SITE_DESCRIPTION,
  sameAs: SOCIAL_LINKS,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Lakshmi Narain College of Technology",
  },
  knowsAbout: [
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "Event-Driven Architecture",
    "Distributed Systems",
    "LLM Integration",
    "PostgreSQL",
    "Kafka",
    "AWS",
    "Azure",
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col font-inter text-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <Hero />
      <About />
      <Project />
      <Experience />
      <TechStack />
      <Credentials />
      <Blogs />
      <LetsTalk />
      <ContactMe />
      <Footer />
    </div>
  );
}
