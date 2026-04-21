"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && buttonRef.current) {
      // Entrance animation
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.6,
          delay: 1.5,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [mounted]);

  const handleToggle = () => {
    if (iconRef.current) {
      // GSAP rotation animation
      gsap.to(iconRef.current, {
        rotate: 360,
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          gsap.fromTo(
            iconRef.current,
            { rotate: -180, scale: 0 },
            {
              rotate: 0,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
            }
          );
        },
      });
    } else {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
  };

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card border border-border w-11 h-11" />
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card border border-border hover:border-primary transition-colors shadow-lg backdrop-blur-sm"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <div ref={iconRef} className="w-5 h-5">
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5 text-primary" />
        ) : (
          <Moon className="w-5 h-5 text-primary" />
        )}
      </div>
    </button>
  );
}
