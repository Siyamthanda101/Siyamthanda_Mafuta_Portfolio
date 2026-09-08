import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import CapacitiJourney from './components/CapacitiJourney.tsx';
import Projects from './components/Projects.tsx';
import Certifications from './components/Certifications.tsx';
import Education from './components/Education.tsx';
import CurriculumVitae from './components/CurriculumVitae.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import NetworkBackground from './components/NetworkBackground.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 relative selection:bg-blue-600/30 selection:text-blue-200">
      {/* Subtle animated network constellation canvas */}
      <NetworkBackground />

      {/* Main App Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          <CapacitiJourney />
          <Projects />
          <Certifications />
          <Education />
          <CurriculumVitae />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
