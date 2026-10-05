import { Reveal, Eyebrow, SectionTitle } from './shared';

const BODIES = [
  {
    vertical: 'Hospital',
    title: 'Autonomous Wheelchair',
    body: 'Patient transport between wards and departments, without waiting for a porter.',
    status: 'Now',
    statusNote: 'In development',
  },
  {
    vertical: 'Airport',
    title: 'Autonomous Passenger Pod',
    body: 'Takes travellers straight from check-in to their boarding gate.',
    status: 'Next',
    statusNote: '',
  },
  {
    vertical: 'Mall',
    title: 'Autonomous Shopping Pod',
    body: 'Rides shoppers from the car park to the store, so they stay longer and shop more.',
    status: 'Next',
    statusNote: '',
  },
];

export default function Platform() {
  return (
    <section id="platform" className="bg-white py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>One platform</Eyebrow>
          <SectionTitle>One navigation system. Three bodies.</SectionTitle>
          <p className="mt-6 text-lg text-neutral-500 max-w-2xl leading-relaxed">
            The same Map, Detect, Navigate, Move stack drives every vehicle we build. We’re starting with the
            wheelchair.
          </p>
        </Reveal>

        {/* Diagram */}
        <Reveal className="mt-16">
          <div className="flex justify-center">
            <div className="px-8 py-4 rounded-full bg-neutral-950 text-white font-mono text-xs md:text-sm uppercase tracking-[0.18em]">
              Mbyte Self-Driving System
            </div>
          </div>
          {/* Connectors (desktop) */}
          <div className="hidden md:block relative h-14" aria-hidden>
            <div className="absolute left-1/2 top-0 h-7 w-px bg-neutral-300" />
            <div className="absolute left-[16.66%] right-[16.66%] top-7 h-px bg-neutral-300" />
            {['16.66%', '50%', '83.33%'].map(l => (
              <div key={l} className="absolute top-7 h-7 w-px bg-neutral-300" style={{ left: l }} />
            ))}
          </div>
          <div className="md:hidden h-8 w-px bg-neutral-300 mx-auto" aria-hidden />

          <div className="grid md:grid-cols-3 gap-5">
            {BODIES.map(b => {
              const now = b.status === 'Now';
              return (
                <div
                  key={b.title}
                  className={`rounded-2xl p-7 border ${now ? 'border-violet-300 bg-violet-50/50' : 'border-neutral-200 bg-white'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">{b.vertical}</span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        now ? 'bg-violet-700 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {b.status}
                      {b.statusNote && ` · ${b.statusNote}`}
                    </span>
                  </div>
                  <h3 className="mt-10 text-xl font-semibold tracking-[-0.02em] text-neutral-950">{b.title}</h3>
                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-neutral-400">
            Beyond mobility: delivery and service robots, on the same navigation stack.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
