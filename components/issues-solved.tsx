"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

const issues = [
  "Outdated fixtures and finishes",
  "Poor lighting and ventilation",
  "Limited storage space",
  "Water damage and leaks",
  "Accessibility concerns",
  "Energy inefficiency"
];

interface IssuesSolvedProps {
  title?: string;
  subtitle?: string;
  description?: string;
  issues?: Array<string | { problem: string; solution: string }>;
}

export default function IssuesSolved({
  title = "Issues We Solve",
  subtitle,
  description = "Our expert team addresses common bathroom problems with professional solutions.",
  issues: customIssues,
}: IssuesSolvedProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const issuesToRender = customIssues ?? issues;

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-foreground"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-primary text-sm font-medium tracking-wider uppercase mb-4"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {issuesToRender.map((issue, index) => (
              <motion.div
                key={typeof issue === "string" ? issue : issue.problem}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground">
                  {typeof issue === "string" ? issue : `${issue.problem} - ${issue.solution}`}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}