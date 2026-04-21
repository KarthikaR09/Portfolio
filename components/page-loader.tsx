"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      },
    });

    // Text reveal animation
    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    // Progress bar animation
    if (progressRef.current) {
      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
        "-=0.3"
      );
    }

    // Fade out loader
    if (loaderRef.current) {
      tl.to(loaderRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <span
        ref={textRef}
        className="text-2xl md:text-3xl font-bold tracking-tight mb-8"
      >
        <span className="text-primary">K</span>arthika{" "}
        <span className="text-primary">R</span>avichandran
      </span>
      <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-primary origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
