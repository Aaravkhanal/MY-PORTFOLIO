"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    title: "AI & Machine Learning",
    icon: "🧠",
    accent: "#3b82f6",
    skills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "LightGBM", "CatBoost", "SHAP", "LIME", "Optuna"],
  },
  {
    title: "Deep Learning",
    icon: "⚡",
    accent: "#8b5cf6",
    skills: ["CNNs", "Transformers", "Transfer Learning", "LoRA", "PEFT", "ONNX", "TensorRT", "HuggingFace"],
  },
  {
    title: "LLM Engineering",
    icon: "🤖",
    accent: "#06b6d4",
    skills: ["LangGraph", "LangChain", "LiteLLM", "MCP", "RAG", "Prompt Engineering", "Tool Calling", "Context Engineering", "Semantic Search", "Multi-Agent Systems", "Memory Systems", "Evaluation Pipelines"],
  },
  {
    title: "Backend Engineering",
    icon: "⚙️",
    accent: "#ef4444",
    skills: ["FastAPI", "Node.js", "Express", "WebSockets", "GraphQL", "REST APIs", "JWT", "OAuth", "SQLAlchemy", "Prisma"],
  },
  {
    title: "Frontend Engineering",
    icon: "✦",
    accent: "#ec4899",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "React Three Fiber", "GSAP", "shadcn/ui"],
  },
  {
    title: "Databases",
    icon: "🗄️",
    accent: "#14b8a6",
    skills: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "ChromaDB", "Pinecone", "FAISS"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: "☁️",
    accent: "#6366f1",
    skills: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "GitHub Actions", "Linux", "Nginx", "Terraform", "Vercel", "Render"],
  },
  {
    title: "MLOps & Observability",
    icon: "📈",
    accent: "#84cc16",
    skills: ["MLflow", "DVC", "LangFuse", "OpenTelemetry", "Weights & Biases", "CI/CD", "Drift Detection", "Experiment Tracking"],
  },
  {
    title: "Developer Tools",
    icon: "🛠️",
    accent: "#f97316",
    skills: ["Git", "VS Code", "Postman", "Docker Compose", "Bash", "Jupyter", "uv", "pip"],
  },
];

const highlights = [
  {
    value: 15,
    suffix: "+",
    label: "AI Applications Built",
    desc: "Designed and developed end-to-end AI systems across multiple domains.",
    accent: "#3b82f6",
    icon: "🚀",
  },
  {
    value: 10,
    suffix: "",
    label: "Specialized AI Agents",
    desc: "Autonomous agents collaborating through advanced orchestration workflows.",
    accent: "#8b5cf6",
    icon: "🤖",
  },
  {
    value: 4,
    suffix: "",
    label: "Production AI Platforms",
    desc: "Scalable AI platforms built with production-grade architecture.",
    accent: "#06b6d4",
    icon: "⚡",
  },
  {
    value: 1,
    suffix: "M+",
    label: "Lines of Code",
    desc: "High-quality code across AI, backend, frontend, and infrastructure.",
    accent: "#10b981",
    icon: "💻",
  },
  {
    value: 25,
    suffix: "+",
    label: "Technologies Mastered",
    desc: "Modern AI, cloud, backend, frontend, and MLOps ecosystem.",
    accent: "#f59e0b",
    icon: "🧬",
  },
  {
    value: 6,
    suffix: "",
    label: "End-to-End ML Pipelines",
    desc: "Data ingestion, training, evaluation, deployment, and monitoring.",
    accent: "#ec4899",
    icon: "🔬",
  },
];

const powered = [
  { name: "Python",       color: "#3776AB" },
  { name: "PyTorch",      color: "#EE4C2C" },
  { name: "TensorFlow",   color: "#FF6F00" },
  { name: "OpenAI",       color: "#412991" },
  { name: "Anthropic",    color: "#D97757" },
  { name: "Gemini",       color: "#4285F4" },
  { name: "LangGraph",    color: "#6366F1" },
  { name: "LangChain",    color: "#1C7C54" },
  { name: "LiteLLM",      color: "#8B5CF6" },
  { name: "Docker",       color: "#2496ED" },
  { name: "Kubernetes",   color: "#326CE5" },
  { name: "FastAPI",      color: "#009688" },
  { name: "React",        color: "#61DAFB" },
  { name: "Next.js",      color: "#FFFFFF" },
  { name: "PostgreSQL",   color: "#336791" },
  { name: "MongoDB",      color: "#47A248" },
  { name: "Redis",        color: "#DC382D" },
  { name: "GitHub",       color: "#FFFFFF" },
  { name: "AWS",          color: "#FF9900" },
  { name: "Linux",        color: "#FCC624" },
];

