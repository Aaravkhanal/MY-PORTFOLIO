"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaChevronDown } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

const projects = [
  {
    id: 0,
    title: "ProjectMind AI",
    subtitle: "Production-Grade Multi-Agent AI Engineering Platform",
    description: `ProjectMind AI transforms any software project into a self-learning development workspace. Instead of relying on a single AI model, it automatically discovers your environment, securely connects to available AI providers, and intelligently routes every task to the most suitable model.

Built with a privacy-first BYOK architecture, API keys never leave your machine. At its core is the Repository Brain — a persistent memory engine that continuously learns from code reviews, bug fixes, and architectural decisions.

LangGraph-powered multi-agent orchestration enables specialized agents for architecture, security, and code quality to work in parallel before a synthesizer combines findings into a single prioritized review.`,
    highlights: [
      "🚀 Zero-configuration environment discovery",
      "🧠 Persistent Repository Brain with long-term memory",
      "🤖 Multi-Agent AI collaboration using LangGraph",
      "🔒 Privacy-first BYOK with encrypted local key storage",
      "💰 Built-in token tracking & cost optimization",
      "🌐 Support for 15+ AI providers",
    ],
    tech: ["Next.js", "Python", "FastAPI", "LangGraph", "LiteLLM", "SQLite", "Langfuse"],
    github: "https://github.com/Aaravkhanal/ProjectMind-AI",
    image: "/projects/projectmind.png",
    accent: "from-blue-600 to-purple-600",
    tag: "Featured",
  },
  {
    id: 1,
    title: "Jubidate",
    subtitle: "Strategic Intelligence OS",
    description: `Jubidate transforms traditional chatbot interactions into structured, multi-agent strategic reasoning. Users define a strategic objective and assign AI models to roles — Pro Advocate, Con Advocate, Judge, and Auditor.

These agents engage in live multi-turn debates through WebSocket streaming, with arguments evolving before a Judge model generates a comprehensive strategic report highlighting the winning perspective, evidence quality, and logical gaps.`,
    highlights: [
      "🤖 Multi-agent AI orchestration with dynamic role assignment",
      "⚡ Real-time WebSocket streaming for live collaboration",
      "🧠 Parallel reasoning across multiple LLMs",
      "📊 Evidence quality scoring & reasoning transparency",
      "🏛️ AI Debate, Voting, Reflection & Sequential Pipelines",
      "🔗 Provider-agnostic: NVIDIA NIM, Gemini, Groq, OpenRouter",
    ],
    tech: ["Next.js 15", "React 19", "FastAPI", "WebSockets", "LiteLLM", "SQLite", "NVIDIA NIM"],
    github: "https://github.com/Aaravkhanal/Jubidate_ai",
    image: "/projects/jubidate.png",
    accent: "from-purple-600 to-pink-600",
    tag: "AI Orchestration",
  },
  {
    id: 2,
    title: "AUЯA",
    subtitle: "Bespoke Digital Atelier",
    description: `AUЯA reimagines online shopping by combining personalized styling, real-time fashion discovery, and Virtual Try-On (VTON) technology. A digital representation of the user is generated using biometric inputs, then the platform retrieves trending fashion via Pinterest API and leverages the IDM-VTON diffusion model for realistic try-on results.

AUЯA features a conversational AI stylist capable of curating personalized outfits and recommending complete looks for different occasions.`,
    highlights: [
      "👗 AI Virtual Try-On using IDM-VTON diffusion model",
      "🧬 Personalized avatar via biometric user data",
      "📌 Real-time fashion discovery through Pinterest API",
      "🤖 Conversational AI stylist for outfit recommendations",
      "✨ High-fidelity garment rendering with fabric preservation",
      "📱 Premium responsive UI with luxury animations",
    ],
    tech: ["Next.js", "React", "Framer Motion", "Node.js", "Express.js", "Hugging Face IDM-VTON", "Pinterest API"],
    github: "https://github.com/Aaravkhanal/fashion_ai",
    image: "/projects/aura.png",
    accent: "from-amber-500 to-rose-600",
    tag: "AI + Fashion",
  },
  {
    id: 3,
    title: "NeuralForge",
    subtitle: "Intelligent End-to-End ML Orchestration",
    description: `NeuralForge automates the complete ML lifecycle — from data preprocessing and feature engineering to model training, explainability, and containerized deployment. Specialized AI agents collaborate as Data Scientists, ML Engineers, MLOps Engineers, and DevOps Experts.

Users upload raw datasets, get automatic cleaning, train multiple models via AutoML, and receive fully deployable FastAPI + Docker packages — all in a few clicks. The Explainable AI Playground lets users interpret predictions using SHAP, LIME, and natural-language explanations.`,
    highlights: [
      "🤖 Multi-agent orchestration (10 specialized ML agents)",
      "🔬 Automated data cleaning & feature engineering",
      "⚙️ Intelligent AutoML with hyperparameter optimization",
      "🔍 Explainable AI: SHAP, LIME, Decision Paths",
      "📦 One-click export: ONNX, Joblib, PMML, Docker",
      "📊 Comprehensive JSON, HTML, PDF pipeline reports",
    ],
    tech: ["Next.js", "FastAPI", "LangGraph", "Scikit-Learn", "XGBoost", "SHAP", "Docker"],
    github: "https://github.com/Aaravkhanal/NEURALFORGEAI",
    image: "/projects/neuralforge.png",
    accent: "from-teal-500 to-cyan-600",
    tag: "MLOps",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-32 z-10"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div ref={titleRef} className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-accent-blue mb-4 block">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Production-grade AI systems built from the ground up — click any project to explore.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group"
            >
              {/* Card */}
              <div
                className="glass-panel overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/20"
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              >
                {/* Card Header - Always visible */}
                <div className="flex flex-col md:flex-row gap-0">
                  {/* Image */}
                  <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto md:min-h-[240px] overflow-hidden flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 group-hover:opacity-30 transition-opacity z-10`} />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Tag */}
                    <span className={`absolute top-4 left-4 z-20 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.accent} text-white`}>
                      {project.tag}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold tracking-tight group-hover:text-white transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-accent-purple text-sm mt-1 tracking-wide">{project.subtitle}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: activeProject === project.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-white/30 group-hover:text-white/60 transition-colors mt-1 flex-shrink-0 ml-4"
                        >
                          <FaChevronDown size={16} />
                        </motion.div>
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/60"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 5 && (
                          <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/40">
                            +{project.tech.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-6">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2 rounded-full"
                      >
                        <FaGithub size={15} />
                        Source Code
                      </a>
                      <span className="text-white/20 text-sm">
                        {activeProject === project.id ? "Click to collapse" : "Click to explore →"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expandable Description */}
                <AnimatePresence>
                  {activeProject === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Description */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Overview</h4>
                          <p className="text-white/60 leading-relaxed text-sm whitespace-pre-line">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-6">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent-cyan"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Key Highlights</h4>
                          <ul className="flex flex-col gap-3">
                            {project.highlights.map((h, i) => (
                              <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                                {h}
                              </li>
                            ))}
                          </ul>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${project.accent} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
                          >
                            <FaGithub size={16} />
                            View on GitHub
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
