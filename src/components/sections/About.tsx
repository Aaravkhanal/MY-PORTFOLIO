"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const socials = [
  { icon: FaGithub,    url: "https://github.com/Aaravkhanal",                       label: "GitHub",    hoverCls: "hover:text-white hover:border-white/30" },
  { icon: FaLinkedin,  url: "https://www.linkedin.com/in/aarav-khanal-40795832a/",  label: "LinkedIn",  hoverCls: "hover:text-blue-400 hover:border-blue-400/40" },
  { icon: FaInstagram, url: "https://www.instagram.com/a__khanal/",                 label: "Instagram", hoverCls: "hover:text-pink-400 hover:border-pink-400/40" },
  { icon: FaEnvelope,  url: "mailto:khanalaarav2063@gmail.com",                     label: "Email",     hoverCls: "hover:text-cyan-400 hover:border-cyan-400/40" },
];

const pillars = [
  {
    icon: "🧠",
    title: "Machine Learning",
    sub: "Deep Learning · Predictive Models",
    accent: "#3b82f6",
    delay: 0,
  },
  {
    icon: "🤖",
    title: "LLM Engineering",
    sub: "Agentic AI · Multi-Agent Systems",
    accent: "#8b5cf6",
    delay: 0.08,
  },
  {
    icon: "⚡",
    title: "Full Stack AI",
    sub: "Frontend · Backend · APIs",
    accent: "#06b6d4",
    delay: 0.16,
  },
  {
    icon: "☁️",
    title: "Cloud & MLOps",
    sub: "Deployment · Monitoring · CI/CD",
    accent: "#10b981",
    delay: 0.24,
  },
];

function PillarCard({ p }: { p: typeof pillars[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: p.delay, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="relative rounded-2xl p-6 overflow-hidden group cursor-default select-none"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }} />

      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}20)` }} />

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${p.accent}12` }}
      />

      <div className="relative">
        <motion.div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5"
          style={{ background: `${p.accent}15` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {p.icon}
        </motion.div>
        <h4 className="text-sm font-bold text-white mb-1.5 tracking-wide">{p.title}</h4>
        <p className="text-xs text-white/40 leading-relaxed">{p.sub}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -50, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "center center", scrub: 1.2 } }
      );
    }
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "center center", scrub: 1 } }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-32 z-10">
      {/* Section backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="inline-block text-xs font-mono tracking-[0.35em] uppercase text-blue-400 mb-4 opacity-80"
          >
            About Me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1]"
          >
            Building Intelligent Systems at the<br className="hidden md:block" />
            <span className="text-gradient"> Intersection of AI & Engineering</span>
          </motion.h2>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 mb-20">

          {/* Profile image */}
          <div ref={imageRef} className="flex-shrink-0 mx-auto lg:mx-0 relative w-72 h-72 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-spin" style={{ animationDuration: "14s" }} />
            <div className="absolute inset-4 rounded-full border border-purple-500/15 animate-spin" style={{ animationDuration: "22s", animationDirection: "reverse" }} />
            <div className="absolute inset-8 rounded-full bg-blue-600/8 blur-2xl" />
            <div className="absolute inset-6 rounded-full overflow-hidden border border-white/10 bg-black/60">
              <Image src="/profile.png" alt="Aarav Khanal — AI Engineer" fill sizes="320px"
                className="object-cover transition-transform duration-700 hover:scale-105" priority />
            </div>
            {/* Social icons */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
              {socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
                  className={`p-2.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md text-white/40 transition-all duration-200 hover:scale-110 ${s.hoverCls}`}>
                  <s.icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Bio text */}
          <div ref={textRef} className="flex-1 flex flex-col gap-5 max-w-2xl pt-2">
            <p className="text-white/70 text-base md:text-lg leading-[1.85]">
              I&apos;m <span className="text-white font-semibold">Aarav Khanal</span>, an AI Engineer
              focused on designing and building intelligent software that bridges machine learning
              research with scalable, real-world applications. My work spans the complete AI
              development lifecycle — from data processing and model development to LLM
              orchestration, backend engineering, cloud deployment, and production infrastructure.
            </p>
            <p className="text-white/70 text-base leading-[1.85]">
              I specialize in Machine Learning, Deep Learning, Large Language Models, Agentic AI,
              Multi-Agent Systems, MLOps, and Full-Stack AI Engineering. I enjoy solving complex
              technical challenges by combining modern AI technologies with strong software
              engineering principles to create scalable, reliable, and efficient systems.
            </p>
            <p className="text-white/70 text-base leading-[1.85]">
              I&apos;m passionate about building intelligent products that are not only technically
              advanced but also thoughtfully designed, performant, and production-ready. I
              continuously explore emerging AI technologies and strive to engineer solutions that
              push the boundaries of what&apos;s possible.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 pt-3">
              <a href="/Aarav_Khanal_Resume.pdf" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors">
                <FiExternalLink size={14} /> View Resume
              </a>
              <a href="https://github.com/Aaravkhanal" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/80 text-sm hover:bg-white/5 hover:text-white transition-all">
                <FaGithub size={14} /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* ── Pillar Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => <PillarCard key={p.title} p={p} />)}
        </div>
      </div>
    </section>
  );
}
