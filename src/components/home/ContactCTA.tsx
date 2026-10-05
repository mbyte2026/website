import { ArrowUpRight } from 'lucide-react';
import { Reveal, PARTNER_MAILTO, INVEST_MAILTO, CONTACT_EMAIL } from './shared';

const PATHS = [
  {
    href: PARTNER_MAILTO,
    title: 'Partner with us',
    body: 'For hospitals, airports and malls exploring autonomous mobility.',
  },
  {
    href: INVEST_MAILTO,
    title: 'Contact for investment',
    body: 'For investors interested in our journey.',
  },
];

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-white py-24 md:py-32 px-6">
      <Reveal className="max-w-6xl mx-auto rounded-[20px] md:rounded-[32px] bg-neutral-950 text-white px-6 py-16 md:px-16 md:py-24">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] max-w-3xl">
          Restoring independence, one autonomous mile at a time.
        </h2>

        <div className="mt-14 grid md:grid-cols-2 gap-4">
          {PATHS.map(p => (
            <a
              key={p.title}
              href={p.href}
              className="group flex items-start justify-between gap-6 rounded-2xl border border-white/15 p-6 md:p-8 hover:bg-white hover:text-neutral-950 transition-colors duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-sm text-white/55 group-hover:text-neutral-500 transition-colors">{p.body}</p>
              </div>
              <ArrowUpRight className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

        <p className="mt-10 text-sm text-white/45">
          Or email us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
