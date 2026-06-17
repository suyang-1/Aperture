import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Capabilities from '@/components/capabilities';
import Projects from '@/components/projects';
import Process from '@/components/process';
import About from '@/components/about';
import Skills from '@/components/skills';
import Hobbies from '@/components/hobbies';
import Footer from '@/components/footer';
import FloatingMascot from '@/components/floating-mascot';
import CodeRainCanvas from '@/components/effects/code-rain-canvas';
import ParticleTrail from '@/components/effects/particle-trail';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#06080f] text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <CodeRainCanvas />
      <Capabilities />
      <Projects />
      <Process />
      <Skills />
      <About />
      <Hobbies />
      <Footer />
      <ParticleTrail />
      <FloatingMascot />
    </div>
  );
}
