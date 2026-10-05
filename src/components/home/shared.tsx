import React from 'react';
import { motion } from 'motion/react';

/* ─── Site-wide content constants ────────────────────────────────────────── */

export const CONTACT_EMAIL = 'reagan@mbyte.my';

export const PARTNER_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Partnership enquiry')}`;
export const INVEST_MAILTO  = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Investment enquiry')}`;

/* ─── Layout helpers ─────────────────────────────────────────────────────── */

const EASE = [0.25, 0.25, 0.1, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 mb-5">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] text-neutral-950 max-w-3xl">
      {children}
    </h2>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-950 text-white text-sm font-semibold hover:bg-violet-700 transition-colors duration-300"
    >
      {children}
    </a>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 text-sm font-semibold hover:border-neutral-950 transition-colors duration-300"
    >
      {children}
    </a>
  );
}

/** Dashed slot shown wherever real media hasn't been supplied yet. */
export function MediaPlaceholder({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-6 bg-[linear-gradient(135deg,#f5f5f4,#ececeb)]">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">{label}</span>
      {hint && <span className="text-sm text-neutral-400 max-w-sm">{hint}</span>}
    </div>
  );
}
