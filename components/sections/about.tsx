"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resume";
import { GraduationCap, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const ref = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const responsibilitiesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { education, responsibilities } = resumeData;

  useEffect(() => {
    // Education card 3D tilt effect
    if (cardRef.current) {
      const card = cardRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    // Staggered text reveal for responsibilities
    if (responsibilitiesRef.current) {
      const items = responsibilitiesRef.current.querySelectorAll(".responsibility-item");

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            About Me
          </h2>
          <p className="text-3xl md:text-4xl font-bold max-w-2xl text-balance">
            Dedicated to delivering software excellence through quality
            assurance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              ref={cardRef}
              className="p-8 rounded-2xl bg-card border border-border"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <p className="text-lg font-medium">{education.degree}</p>
              <p className="text-muted-foreground mt-2">
                {education.institution}
              </p>
            </div>
          </motion.div>

          {/* Key Responsibilities */}
          <div ref={responsibilitiesRef} className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Key Responsibilities</h3>
            {responsibilities.slice(0, 9).map((item, index) => (
              <div
                key={index}
                className="responsibility-item flex items-start gap-3 group cursor-default"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    x: 10,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                  gsap.to(e.currentTarget.querySelector(".check-icon"), {
                    scale: 1.2,
                    rotate: 360,
                    duration: 0.4,
                    ease: "back.out(1.7)",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                  gsap.to(e.currentTarget.querySelector(".check-icon"), {
                    scale: 1,
                    rotate: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
              >
                <CheckCircle2 className="check-icon w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
