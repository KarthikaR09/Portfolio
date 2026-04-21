"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const ref = useRef(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { skills } = resumeData;

  useEffect(() => {
    if (toolsRef.current) {
      const toolCards = toolsRef.current.querySelectorAll(".tool-card");

      toolCards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            rotateY: -90,
            opacity: 0,
          },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="py-24 lg:py-32 bg-card/50" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            Skills
          </h2>
          <p className="text-3xl md:text-4xl font-bold max-w-2xl text-balance">
            Technical expertise and soft skills
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Core Competencies */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg font-semibold mb-6"
            >
              Core Competencies
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap gap-2"
            >
              {skills.core.map((skill, index) => (
                <motion.span
                  key={index}
                  variants={itemVariants}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Tools */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-semibold mb-6"
            >
              Tools & Technologies
            </motion.h3>
            <div ref={toolsRef} className="grid grid-cols-2 gap-3" style={{ perspective: "1000px" }}>
              {skills.tools.map((tool, index) => (
                <div
                  key={index}
                  className="tool-card p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.05,
                      rotateX: 5,
                      rotateY: 5,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      rotateX: 0,
                      rotateY: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                >
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tool.category}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg font-semibold mb-6"
            >
              Soft Skills
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-3"
            >
              {skills.soft.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 group"
                >
                  <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
