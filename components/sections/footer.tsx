"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export function Footer() {
  const { personal } = resumeData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} {personal.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
