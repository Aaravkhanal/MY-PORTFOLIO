"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronDown } from "react-icons/fa";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current && textRef.current) {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        opacity: 0,
      });
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div 
        ref={textRef}
        className="z-10 flex flex-col items-center text-center px-4"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-accent-blue tracking-[0.2em] uppercase text-sm mb-4"
        >
          Aarav Khanal
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
        >
          AI <span className="text-gradient">ENGINEER</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-xl text-white/60 text-lg md:text-xl font-light mb-12"
        >
          Building Intelligent Systems. <br />
          Creating the Future with Artificial Intelligence.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex gap-4"
        >
          <button 
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
            className="magnetic px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
          >
            Explore My Work
          </button>
          <a href="/Aarav_Khanal_Resume.pdf" target="_blank" rel="noopener noreferrer" className="magnetic px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors">
            Download Resume
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <FaChevronDown className="text-white/40 w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
