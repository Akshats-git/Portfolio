import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Skills from "@/components/Skills";
import DSAProfile from "@/components/DSAProfile";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemePanel from "@/components/ThemePanel";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Blogs />
      <Skills />
      <DSAProfile />
      <Contact />
      <Footer />
      <ThemePanel />
    </main>
  );
}