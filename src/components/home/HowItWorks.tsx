import React from 'react';
import { Reveal, Eyebrow, SectionTitle } from './shared';

type Step = {
  n: string;
  title: string;
  body: string;
  /** Short looping clip (e.g. '/videos/step-map.mp4'). Empty → built-in animation. */
  clip: string;
  Animation: () => React.ReactElement;
};

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Map',
    body: 'LiDAR SLAM builds an accurate digital floorplan of the building. No changes to the facility needed.',
    clip: '',
    Animation: MapAnimation,
  },
  {
    n: '02',
    title: 'Detect',
    body: 'A depth camera and vision-language AI recognise people and obstacles in real time, not just shapes.',
    clip: '',
    Animation: DetectAnimation,
  },
  {
    n: '03',
    title: 'Navigate',
    body: 'An onboard ROS 2 brain plans safe, efficient routes and re-routes around hazards as they appear.',
    clip: '',
    Animation: NavigateAnimation,
  },
  {
    n: '04',
    title: 'Move',
    body: 'Our own motor control turns AI decisions into smooth, gentle, autonomous movement.',
    clip: '',
    Animation: MoveAnimation,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <SectionTitle>Map. Detect. Navigate. Move.</SectionTitle>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#f6f6f4]">
                {s.clip ? (
                  <video className="absolute inset-0 w-full h-full object-cover" src={s.clip} autoPlay muted loop playsInline />
                ) : (
                  <s.Animation />
                )}
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-mono text-xs text-neutral-400">{s.n}</span>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-neutral-950">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-2xl border border-neutral-200 px-6 py-5 md:px-8 md:py-6">
          <p className="text-lg md:text-xl text-neutral-950 tracking-[-0.01em]">
            <span className="text-violet-700 font-semibold">The result:</span> waiting for someone to push the
            wheelchair goes from minutes to zero.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Placeholder animations (pure SVG/SMIL, loop forever) ───────────────── */

const INK = '#171717';
const MUTED = '#a3a3a3';
const ACCENT = '#6d28d9';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full p-6" aria-hidden>
      {children}
    </svg>
  );
}

function MapAnimation() {
  // A corridor loop around a central core. The route stays 25px clear of every wall.
  const robotPath = 'M45 45 H155 V155 H45 Z';
  const walls = 'M20 20H180V180H20Z M70 70H130V130H70Z M20 100H32 M168 70H180 M100 168V180 M100 20V32';
  return (
    <Frame>
      {/* Unmapped building (faint) */}
      <path d={walls} fill="none" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
      {/* Floorplan drawing itself */}
      <path
        d={walls}
        fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray="1"
      >
        <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.7;1" dur="6s" repeatCount="indefinite" />
      </path>
      {/* Robot with scan ring */}
      <g>
        <animateMotion dur="6s" repeatCount="indefinite" path={robotPath} />
        <circle r="18" fill={ACCENT} opacity="0.12">
          <animate attributeName="r" values="4;22" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle r="5" fill={ACCENT} />
      </g>
    </Frame>
  );
}

function DetectAnimation() {
  const box = (x: number, y: number, w: number, h: number, label: string, begin: string) => (
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" begin={begin} repeatCount="indefinite" />
      <rect x={x} y={y} width={w} height={h} rx="3" fill="none" stroke={ACCENT} strokeWidth="1.8" />
      <rect x={x} y={y - 13} width={label.length * 5.6 + 8} height="12" rx="2" fill={ACCENT} />
      <text x={x + 4} y={y - 4} fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#fff">{label}</text>
    </g>
  );
  return (
    <Frame>
      {/* Corridor perspective */}
      <path d="M10 185 L75 95 H125 L190 185 M75 95 V25 M125 95 V25" fill="none" stroke={MUTED} strokeWidth="1.2" />
      {/* Person */}
      <circle cx="58" cy="105" r="8" fill={INK} />
      <rect x="47" y="116" width="22" height="42" rx="9" fill={INK} />
      {/* Trolley */}
      <rect x="128" y="128" width="34" height="26" rx="3" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="134" cy="160" r="3" fill={INK} /><circle cx="156" cy="160" r="3" fill={INK} />
      {/* Wet-floor sign */}
      <path d="M100 118 L111 150 H89 Z" fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {box(40, 92, 36, 70, 'person 0.97', '0s')}
      {box(122, 122, 46, 44, 'trolley', '0.4s')}
      {box(84, 112, 32, 42, 'wet floor', '0.8s')}
    </Frame>
  );
}

