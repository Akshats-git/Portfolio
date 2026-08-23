import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CodingStrip from "@/components/CodingStrip";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CodingStrip />
      <Blogs />
      <Contact />
      <Footer />
    </main>
  );
}
