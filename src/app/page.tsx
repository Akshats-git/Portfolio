import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CodingActivity from "@/components/CodingActivity";
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
      <CodingActivity />
      <Blogs />
      <Contact />
      <Footer />
    </main>
  );
}
