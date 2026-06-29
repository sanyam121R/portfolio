"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Briefcase, Code2, BarChart2, Layers, MousePointer } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 28,
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const strengths = [
  "End-to-End Development",
  "System Design & Architecture",
  "Performance Optimization",
  "Scalable & Secure Solutions",
  "Clean Code & Best Practices",
];

export function OverviewPanel() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full rounded-4xl smooth-corners border border-primary-border shadow-2xl p-4 sm:p-5 space-y-5 sm:space-y-7 max-w-lg mx-auto lg:max-w-none"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <p className="text-[10px] font-inter font-semibold tracking-widest text-tertiary uppercase">
          Overview
        </p>
        <div className="flex items-start gap-3 mt-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-3xl smooth-corners border border-primary-border flex items-center justify-center">
            <span className="text-foreground text-xl sm:text-2xl">✦</span>
          </div>
          {/* <div className="w-12 h-12 shrink-0 rounded-xl border border-primary-border flex items-center justify-center">
            <span className="text-foreground text-2xl">✦</span>
          </div> */}
          <div>
            <h3 className="text-foreground font-inter font-bold text-base sm:text-lg leading-tight">
              Full Stack Engineer
            </h3>
            <p className="text-secondary font-inter text-xs mt-1 leading-relaxed">
              I architect and build complete solutions from intuitive user
              interfaces to robust backends and scalable infrastructure.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2">
        {[
          { icon: <Briefcase size={18} />, value: "4+", label: "Years Experience" },
          { icon: <Code2 size={18} />, value: "20+", label: "Projects Completed" },
          { icon: <BarChart2 size={18} />, value: "95%", label: "Proficiency Score" },
        ].map(({ icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 bg-[#1a1a1a] rounded-3xl smooth-corners border border-primary-border p-2 sm:p-3"
          >
            <span className="text-tertiary">{icon}</span>
            <span className="text-foreground font-inter font-bold text-base sm:text-lg">{value}</span>
            <span className="text-tertiary font-inter text-[8px] sm:text-[9px] text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Core Strengths */}
      <motion.div variants={itemVariants}>
        <p className="text-[10px] font-inter font-semibold tracking-widest text-tertiary uppercase mb-2">
          Core Strengths
        </p>
        <ul className="space-y-1.5">
          {strengths.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className="text-foreground text-xs">✦</span>
              <span className="text-secondary font-inter text-xs">{s}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Technology Approach */}
      <motion.div variants={itemVariants}>
        <p className="text-[10px] font-inter font-semibold tracking-widest text-tertiary uppercase mb-2">
          Technology Approach
        </p>
        <div className="space-y-2">
          <ApproachCard
            icon={<Layers size={18} className="sm:w-[20px] sm:h-[20px] text-secondary" />}
            text={
              <>
                The right technology for the right problem. Always scalable.
                Always maintainable.{" "}
                <strong className="text-foreground">Always user-focused.</strong>
              </>
            }
          />
          <ApproachCard
            icon={<MousePointer size={18} className="sm:w-[20px] sm:h-[20px] text-secondary" />}
            text="Hover over any technology to see how I leverage it."
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ApproachCard({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-3xl smooth-corners border border-primary-border p-2.5 sm:p-3">
      <div className="mt-0.5 shrink-0 border border-white/20 p-1.5 sm:p-2 rounded-full">{icon}</div>
      <p className="text-secondary font-inter text-xs leading-relaxed">{text}</p>
    </div>
  );
}