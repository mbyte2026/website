import { Reveal, Eyebrow, SectionTitle } from './shared';

const PROBLEMS = [
  {
    n: '01',
    title: 'Caregiver shortage',
    body: 'Hospitals and care centres lose thousands of staff-hours every year pushing wheelchairs between wards and departments. That time should go to patient care.',
  },
  {
    n: '02',
    title: 'Mobility friction',
    body: 'Hospitals, airports and malls are huge. The elderly and people with disabilities have to rely on someone else just to get where they need to go.',
  },
];

const STATS = [
  { value: '805,509', label: 'registered persons with disabilities in Malaysia' },
  { value: '2.6M',    label: 'Malaysians aged 65 and above' },
];

export default function Problem() {
  return (
    <section className="bg-[#f6f6f4] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <SectionTitle>Physical mobility support doesn't scale.</SectionTitle>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-16">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <div className="border-t border-neutral-300 pt-6">
                <span className="font-mono text-xs text-neutral-400">{p.n}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-neutral-950">{p.title}</h3>
                <p className="mt-3 text-neutral-500 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid sm:grid-cols-2 gap-10">
          {STATS.map(s => (
            <div key={s.value}>
              <div className="text-6xl md:text-7xl font-semibold tracking-[-0.045em] text-violet-700">{s.value}</div>
              <p className="mt-2 text-neutral-500">{s.label}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 font-mono text-[11px] text-neutral-400">Source: Department of Statistics Malaysia (DOSM), 2024.</p>
      </div>
    </section>
  );
}
