import CanvasSequence from "@/components/canvas/CanvasSequence";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative bg-black w-full min-h-screen overflow-hidden">
      <LoadingScreen />
      
      {/* Scroll-driven Image Sequence Background */}
      <CanvasSequence />

      {/* HTML Content Overlay */}
      <div className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </div>
    </main>
  );
}
