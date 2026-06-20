import Hero from "@/components/Hero";
import About from "@/components/About";
import Coursework from "@/components/Coursework";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Skills from "@/components/Skills";
import DSAProfile from "@/components/DSAProfile";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Coursework />
      <Skills />
      <Projects />
      <DSAProfile />
      <Blogs />
      <Contact />
      <Footer />
    </main>
  );
}