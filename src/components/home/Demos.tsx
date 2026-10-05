import { useState } from 'react';
import { Play } from 'lucide-react';
import { Reveal, Eyebrow, SectionTitle } from './shared';

type Demo = {
  /** YouTube video ID (regular video or Short). */
  id: string;
  tag: string;
  title: string;
  body: string;
  /** true for YouTube Shorts (9:16). */
  vertical?: boolean;
};

// Real hardware, shown first. Add a test by pushing another entry here.
const PROTOTYPE: Demo[] = [
  {
    id: 'nErha_yIe4M',
    tag: 'Move',
    title: 'Carrying a rider autonomously',
    body: 'The modified wheelchair driving itself with a person on board.',
    vertical: true,
  },
  {
    id: '-R_qoC6G1cI',
    tag: 'Detect',
    title: 'Obstacle avoidance',
    body: 'Spotting an obstacle in its path and re-routing around it.',
    vertical: true,
  },
];

const SIMULATION: Demo[] = [
  {
    id: 'qK0F5SAb7Xg',
    tag: 'Map',
    title: 'LiDAR SLAM floorplan mapping',
    body: 'Building a map of an indoor space in real time.',
  },
  {
    id: '2M_RCnrJXfY',
    tag: 'Navigate',
    title: 'Autonomous navigation with Nav2',
    body: 'Localising on the map and driving to waypoints on its own.',
  },
];

export default function Demos() {
  return (
    <section id="demos" className="bg-[#f6f6f4] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr] gap-8 lg:gap-6">
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:pr-6">
            <Eyebrow>See it in action</Eyebrow>
            <SectionTitle>Real test footage.</SectionTitle>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
              Our TRL 4 prototype, a modified electric wheelchair, driving itself in our lab.
            </p>
          </Reveal>
          {PROTOTYPE.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08}>
              <DemoCard demo={d} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">In simulation</p>
          </Reveal>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {SIMULATION.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.08}>
                <DemoCard demo={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoCard({ demo }: { demo: Demo }) {
  return (
    <>
      <DemoPlayer demo={demo} />
      <span className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-violet-700">{demo.tag}</span>
      <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-neutral-950">{demo.title}</h3>
      <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{demo.body}</p>
    </>
  );
}

/** Shows the YouTube thumbnail and only loads the player on click. */
function DemoPlayer({ demo }: { demo: Demo }) {
  const [playing, setPlaying] = useState(false);
  // Shorts have a vertical thumbnail at oar2.jpg; regular videos use hqdefault.
  const thumb = `https://i.ytimg.com/vi/${demo.id}/${demo.vertical ? 'oar2' : 'hqdefault'}.jpg`;

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-neutral-200 ${demo.vertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${demo.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={demo.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play: ${demo.title}`}>
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow group-hover:bg-white transition-colors">
              <Play className="w-5 h-5 text-neutral-950 fill-current ml-0.5" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
