"use client";

import { motion, type Variants } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import type { TechItem } from "@/lib/techStackData";

interface SkillPanelProps {
  skill: TechItem;
  onClose: () => void;
  isFixed?: boolean;
  monochrome?: boolean;
}
// SkillPanel.tsx  — replace the two variant definitions

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 28,
      staggerChildren: 0.06,
    },
  },
  exit: { opacity: 0, x: 40, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
export function SkillPanel({ skill, onClose, isFixed = false, monochrome = false }: SkillPanelProps) {
  const Icon = skill.icon;
  const iconColor = monochrome ? "#ffffff" : skill.color;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full rounded-4xl smooth-corners border border-primary-border shadow-2xl p-5 space-y-7"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-inter font-semibold tracking-widest text-tertiary uppercase">
              {isFixed ? "Pinned Skill" : "Selected Skill"}
            </span>
            {isFixed && (
              <span className="text-[9px] font-inter font-medium text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                PINNED
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="cursor-[url('https://cdn.cursors-4u.net/previews/tiny-finger-point-c1336353-32.webp')_32_32,auto] text-tertiary hover:text-foreground transition-colors p-1 rounded-md hover:bg-white/5"
            aria-label="Close panel"
          >
            <X size={14} />
          </button>
        </motion.div>

        {/* Skill hero */}
        <motion.div variants={itemVariants} className="flex items-start gap-3 mt-2">
          <div
            className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-[#1e1e1e] border border-primary-border"
            style={{ boxShadow: `0 0 16px 2px ${skill.color}22` }}
          >
            <Icon size={28} color={skill.color} />
          </div>
          <div>
            <h3 className="text-primary font-inter font-bold text-xl leading-tight">
              {skill.name}
            </h3>
            <p className="text-tertiary font-inter text-xs mt-0.5">{skill.category}</p>
            <p className="text-secondary font-inter text-xs mt-1.5 leading-relaxed">
              {skill.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-2"
      >
        <StatTile
          value={`${skill.stats.yearsExp}+`}
          label="Years Experience"
          color="text-foreground"
        />
        <StatTile
          value={`${skill.stats.projects}+`}
          label="Projects"
          color="text-amber-400"
        />
        <StatTile
          value={`${skill.stats.proficiency}%`}
          label="Proficiency"
          color="text-green-400"
        />
      </motion.div>

      {/* Expertise Areas */}
      <motion.div variants={itemVariants}>
        <SectionLabel>Expertise Areas</SectionLabel>
        <ul className="space-y-1.5 mt-2">
          {skill.expertiseAreas.map((area) => (
            <li key={area} className="flex items-center gap-2">
              <span className="text-foreground text-xs">✦</span>
              <span className="text-secondary font-inter text-xs">{area}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Tools & Libraries */}
      <motion.div variants={itemVariants}>
        <SectionLabel>Tools &amp; Libraries</SectionLabel>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {skill.tools.map((tool) => (
            <span
              key={tool}
              className="bg-toggle border border-primary-border text-secondary text-[10px] rounded-full px-2.5 py-0.5"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Featured Projects */}
      <motion.div variants={itemVariants}>
        <SectionLabel>Featured Projects</SectionLabel>
        <ul className="space-y-1.5 mt-2">
          {skill.featuredProjects.map((proj) => (
            <li
              key={proj.name}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-secondary font-inter text-xs">
                • {proj.name}
              </span>
              <span className="bg-toggle border border-primary-border text-secondary font-inter text-[10px] rounded-full px-2 py-0.5 shrink-0">
                {proj.tech}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Footer link */}
      <motion.div variants={itemVariants}>
        <a
          href="#projects"
          className="inline-flex items-center gap-1.5 text-primary-400 text-sm font-inter hover:underline group"
        >
          View Projects
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </motion.div>
    </motion.div>
  );
}

function StatTile({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 bg-[#1a1a1a] rounded-xl border border-primary-border p-3">
      <span className={`font-inter font-bold text-xl ${color}`}>{value}</span>
      <span className="text-tertiary font-inter text-[9px] text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-inter font-semibold tracking-widest text-tertiary uppercase">
      {children}
    </p>
  );
}