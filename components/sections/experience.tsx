"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const ref = useRef(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { experience } = resumeData;

  useEffect(() => {
    if (timelineRef.current) {
      const cards = timelineRef.current.querySelectorAll(".experience-card");

      cards.forEach((card, index) => {
        // Slide in from alternate sides
        const direction = index % 2 === 0 ? -100 : 100;

        gsap.fromTo(
          card,
          {
            x: direction,
            opacity: 0,
            rotateY: direction > 0 ? -15 : 15,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="experience" className="py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            Experience
          </h2>
          <p className="text-3xl md:text-4xl font-bold max-w-2xl text-balance">
            Building quality into every project
          </p>
        </motion.div>

        <div ref={timelineRef} className="space-y-8" style={{ perspective: "1000px" }}>
          {experience.map((job, index) => (
            <div
              key={index}
              className="experience-card group"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget.querySelector(".card-inner"), {
                  scale: 1.02,
                  boxShadow: "0 20px 40px -20px var(--primary)",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget.querySelector(".card-inner"), {
                  scale: 1,
                  boxShadow: "none",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              <div className="card-inner grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="text-sm text-muted-foreground">
                  <span className="block font-medium">{job.period}</span>
                  {job.current && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Current
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {job.role}
                      </h3>
                      <p className="text-primary mt-1">{job.company}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {job.description}
                  </p>

                  {job.highlights && job.highlights.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
