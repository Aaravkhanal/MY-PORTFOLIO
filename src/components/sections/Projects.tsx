"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";
import { FiArrowRight, FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import Image from "next/image";

type Category = "AI & Products" | "Research & ML" | "CLI & Developer Tools" | "Apps & Experiments";
type Project = {
  id: string;
  rank: number;
  architecture: Array<{ label: string; detail: string }>;
  demo?: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
  image?: string;
  accent: string;
  category: Category;
};

const projects = ([
  {
    id: "understandvideo-ai", title: "UnderstandVideo", subtitle: "Grounded video understanding workspace",
    rank: 3,
    architecture: [{"label": "Video source", "detail": "Import a local video or supported link"}, {"label": "Processing jobs", "detail": "Decode media, find scenes, transcribe, and diarize"}, {"label": "Workspace index", "detail": "Store transcript, moments, and conversation context"}, {"label": "Grounded answers", "detail": "Return answers linked to video timestamps"}],
    demo: "https://understandvideo-ai.onrender.com",
    description: "A focused workspace for exploring video through searchable transcripts, scene navigation, and timestamp-grounded answers. The interface keeps answers connected to moments in the source video so users can verify context instead of relying on a black-box summary.",
    highlights: ["Searchable transcripts and scene navigation", "Timestamp-grounded question answering", "Python and PyTorch application"], tech: ["Python", "PyTorch", "Video AI"], github: "https://github.com/Aaravkhanal/understandvideo-ai", category: "AI & Products", accent: "from-cyan-500 to-blue-600",
  },
  {
    id: "projectmind", title: "ProjectMind AI", subtitle: "Multi-agent code review and repository intelligence",
    rank: 1,
    architecture: [{"label": "Repository", "detail": "Inspect the local codebase and project context"}, {"label": "Project Brain", "detail": "Reuse persistent project knowledge"}, {"label": "Specialist agents", "detail": "Run architecture, security, and quality reviews in parallel"}, {"label": "Synthesis", "detail": "Prioritize findings in one review"}],
    description: "An AI-powered development workspace that analyzes repositories, builds persistent project context, and coordinates specialized reviews across code quality, security, and architecture. Its BYOK design keeps provider credentials local while supporting multiple model providers.",
    highlights: ["Persistent repository knowledge", "Parallel specialist code reviews", "Provider-agnostic model routing"], tech: ["Python", "FastAPI", "LangGraph", "LiteLLM"], github: "https://github.com/Aaravkhanal/ProjectMind-AI", image: "/projects/projectmind-white.png", category: "AI & Products", accent: "from-blue-600 to-purple-600",
  },
  {
    id: "jubidate", title: "Jubidate", subtitle: "Multi-agent strategic intelligence",
    rank: 4,
    architecture: [{"label": "Strategic objective", "detail": "Set the question and debate format"}, {"label": "Role assignment", "detail": "Select pro, con, judge, and auditor models"}, {"label": "Live debate", "detail": "Stream agent turns over WebSockets"}, {"label": "Synthesis", "detail": "Produce a structured strategic report"}],
    demo: "https://jubidate-ai.vercel.app",
    description: "A platform for structured AI reasoning where models take roles such as advocate, critic, judge, and auditor. It supports live debate and other workflows, then turns the discussion into a strategic report with evidence and reasoning made easier to inspect.",
    highlights: ["Role-based multi-agent simulations", "Live WebSocket interaction and voice features", "Debate, voting, reflection, and sequential workflows"], tech: ["Python", "FastAPI", "Next.js", "WebSockets"], github: "https://github.com/Aaravkhanal/Jubidate_ai", image: "/projects/jubidate.png", category: "AI & Products", accent: "from-purple-600 to-pink-600",
  },
  {
    id: "aura", title: "AUЯA", subtitle: "AI fashion discovery and virtual try-on",
    rank: 13,
    architecture: [{"label": "Personal inputs", "detail": "Provide a photo and body measurements"}, {"label": "Digital twin", "detail": "Prepare a user-specific representation"}, {"label": "Fashion discovery", "detail": "Find garments through Pinterest"}, {"label": "Virtual try-on", "detail": "Send a garment and twin to IDM-VTON"}],
    description: "A fashion technology experience combining personalized styling, trend discovery, and virtual try-on. The product explores digital-twin creation and AI-assisted outfit recommendations alongside a polished shopping interface.",
    highlights: ["Virtual try-on and digital-twin concepts", "Fashion discovery and personalized styling", "Responsive, animation-rich shopping experience"], tech: ["Next.js", "Node.js", "AI vision", "Virtual try-on"], github: "https://github.com/Aaravkhanal/fashion_ai", image: "/projects/aura.png", category: "AI & Products", accent: "from-amber-500 to-rose-600",
  },
  {
    id: "neuralforge", title: "NeuralForge AI", subtitle: "End-to-end machine learning automation",
    rank: 6,
    architecture: [{"label": "Dataset", "detail": "Upload a tabular dataset"}, {"label": "Preparation", "detail": "Clean data and engineer features"}, {"label": "AutoML", "detail": "Train and compare candidate models"}, {"label": "Explain and export", "detail": "Inspect predictions and package a deployable model"}],
    description: "An ML automation platform designed to take a dataset through preparation, training, evaluation, explainability, and deployment. The goal is to make a repeatable model-building workflow accessible through one product.",
    highlights: ["Automated data preparation and model training", "Explainability with SHAP and LIME", "Export-oriented deployment workflow"], tech: ["TypeScript", "FastAPI", "Scikit-learn", "Docker"], github: "https://github.com/Aaravkhanal/NEURALFORGEAI", image: "/projects/neuralforge.png", category: "AI & Products", accent: "from-teal-500 to-cyan-600",
  },
  {
    id: "frameflow", title: "FrameFlow AI", subtitle: "From visual references to frontend code",
    rank: 7,
    architecture: [{"label": "Visual input", "detail": "Provide a screenshot, Figma file, URL, or recording"}, {"label": "Asset analysis", "detail": "Extract layout and reusable visual assets"}, {"label": "Model consensus", "detail": "Compare code suggestions across models"}, {"label": "Preview and export", "detail": "Generate frontend files for a chosen framework"}],
    description: "A code-generation tool that turns screenshots, Figma designs, URLs, and screen recordings into frontend starting points. It combines visual input, asset extraction, and multiple models to speed up interface implementation.",
    highlights: ["Accepts screenshots, Figma files, URLs, and recordings", "Automated asset extraction", "Targets multiple frontend frameworks"], tech: ["Python", "TypeScript", "AI code generation"], github: "https://github.com/Aaravkhanal/Frameflow-ai", category: "AI & Products", accent: "from-orange-500 to-pink-600",
  },
  {
    id: "nexora", title: "Nexora Intelligence", subtitle: "Company research and strategic analysis",
    rank: 11,
    architecture: [{"label": "Company query", "detail": "Create a research job and stream progress"}, {"label": "Collectors", "detail": "Gather company and competitor information"}, {"label": "Analysis agents", "detail": "Synthesize finance, product, and strategy findings"}, {"label": "Research workspace", "detail": "Show sourced dashboards and RAG follow-up"}],
    description: "An AI company-intelligence workspace that gathers and organizes business research into source-backed views. It supports competitor analysis, SWOT and financial insights, interactive dashboards, and follow-up questions over a persistent knowledge base.",
    highlights: ["Company and competitor research", "Source-backed analysis and dashboards", "RAG assistant for follow-up questions"], tech: ["Python", "RAG", "Multi-agent AI"], github: "https://github.com/Aaravkhanal/NEXORA-AI", category: "AI & Products", accent: "from-indigo-500 to-violet-600",
  },
  {
    id: "vibe-ai", title: "Vibe-AI", subtitle: "Website performance monitoring and optimization",
    rank: 8,
    architecture: [{"label": "Website URL", "detail": "Start an audit for a site"}, {"label": "Route discovery", "detail": "Map pages from links and sitemaps"}, {"label": "Audit workers", "detail": "Run Lighthouse and collect CrUX signals"}, {"label": "Results", "detail": "Aggregate performance findings in CLI and dashboard"}],
    description: "A website health platform that runs Lighthouse scans across routes, tracks Core Web Vitals, and helps teams spot performance regressions. The repository describes both a local CLI and a cloud dashboard experience.",
    highlights: ["Route discovery and concurrent Lighthouse audits", "CrUX and real-world performance signals", "Local CLI and cloud product workflows"], tech: ["JavaScript", "Lighthouse", "Puppeteer", "Vue"], github: "https://github.com/Aaravkhanal/VIBE-AI", category: "AI & Products", accent: "from-lime-500 to-emerald-600",
  },
  {
    id: "vibe-shield", title: "VIBE SHIELD", subtitle: "Autonomous application security and quality scanner",
    rank: 9,
    architecture: [{"label": "Target app", "detail": "Crawl reachable application surfaces"}, {"label": "Orchestrator", "detail": "Coordinate six specialist scanning agents"}, {"label": "Findings ledger", "detail": "Combine checks through an event-driven bus"}, {"label": "Attack chains", "detail": "Correlate issues into a prioritized report"}],
    description: "A scanner for AI-assisted applications that crawls an app, generates checks, and examines security, business logic, API flows, and AI endpoints. Findings are grouped into correlated attack paths and an actionable report.",
    highlights: ["Security and functional testing", "Prompt-injection and AI abuse checks", "Attack-chain correlation and reporting"], tech: ["JavaScript", "Application security", "AI testing"], github: "https://github.com/Aaravkhanal/VIBE-SHIELD", category: "AI & Products", accent: "from-rose-500 to-orange-600",
  },
  {
    id: "medexplain", title: "MedExplain AI", subtitle: "Plain-language explanations for medical reports",
    rank: 14,
    architecture: [{"label": "Report upload", "detail": "Accept a PDF or image"}, {"label": "OCR", "detail": "Extract report text"}, {"label": "AI explanation", "detail": "Translate findings into plain language"}, {"label": "Structured result", "detail": "Present a readable breakdown to the user"}],
    description: "A web application that extracts text from uploaded clinical reports and explains findings in more approachable language. It is designed to help people understand terminology and results before discussing them with a clinician.",
    highlights: ["PDF and image report input", "OCR-assisted text extraction", "Structured, patient-friendly explanations"], tech: ["TypeScript", "OCR", "Generative AI"], github: "https://github.com/Aaravkhanal/medicalreportanalyzer", category: "AI & Products", accent: "from-sky-500 to-teal-600",
  },
  {
    id: "zaika", title: "Zaika AI", subtitle: "Personal culinary companion",
    rank: 15,
    architecture: [{"label": "Taste and mood", "detail": "Capture the cooking request and preferences"}, {"label": "Recipe assistant", "detail": "Generate or adapt recipe ideas"}, {"label": "Personalized result", "detail": "Return a recipe matched to the request"}, {"label": "Cookbook", "detail": "Keep saved recipes available in the app"}],
    description: "An AI-assisted cooking and recipe experience that helps people discover meals and adapt ideas to their preferences, mood, and favorite cuisines. The product is built around a conversational sous-chef approach.",
    highlights: ["Personalized recipe discovery", "Conversational cooking guidance", "Modern full-stack recipe experience"], tech: ["Next.js", "TypeScript", "Prisma", "AI"], github: "https://github.com/Aaravkhanal/Zaika-ai", category: "AI & Products", accent: "from-orange-400 to-amber-600",
  },
  {
    id: "canary-study", title: "Canary Memorization Study", subtitle: "Measuring memorization and recombination in language models",
    rank: 5,
    architecture: [{"label": "Controlled corpus", "detail": "Plant canaries at planned frequencies"}, {"label": "Model grid", "detail": "Train matched models across architectures"}, {"label": "Automated measures", "detail": "Evaluate exposure, extraction, and copying diagnostics"}, {"label": "Human ratings", "detail": "Keep blinded novelty analysis separate; still pending"}],
    description: "An experimental study of whether exposure to recurring narrative elements changes recall or human-rated recombination in generated stories, and how results vary by model architecture. The repository separates extraction, copying diagnostics, and blinded human judgments rather than treating lexical diversity as creativity.",
    highlights: ["Controlled planted-canary exposure methodology", "Matched model-size and architecture comparisons", "Separate memorization and human-judgment measures"], tech: ["Python", "Language models", "Experimental design"], github: "https://github.com/Aaravkhanal/canary-memorization-study", category: "Research & ML", accent: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "my-llm", title: "AARAV-LLM", subtitle: "A small language model and training stack built from scratch",
    rank: 12,
    architecture: [{"label": "Training data", "detail": "Prepare text and tokenize it"}, {"label": "Model training", "detail": "Train a decoder-only transformer locally"}, {"label": "Evaluation", "detail": "Measure checkpoints and fine-tune"}, {"label": "Serving", "detail": "Use the model from CLI, API, or web chat"}],
    description: "A decoder-only language model trained from random initialization, together with its tokenizer, data pipeline, trainer, evaluation tools, fine-tuning, terminal chat, HTTP API, and web interface. The project runs locally without calling an external model service.",
    highlights: ["End-to-end model training stack", "Local inference and fine-tuning", "Terminal, API, and web chat interfaces"], tech: ["Python", "PyTorch", "Language models"], github: "https://github.com/Aaravkhanal/MY-LLM", category: "Research & ML", accent: "from-violet-500 to-blue-600",
  },
  {
    id: "codexa", title: "CODEXA", subtitle: "Terminal-native AI coding agent",
    rank: 2,
    architecture: [{"label": "Task", "detail": "Describe the change from the terminal"}, {"label": "Plan", "detail": "Explore and break down the work"}, {"label": "Build", "detail": "Use local tools to edit and run the project"}, {"label": "Review", "detail": "Test, debug, and inspect the final diff"}],
    description: "An open-source coding agent built for the command line, with PLAN and BUILD modes, streaming model responses, persistent terminal sessions, local key handling, codebase intelligence, and MCP integrations.",
    highlights: ["Plan and build workflows in the terminal", "Codebase context with CodexaLens", "MCP integrations and persistent sessions"], tech: ["TypeScript", "Node.js", "MCP", "CLI"], github: "https://github.com/Aaravkhanal/CODEXA", category: "CLI & Developer Tools", accent: "from-cyan-500 to-indigo-600",
  },
  {
    id: "gitown", title: "GITOWN", subtitle: "An independent home for code",
    rank: 10,
    architecture: [{"label": "Git client", "detail": "Create, push, and pull repositories"}, {"label": "Go API", "detail": "Coordinate Git and review operations"}, {"label": "PostgreSQL", "detail": "Store repository and pull-request metadata"}, {"label": "Git storage", "detail": "Serve branches and diffs for review and merge"}],
    description: "An early-stage code-hosting platform with a Next.js interface, Go API, PostgreSQL metadata, and native Git repository storage. Its current implementation supports repository creation, Git pushes, pull requests, diffs, merges, and pulling changes locally.",
    highlights: ["Native Git repository storage", "Pull requests, diffs, and merges", "Development alpha with documented feature boundaries"], tech: ["Go", "Next.js", "PostgreSQL", "Git"], github: "https://github.com/Aaravkhanal/GITOWN", category: "CLI & Developer Tools", accent: "from-slate-400 to-cyan-600",
  },
] satisfies Project[]).sort((a, b) => a.rank - b.rank);

const categories: Array<"All work" | Category> = ["All work", "AI & Products", "Research & ML", "CLI & Developer Tools"];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<(typeof categories)[number]>("All work");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const visibleProjects = category === "All work" ? projects : projects.filter((project) => project.category === category);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      if (!titleRef.current) return;
      gsap.fromTo(titleRef.current, { y: 45, opacity: 0 }, {
        y: 0, opacity: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", end: "top 45%", scrub: 1 },
      });
    }, sectionRef);
    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 w-full py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div ref={titleRef} className="mb-12 text-center md:mb-16">
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-accent-blue">A growing body of work</span>
          <h2 className="mb-5 text-4xl font-bold tracking-tighter md:text-6xl">Projects &amp; <span className="text-gradient">Research</span></h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">
            A curated selection of {projects.length} projects across AI products, language-model research, and developer tools.
          </p>
          <a href="https://github.com/Aaravkhanal?tab=repositories" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
            <FaGithub size={15} /> Browse all GitHub repositories <FiArrowUpRight />
          </a>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2" aria-label="Filter projects by category">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => { setCategory(item); setActiveProject(null); }} aria-pressed={category === item}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${category === item ? "border-white/30 bg-white text-black" : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white"}`}>
              {item === "All work" ? `${item} · ${projects.length}` : `${item} · ${projects.filter((project) => project.category === item).length}`}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => {
              const isOpen = activeProject === project.id;
              return (
                <motion.article key={project.id} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.2) }}
                  className={`glass-panel group overflow-hidden transition-colors hover:border-white/20 ${isOpen ? "md:col-span-2" : ""}`}>
                  <div className="flex h-full flex-col">
                    <div className={`relative ${project.image ? "aspect-[16/8]" : "h-28"} overflow-hidden bg-gradient-to-br ${project.accent}`}>
                      {project.image ? <>
                        <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 mix-blend-screen`} />
                      </> : <div className="absolute inset-0 flex items-center justify-between px-7">
                        <span className="font-mono text-4xl font-semibold tracking-tight text-white/80">{project.title.slice(0, 2).toUpperCase()}</span>
                        <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/60">{project.category}</span>
                      </div>}
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur">{project.category}</span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{project.title}</h3>
                          <p className="mt-1 text-sm text-accent-purple">{project.subtitle}</p>
                        </div>
                        <button type="button" aria-expanded={isOpen} aria-label={`${isOpen ? "Collapse" : "Expand"} ${project.title} details`} onClick={() => setActiveProject(isOpen ? null : project.id)} className="mt-1 rounded-full border border-white/10 p-2 text-white/50 transition hover:border-white/30 hover:text-white">
                          <FiChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      <p className="mb-5 text-sm leading-relaxed text-white/55">{project.description}</p>
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.tech.map((item) => <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/60">{item}</span>)}
                      </div>
                      <div className="mb-6 rounded-xl border border-white/[0.08] bg-black/20 p-4" role="group" aria-label={`${project.title} architecture flow`}>
                        <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Architecture</h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                          {project.architecture.map((stage, stageIndex) => (
                            <div key={stage.label} className="flex items-center gap-2">
                              <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/70">{stage.label}</span>
                              {stageIndex < project.architecture.length - 1 && <FiArrowRight aria-hidden="true" className="text-white/25" size={13} />}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                        <div className="flex flex-wrap items-center gap-4">
                          {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-accent-cyan transition hover:text-white">Live demo <FiArrowUpRight /></a>}
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"><FaGithub size={15} /> Source code <FiArrowUpRight /></a>
                        </div>
                        <button type="button" onClick={() => setActiveProject(isOpen ? null : project.id)} className="text-xs text-white/35 transition hover:text-white/70">{isOpen ? "Hide details" : "More details"}</button>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="mt-5 grid gap-6 border-t border-white/[0.07] pt-5 md:grid-cols-2">
                            <div>
                              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">System flow</h4>
                              <ol className="space-y-3">
                                {project.architecture.map((stage, stageIndex) => (
                                  <li key={stage.label} className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent-blue/30 bg-accent-blue/10 font-mono text-[10px] text-accent-cyan">{String(stageIndex + 1).padStart(2, "0")}</span>
                                    <div><p className="text-sm font-medium text-white/75">{stage.label}</p><p className="mt-0.5 text-xs leading-relaxed text-white/40">{stage.detail}</p></div>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div>
                              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">Highlights</h4>
                              <ul className="space-y-2">{project.highlights.map((highlight) => <li key={highlight} className="flex gap-2 text-sm text-white/60"><span className="text-accent-cyan">↗</span>{highlight}</li>)}</ul>
                            </div>
                          </div>
                        </motion.div>}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
