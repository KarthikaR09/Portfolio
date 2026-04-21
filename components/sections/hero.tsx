"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { resumeData } from "@/data/resume";
import { ArrowDown, Linkedin, Mail, Phone } from "lucide-react";

export function Hero() {
  const { personal } = resumeData;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgOrb1Ref = useRef<HTMLDivElement>(null);
  const bgOrb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Text scramble animation for title
    if (titleRef.current) {
      const text = personal.name;
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      let iteration = 0;

      const scrambleInterval = setInterval(() => {
        if (titleRef.current) {
          titleRef.current.innerText = text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

          if (iteration >= text.length) {
            clearInterval(scrambleInterval);
          }
          iteration += 1 / 3;
        }
      }, 30);

      return () => clearInterval(scrambleInterval);
    }
  }, [personal.name]);

  useEffect(() => {
    // Magnetic cursor and parallax effect using native performant JS
    const cursor = cursorRef.current;
    const hero = heroRef.current;
    const orb1 = bgOrb1Ref.current;
    const orb2 = bgOrb2Ref.current;

    if (!cursor || !hero) return;

    // Use requestAnimationFrame for smooth performance
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let cursorScale = 1;
    let currentCursorScale = 1;
    
    // Smooth interpolation factor
    const ease = 0.15;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Interpolate cursor position
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      currentCursorScale += (cursorScale - currentCursorScale) * (ease * 1.5);

      if (cursor) {
        cursor.style.transform = `translate(${currentX - 16}px, ${currentY - 16}px) scale(${currentCursorScale})`;
      }

      // Parallax for orbs
      const { innerWidth, innerHeight } = window;
      const xPercent = (currentX / innerWidth - 0.5) * 2;
      const yPercent = (currentY / innerHeight - 0.5) * 2;

      if (orb1) {
        orb1.style.transform = `translate(${xPercent * 30}px, ${yPercent * 30}px)`;
      }

      if (orb2) {
        orb2.style.transform = `translate(${xPercent * -20}px, ${yPercent * -20}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      cursorScale = 2.5;
    };

    const onMouseLeaveLink = () => {
      cursorScale = 1;
    };

    hero.addEventListener("mousemove", onMouseMove);
    // Initialize target position to center initially
    targetX = window.innerWidth / 2;
    targetY = window.innerHeight / 2;
    currentX = targetX;
    currentY = targetY;
    
    rafId = requestAnimationFrame(animate);

    const links = hero.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="hidden lg:block fixed w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div
          ref={bgOrb1Ref}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <div
          ref={bgOrb2Ref}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Name & Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {personal.name}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary font-medium mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {personal.title}
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground mt-6 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {personal.tagline}
            </motion.p>

            {/* Navigation Links */}
            <motion.nav
              className="mt-12 flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {["About", "Experience", "Projects", "Skills", "Contact"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="h-px w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-primary transition-all duration-300" />
                    <span className="text-sm font-medium uppercase tracking-widest">
                      {item}
                    </span>
                  </motion.a>
                )
              )}
            </motion.nav>

            {/* Social Links */}
            <motion.div
              className="mt-12 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <a
                href={personal.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personal.contact.email}`}
                className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`tel:${personal.contact.phone}`}
                className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pl-8"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              {personal.bio}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
