"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resume";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const ref = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { personal } = resumeData;

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".contact-card");

      cards.forEach((card, index) => {
        // Staggered bounce-in animation
        gsap.fromTo(
          card,
          {
            scale: 0.8,
            opacity: 0,
            y: 50,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
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

  useEffect(() => {
    // CTA button magnetic effect
    if (ctaRef.current) {
      const cta = ctaRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = cta.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(cta, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cta, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      };

      cta.addEventListener("mousemove", handleMouseMove);
      cta.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cta.removeEventListener("mousemove", handleMouseMove);
        cta.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: personal.contact.email,
      href: `mailto:${personal.contact.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: personal.contact.phone,
      href: `tel:${personal.contact.phone}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "karthika-ravichandran09",
      href: personal.contact.linkedin,
    },
    {
      icon: MapPin,
      label: "Location",
      value: personal.contact.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            Contact
          </h2>
          <p className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto text-balance">
            Let&apos;s work together
          </p>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            If you&apos;d like to discuss a project or just say hi, I&apos;m
            always down to chat.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="contact-card"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.03,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium mt-1 truncate group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                ) : (
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium mt-1">{item.value}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <a
              ref={ctaRef}
              href={`mailto:${personal.contact.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-shadow"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