// ─── Chip Animation Variants ─────────────────────────────────────────────────
const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.035, ease: "easeOut" as const },
  }),
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── Skill Card ───────────────────────────────────────────────────────────────
function SkillCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [5, -5]), { stiffness: 250, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-5, 5]), { stiffness: 250, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative rounded-2xl overflow-hidden group cursor-default"
    >
      {/* Glass bg */}
      <div className="absolute inset-0 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.028)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.07)" }} />

      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}15)` }} />

      {/* Inner glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ boxShadow: `inset 0 0 50px ${cat.accent}10`, transition: "opacity 0.4s" }}
      />

      {/* Outer glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${cat.accent}18`, transition: "opacity 0.4s" }}
      />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <motion.div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
            style={{ background: `${cat.accent}18` }}
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ duration: 0.2 }}
          >
            {cat.icon}
          </motion.div>
          <h3 className="text-sm font-bold text-white tracking-wide leading-tight">{cat.title}</h3>
        </div>

        {/* Chips */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cat.skills.map((skill, i) => (
            <motion.span
              key={skill}
              custom={i}
              variants={chipVariants}
              whileHover={{ scale: 1.07, boxShadow: `0 0 14px ${cat.accent}45` }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/65 border border-white/[0.07] bg-black/25 hover:text-white transition-colors duration-200 cursor-default"
              style={{ borderColor: `${cat.accent}18` }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Highlight Card ───────────────────────────────────────────────────────────
function HighlightCard({ h, index }: { h: typeof highlights[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative rounded-2xl p-6 overflow-hidden group cursor-default"
    >
      {/* Glass */}
      <div className="absolute inset-0 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.028)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.07)" }} />

      {/* Animated border on hover */}
      <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ boxShadow: `0 0 40px ${h.accent}20, inset 0 0 40px ${h.accent}08`, transition: "opacity 0.4s" }} />

      {/* Radial glow behind */}
      <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${h.accent}10, transparent 70%)` }} />

      {/* Accent top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${h.accent}, ${h.accent}15)` }} />

      <div className="relative">
        {/* Icon */}
        <motion.div
          className="text-2xl mb-4"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          {h.icon}
        </motion.div>

        {/* Counter */}
        <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: h.accent }}>
          <AnimatedCounter value={h.value} suffix={h.suffix} />
        </div>

        <h4 className="text-sm font-bold text-white mb-2 tracking-wide">{h.label}</h4>
        <p className="text-xs text-white/35 leading-relaxed">{h.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Powered By Logo ──────────────────────────────────────────────────────────
function PoweredLogo({ tech }: { tech: typeof powered[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="relative flex items-center justify-center px-5 py-3 rounded-xl cursor-default group"
      style={{
        background: hovered ? `${tech.color}12` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? tech.color + "40" : "rgba(255,255,255,0.07)"}`,
        backdropFilter: "blur(10px)",
        transition: "background 0.3s, border-color 0.3s",
      }}
      title={tech.name}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={hovered ? "color" : "mono"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-semibold tracking-wide"
          style={{ color: hovered ? tech.color : "rgba(255,255,255,0.3)" }}
        >
          {tech.name}
        </motion.span>
      </AnimatePresence>

      {/* Glow on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ boxShadow: `0 0 20px ${tech.color}20` }}
        />
      )}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", end: "top 45%", scrub: 1 } }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative w-full py-32 z-10">
      {/* Background contrast overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">

        {/* ══════════════════════════════════════════════
            SKILLS GRID
        ══════════════════════════════════════════════ */}
        <div ref={titleRef} className="mb-16 text-center">
          <span className="inline-block text-xs font-mono tracking-[0.35em] uppercase text-blue-400 mb-4 opacity-80">
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-5">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-white/35 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A battle-tested stack spanning the full AI engineering lifecycle —
            from research to production-grade deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-32">
          {categories.map((cat, i) => (
            <SkillCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>

        {/* ══════════════════════════════════════════════
            ENGINEERING HIGHLIGHTS
        ══════════════════════════════════════════════ */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="inline-block text-xs font-mono tracking-[0.35em] uppercase text-blue-400 mb-4 opacity-80"
            >
              Engineering Impact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tighter"
            >
              By the <span className="text-gradient">Numbers</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((h, i) => (
              <HighlightCard key={i} h={h} index={i} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            POWERED BY
        ══════════════════════════════════════════════ */}
        <div>
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="inline-block text-xs font-mono tracking-[0.35em] uppercase text-blue-400 mb-4 opacity-80"
            >
              Stack
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold tracking-tight"
            >
              Powered <span className="text-gradient">By</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/30 text-sm mt-3"
            >
              Hover to reveal brand colors
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            className="flex flex-wrap justify-center gap-3"
          >
            {powered.map((tech, i) => (
              <motion.div
                key={tech.name}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } } }}
              >
                <PoweredLogo tech={tech} />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
