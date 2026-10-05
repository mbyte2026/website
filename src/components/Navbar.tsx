import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

// Pages already restyled to the light theme.
const LIGHT_ROUTES = ['/'];

// Sections on the homepage.
const LINKS = [
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/#platform',     label: 'Platform' },
  { to: '/#demos',        label: 'Demos' },
  { to: '/#contact',      label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);
  const light = LIGHT_ROUTES.includes(useLocation().pathname);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`flex items-center justify-between gap-4 px-5 py-3 rounded-full backdrop-blur-xl border ${
          light
            ? 'bg-white/80 border-neutral-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
            : 'bg-black/40 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Logo — always routes to "/" */}
        <Link
          to="/"
          onClick={close}
          className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
          aria-label="Go to home"
        >
          <Logo light={light} className={`${light ? 'w-9 h-9' : 'w-12 h-12'} group-hover:scale-110 transition-transform duration-300`} />
          <span
            className={`text-lg font-extrabold tracking-tight ${
              light ? 'text-neutral-950' : 'bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60'
            }`}
          >
            Mbyte
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(l => (
            <NavPill key={l.to} to={l.to} light={light}>{l.label}</NavPill>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-1.5 rounded-full transition-all ${
            light ? 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100' : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`mt-2 rounded-2xl backdrop-blur-xl border overflow-hidden ${
              light
                ? 'bg-white/95 border-neutral-200 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
                : 'bg-black/70 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            }`}
          >
            <div className="flex flex-col p-2 gap-1">
              {LINKS.map(l => (
                <MobileNavLink key={l.to} to={l.to} onClick={close} light={light}>{l.label}</MobileNavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function linkClass(light: boolean) {
  return light ? 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100' : 'text-white/60 hover:text-white hover:bg-white/10';
}

function NavPill({ to, light, children }: { to: string; light: boolean; children: React.ReactNode }) {
  return (
    <Link to={to} className={`px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${linkClass(light)}`}>
      {children}
    </Link>
  );
}

function MobileNavLink({
  to,
  onClick,
  light,
  children,
}: {
  to: string;
  onClick: () => void;
  light: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} onClick={onClick} className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${linkClass(light)}`}>
      {children}
    </Link>
  );
}