function NavigateAnimation() {
  const route = 'M30 170 C 40 120, 60 65, 110 58 S 165 40, 170 30';
  return (
    <Frame>
      {/* Grid */}
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={20 + c * 20} cy={20 + r * 20} r="1" fill={MUTED} />
        )),
      )}
      {/* Direct line blocked by obstacle */}
      <path d="M30 170 L170 30" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 5" />
      <circle cx="100" cy="100" r="16" fill={INK} />
      <path d="M93 93 L107 107 M107 93 L93 107" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      {/* Planned route */}
      <path id="nav-route" d={route} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1">
        <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.35;1" dur="5s" repeatCount="indefinite" />
      </path>
      {/* Goal */}
      <circle cx="170" cy="30" r="6" fill="none" stroke={ACCENT} strokeWidth="2" />
      {/* Vehicle */}
      <circle r="6" fill={ACCENT}>
        <animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.35;0.9;1" calcMode="linear">
          <mpath href="#nav-route" />
        </animateMotion>
      </circle>
    </Frame>
  );
}

/** Side view of the Mbyte chair: white shell, mesh seat, armrest sensor pods, four equal wheels. */
function MoveAnimation() {
  const SHELL = '#ffffff';
  const EDGE = '#d4d4d4';
  const MESH = '#cfcfcf';
  const TYRE = '#262626';

  const wheel = (cx: number) => (
    <g transform={`translate(${cx} 146)`}>
      <circle r="20" fill={TYRE} />
      <circle r="11" fill="#3f3f3f" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.4s" repeatCount="indefinite" />
        <circle r="7" fill="#525252" />
        <rect x="-1" y="-11" width="2" height="5" rx="1" fill="#737373" />
      </g>
    </g>
  );

  return (
    <Frame>
      {/* Floor + moving markers */}
      <line x1="0" y1="166" x2="200" y2="166" stroke={EDGE} strokeWidth="1.5" />
      <g stroke={MUTED} strokeWidth="1.5" strokeLinecap="round">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-40 0" dur="0.9s" repeatCount="indefinite" />
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={i * 40} y1="176" x2={i * 40 + 16} y2="176" />
        ))}
      </g>
      <ellipse cx="100" cy="166" rx="66" ry="3" fill="#000" opacity="0.06" />

      {/* Sensor sweep ahead of the chair */}
      {[0, 0.6].map(b => (
        <path key={b} d="M150 72 a14 14 0 0 1 0 28" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" opacity="0">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="26 0" dur="1.2s" begin={`${b}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.8;0" dur="1.2s" begin={`${b}s`} repeatCount="indefinite" />
        </path>
      ))}

      {/* Base + fenders */}
      <path d="M36 146 Q36 118 62 116 H140 Q166 118 166 146 Z" fill={SHELL} stroke={EDGE} strokeWidth="1.5" />
      {/* Pedestal */}
      <path d="M78 117 Q90 104 86 92 H122 Q118 106 128 117 Z" fill={SHELL} stroke={EDGE} strokeWidth="1.5" />
      {/* Backrest shell + mesh */}
      <path d="M70 94 Q56 62 62 30 Q66 24 74 28 Q72 60 88 90 Z" fill={SHELL} stroke={EDGE} strokeWidth="1.5" />
      <path d="M72 88 Q62 62 66 34 Q68 31 70 33 Q70 60 82 86 Z" fill={MESH} />
      {/* Seat pan */}
      <rect x="72" y="84" width="66" height="10" rx="5" fill={MESH} stroke={EDGE} strokeWidth="1.5" />
      {/* Armrest + support with sensor pod */}
      <path d="M74 62 H128" stroke={SHELL} strokeWidth="7" strokeLinecap="round" />
      <path d="M74 62 H128" stroke={EDGE} strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M126 64 L112 108" stroke={SHELL} strokeWidth="9" strokeLinecap="round" />
      <path d="M126 64 L112 108" stroke={EDGE} strokeWidth="1" strokeLinecap="round" />
      <rect x="128" y="58" width="22" height="9" rx="4.5" fill={TYRE} />
      <circle cx="144" cy="62.5" r="1.8" fill="#9ca3af" />
      <circle cx="120" cy="78" r="5" fill={SHELL} stroke={ACCENT} strokeWidth="2">
        <animate attributeName="stroke-opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Front sensor dome */}
      <path d="M148 117 a6 6 0 0 1 12 0 Z" fill={TYRE} />

      {wheel(62)}
      {wheel(140)}
    </Frame>
  );
}
