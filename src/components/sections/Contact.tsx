"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── EmailJS Config ────────────────────────────────────────────────────────────
// Service ID is already set. You need to:
//  1. Go to https://www.emailjs.com/
//  2. Create an Email Template → copy the Template ID below
//  3. Go to Account → API Keys → copy the Public Key below
const EMAILJS_SERVICE_ID  = "service_qqhayf7";     // ✅ Configured
const EMAILJS_TEMPLATE_ID = "template_yscespp";    // ✅ Configured
const EMAILJS_PUBLIC_KEY  = "F5U1bcuTG9hSeOqJk";   // ✅ Configured
// ───────────────────────────────────────────────────────────────────────────────

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    handle: "@Aaravkhanal",
    url: "https://github.com/Aaravkhanal",
    hoverClass: "hover:border-white/40 hover:bg-white/5",
    iconColor: "group-hover:text-white",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    handle: "Aarav Khanal",
    url: "https://www.linkedin.com/in/aarav-khanal-40795832a/",
    hoverClass: "hover:border-blue-500/40 hover:bg-blue-500/5",
    iconColor: "group-hover:text-blue-400",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    handle: "@a__khanal",
    url: "https://www.instagram.com/a__khanal/",
    hoverClass: "hover:border-pink-500/40 hover:bg-pink-500/5",
    iconColor: "group-hover:text-pink-400",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    handle: "khanalaarav2063@gmail.com",
    url: "mailto:khanalaarav2063@gmail.com",
    hoverClass: "hover:border-cyan-500/40 hover:bg-cyan-500/5",
    iconColor: "group-hover:text-cyan-400",
  },
];

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { scale: 0.95, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in Name, Email, and Message.");
      return;
    }

    setFormState("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: name,           // matches {{name}} in template
          email: email,         // matches {{email}} in template
          title: subject || "Portfolio Contact",  // matches {{title}} in template
          message: message,     // matches {{message}} in template
        },
        EMAILJS_PUBLIC_KEY
      );
      setFormState("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("EmailJS Error:", err);
      setFormState("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-32 z-10"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-accent-blue mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Open to collaborations, freelance projects, and full-time AI engineering opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Social Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-2">Find me on</p>
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex items-center gap-4 p-4 rounded-xl border border-white/10 glass-panel ${s.hoverClass} transition-all duration-300 group`}
              >
                <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <s.icon
                    size={18}
                    className={`text-white/50 transition-colors ${s.iconColor}`}
                  />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider">{s.label}</p>
                  <p className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">
                    {s.handle}
                  </p>
                </div>
                <div className="ml-auto text-white/20 group-hover:text-white/60 transition-colors text-sm">→</div>
              </motion.a>
            ))}

            {/* Availability badge */}
            <div className="mt-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-400 font-medium">Available for opportunities</span>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-panel p-8 flex flex-col gap-5">
              <p className="text-xs font-mono uppercase tracking-widest text-white/30">Send a message</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent-blue/60 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent-blue/60 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-white/40 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent-blue/60 transition-colors"
                  placeholder="Collaboration opportunity..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-white/40 uppercase tracking-wider">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent-blue/60 transition-colors resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              {/* Success / Error messages */}
              <AnimatePresence>
                {formState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
                  >
                    ✅ Message sent! I&apos;ll get back to you soon.
                  </motion.div>
                )}
                {formState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                  >
                    ❌ Something went wrong. Please email me directly at khanalaarav2063@gmail.com
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "sending" ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-sm">
            © 2025 Aarav Khanal. Built with Next.js, Three.js & passion.
          </p>
          <p className="text-white/20 text-sm font-mono">
            khanalaarav2063@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
