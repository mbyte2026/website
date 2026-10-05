import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';
import { PrimaryButton, SecondaryButton, MediaPlaceholder, PARTNER_MAILTO, INVEST_MAILTO } from './shared';

// Optional silent loop (e.g. '/videos/hero-loop.mp4'), portrait or square crop. Empty → still image.
const HERO_LOOP_SRC = '';
const HERO_IMAGE_SRC = '/hero-wheelchair.jpg';
// YouTube ID of the full 40 s intro film. Empty → modal shows a placeholder.
const FILM_YOUTUBE_ID = 'cZkbTn7aY0Q';

export default function Hero() {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <section className="bg-white pt-32 md:pt-40 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0.1, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.98] text-neutral-950">
            Self-driving indoor mobility.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-neutral-500 leading-relaxed max-w-xl">
            Autonomous wheelchairs powered by Edge AI. Giving independence back to the elderly and
            people with disabilities, and giving caregivers back their time.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryButton href={PARTNER_MAILTO}>Partner with us</PrimaryButton>
            <SecondaryButton href={INVEST_MAILTO}>Contact for investment</SecondaryButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.25, 0.25, 0.1, 1] }}
          className="relative aspect-[4/5] rounded-[20px] md:rounded-[32px] overflow-hidden bg-neutral-100"
        >
          {HERO_LOOP_SRC ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={HERO_LOOP_SRC}
              poster={HERO_IMAGE_SRC}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={HERO_IMAGE_SRC}
              alt="Mbyte autonomous wheelchair, concept design"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <span className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 rounded-full bg-white/85 backdrop-blur font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">
            Concept design
          </span>

          <button
            onClick={() => setFilmOpen(true)}
            className="absolute left-4 bottom-4 md:left-6 md:bottom-6 inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-white/90 backdrop-blur text-neutral-950 text-sm font-semibold shadow-sm hover:bg-white transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </span>
            Watch the film
            <span className="text-neutral-400 font-medium">0:40</span>
          </button>
        </motion.div>
      </div>

      <FilmModal open={filmOpen} onClose={() => setFilmOpen(false)} />
    </section>
  );
}

function FilmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black"
          >
            {FILM_YOUTUBE_ID ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${FILM_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Mbyte intro film"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <MediaPlaceholder label="Intro film · 0:40" hint="Paste the YouTube ID into FILM_YOUTUBE_ID in Hero.tsx." />
            )}
          </motion.div>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
