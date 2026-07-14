"use client";

import { motion } from "framer-motion";
import type { ExperienceChapter } from "@/types/experience";

interface ChapterCardProps {
  chapter: ExperienceChapter;
  /** 0..1 how centered this card is in the viewport (for emphasis). */
  emphasis: number;
  index: number;
}

const cardBase =
  "relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 transition-[border-color,box-shadow,transform] duration-500";

export default function ExperienceChapterCard({
  chapter,
  emphasis,
  index,
}: ChapterCardProps) {
  const featured = !!chapter.featured;
  const active = emphasis > 0.55;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: "easeOut" }}
      className={[
        cardBase,
        featured ? "w-[500px] min-h-[520px]" : "w-[440px] min-h-[420px]",
        active
          ? "border-amber-500/60 shadow-[0_0_40px_-8px_rgba(255,122,24,0.45)]"
          : "border-white/10",
      ].join(" ")}
      aria-label={`Chapter ${chapter.chapterNumber}: ${chapter.company}`}
    >
      {/* Top label row */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-amber-400/80">
        <span>CH {String(chapter.chapterNumber).padStart(2, "0")}</span>
        <span className="font-doto">{chapter.missionNumber}</span>
      </div>

      <h3
        className={`mt-3 font-semibold leading-tight text-white ${
          featured ? "text-2xl" : "text-xl"
        }`}
      >
        {chapter.company}
      </h3>
      <p className="mt-1 text-sm text-amber-200/90">{chapter.role}</p>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/45">
        <span>{chapter.duration}</span>
        {chapter.locationOrMode && (
          <>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{chapter.locationOrMode}</span>
          </>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/65">
        {chapter.summary}
      </p>

      {/* Achievements */}
      <ul className="mt-4 space-y-2">
        {chapter.achievements.map((a, i) => (
          <li key={i} className="flex gap-2 text-[13px] text-white/70">
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/70" />
            <span>{a}</span>
          </li>
        ))}
      </ul>

      {/* Role phases (featured) */}
      {chapter.rolePhases && (
        <div className="mt-4 space-y-2 border-l border-amber-500/30 pl-3">
          {chapter.rolePhases.map((p, i) => (
            <div key={i}>
              <div className="text-[12px] font-medium text-white/85">{p.title}</div>
              <div className="text-[11px] text-white/40">{p.duration}</div>
            </div>
          ))}
        </div>
      )}

      {/* Metrics */}
      {chapter.metrics && chapter.metrics.length > 0 && (
        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          {chapter.metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            >
              <div className="font-doto text-lg text-amber-400">{m.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/45">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {chapter.techStack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition-colors hover:border-amber-500/40 hover:text-amber-200"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}