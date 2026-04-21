"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

interface GsapRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export function GsapReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = "",
}: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated) return;

    // Use IntersectionObserver to lazy-load GSAP only when needed
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            // Lazy load GSAP
            const gsap = (await import("gsap")).default;
            
            let x = 0;
            let y = 0;

            switch (direction) {
              case "up": y = 50; break;
              case "down": y = -50; break;
              case "left": x = 50; break;
              case "right": x = -50; break;
            }

            gsap.fromTo(
              container,
              { opacity: 0, y, x },
              {
                opacity: 1,
                y: 0,
                x: 0,
                duration,
                delay,
                ease: "power3.out",
                onComplete: () => setHasAnimated(true)
              }
            );
            
            observer.unobserve(container);
          }
        });
      },
      {
        rootMargin: "50px", // Trigger slightly before it enters viewport
        threshold: 0.1
      }
    );

    // Set initial CSS state so it's hidden before JS loads
    container.style.opacity = "0";
    
    switch (direction) {
      case "up": container.style.transform = "translateY(50px)"; break;
      case "down": container.style.transform = "translateY(-50px)"; break;
      case "left": container.style.transform = "translateX(50px)"; break;
      case "right": container.style.transform = "translateX(-50px)"; break;
    }

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [direction, delay, duration, hasAnimated]);

  return (
    <div ref={containerRef} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
