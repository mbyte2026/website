import Hero from '../components/home/Hero';
import Problem from '../components/home/Problem';
import HowItWorks from '../components/home/HowItWorks';
import WhyMbyte from '../components/home/WhyMbyte';
import Platform from '../components/home/Platform';
import Demos from '../components/home/Demos';
import ContactCTA from '../components/home/ContactCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="bg-white text-neutral-950">
      <Hero />
      <Problem />
      <HowItWorks />
      <WhyMbyte />
      <Platform />
      <Demos />
      <ContactCTA />
      <Footer variant="light" />
    </div>
  );
}
