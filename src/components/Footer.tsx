import React from 'react';
import { PARTNER_MAILTO, INVEST_MAILTO, CONTACT_EMAIL } from './home/shared';

type Variant = 'dark' | 'light';

const THEME: Record<Variant, {
  footer: string; name: string; heading: string; muted: string; faint: string;
  link: string; divider: string; iconBox: string; logo: string; logoImg: string;
}> = {
  dark: {
    footer:  'bg-black border-t border-white/[0.08]',
    name:    'text-white',
    heading: 'text-white/30',
    muted:   'text-white/40',
    faint:   'text-white/20',
    link:    'text-white/40 hover:text-white',
    divider: 'border-white/[0.06]',
    iconBox: 'bg-white/[0.04] border-white/[0.07] group-hover:bg-white/[0.09] group-hover:border-white/15',
    logo:    '/img_rb.png',
    logoImg: 'drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]',
  },
  light: {
    footer:  'bg-white border-t border-neutral-200',
    name:    'text-neutral-950',
    heading: 'text-neutral-400',
    muted:   'text-neutral-500',
    faint:   'text-neutral-400',
    link:    'text-neutral-500 hover:text-neutral-950',
    divider: 'border-neutral-200',
    iconBox: 'bg-neutral-50 border-neutral-200 group-hover:border-neutral-400',
    logo:    '/logo-mark.png',
    logoImg: '',
  },
};

export default function Footer({ variant = 'dark' }: { variant?: Variant }) {
  const t = THEME[variant];

  return (
    <footer className={`relative pt-16 pb-8 px-6 ${t.footer}`}>
      <div className="max-w-6xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Col 1: Branding */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src={t.logo} alt="Mbyte" className={`w-10 h-10 object-contain ${t.logoImg}`} />
              <span className={`text-xl font-black tracking-tight ${t.name}`}>Mbyte</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${t.heading}`}>
                Self-driving indoor mobility
              </p>
              <p className={`text-sm leading-relaxed ${t.muted}`}>
                Mbyte Technologies Sdn Bhd · Pahang, Malaysia
              </p>
            </div>
          </div>

          {/* Col 2: Explore */}
          <FooterColumn title="Explore" t={t}>
            <FooterLink href="/#how-it-works" t={t}>How it works</FooterLink>
            <FooterLink href="/#platform" t={t}>Platform</FooterLink>
            <FooterLink href="/#demos" t={t}>Demos</FooterLink>
            <FooterLink href="/docs" t={t}>Developers</FooterLink>
          </FooterColumn>

          {/* Col 3: Contact */}
          <FooterColumn title="Contact" t={t}>
            <FooterLink href={PARTNER_MAILTO} t={t}>Partner with us</FooterLink>
            <FooterLink href={INVEST_MAILTO} t={t}>Contact for investment</FooterLink>
            <FooterLink href={`mailto:${CONTACT_EMAIL}`} t={t}>{CONTACT_EMAIL}</FooterLink>
          </FooterColumn>

          {/* Col 4: Community */}
          <FooterColumn title="Community" t={t}>
            <SocialRowLink href="https://www.linkedin.com/company/mbyte-technologies-my/?viewAsMember=true" icon={<LinkedInIcon />} label="LinkedIn" t={t} />
            <SocialRowLink href="https://www.instagram.com/mbyte.3d?igsh=MWlrbml3dzRicGV4dw==" icon={<InstagramIcon />} label="Instagram" t={t} />
            <SocialRowLink href="https://www.tiktok.com/@mbyte11?_r=1&_t=ZS-96yMYV49BQ5" icon={<TikTokIcon />} label="TikTok" t={t} />
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${t.divider} ${t.faint}`}>
          <span>© 2026 Mbyte Technologies Sdn Bhd. All rights reserved.</span>
          <div className="flex gap-5">
            <FooterLink href="#" t={t}>Privacy Policy</FooterLink>
            <FooterLink href="#" t={t}>Terms of Service</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

type Theme = (typeof THEME)[Variant];

function FooterColumn({ title, t, children }: { title: string; t: Theme; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${t.heading}`}>{title}</h3>
      <nav className="flex flex-col gap-3">{children}</nav>
    </div>
  );
}

function FooterLink({ href, t, children }: { href: string; t: Theme; children: React.ReactNode }) {
  return (
    <a href={href} className={`text-sm transition-colors duration-200 ${t.link}`}>
      {children}
    </a>
  );
}

function SocialRowLink({ href, icon, label, t }: { href: string; icon: React.ReactNode; label: string; t: Theme }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 group transition-colors duration-200 ${t.link}`}
    >
      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 ${t.iconBox}`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}

/* ─── Social SVG icons ───────────────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
