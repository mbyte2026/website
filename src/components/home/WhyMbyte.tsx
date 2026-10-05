import { BrainCircuit, RadioTower, Wallet, HeartHandshake } from 'lucide-react';
import { Reveal, Eyebrow, SectionTitle } from './shared';

const REASONS = [
  {
    Icon: BrainCircuit,
    title: 'Understands context, not just shapes',
    body: 'LiDAR combined with vision-language AI on NVIDIA edge compute. It knows a person from a pillar, and a wet floor from a clear one.',
  },
  {
    Icon: RadioTower,
    title: 'Deploys without IT work',
    body: 'Runs over 5G instead of the building’s Wi-Fi, and maps the space itself. No facility upgrades needed.',
  },
  {
    Icon: Wallet,
    title: 'No upfront cost',
    body: 'Facilities subscribe to a fleet. We handle deployment, maintenance and software updates.',
  },
  {
    Icon: HeartHandshake,
    title: 'Built for dignity',
    body: 'Independent movement instead of waiting to be pushed. Users go where they need to, on their own terms.',
  },
];

export default function WhyMbyte() {
  return (
    <section className="bg-[#f6f6f4] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>Why Mbyte</Eyebrow>
          <SectionTitle>Built for real buildings and real people.</SectionTitle>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
          {REASONS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={(i % 2) * 0.08} className="bg-white p-8 md:p-10">
              <Icon className="w-6 h-6 text-violet-700" strokeWidth={1.75} />
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-neutral-950">{title}</h3>
              <p className="mt-3 text-neutral-500 leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
