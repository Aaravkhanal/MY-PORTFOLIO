"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineEvents = [
  { year: "2024", role: "Senior AI Engineer", company: "Tech Innovations", description: "Led a team of 5 engineers to deploy large language models in production environments." },
  { year: "2022", role: "Machine Learning Engineer", company: "Data Systems Inc", description: "Developed predictive models improving recommendation accuracy by 25%." },
  { year: "2020", role: "Full Stack Developer", company: "Creative Web Agency", description: "Built responsive web applications and integrated early AI APIs for content generation." },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && lineRef.current) {
      // Animate central line
      gsap.fromTo(lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );

      // Animate events
      eventsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(el,
            { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
              }
            }
          );
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full py-32 z-10">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 uppercase tracking-widest">
        Journey
      </h2>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
          <div ref={lineRef} className="w-full bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan" />
        </div>

        <div className="flex flex-col gap-16">
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              ref={(el) => { eventsRef.current[index] = el; }}
              className={`relative flex items-center justify-start md:justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} pl-12 md:pl-0`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent-blue shadow-[0_0_15px_rgba(0,210,255,0.5)] -translate-x-1/2 z-10" />
              
              {/* Empty space for alternate side */}
              <div className="hidden md:block md:w-[45%]" />

              {/* Content Card */}
              <div className="w-full md:w-[45%] glass-panel p-6 hover:border-accent-blue/50 transition-colors duration-300">
                <span className="text-accent-cyan font-mono text-sm mb-2 block">{event.year}</span>
                <h3 className="text-xl font-bold text-white mb-1">{event.role}</h3>
                <h4 className="text-white/60 text-sm mb-4">{event.company}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
