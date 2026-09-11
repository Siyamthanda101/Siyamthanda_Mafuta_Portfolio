import { useState } from 'react';
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Download
} from 'lucide-react';
import { PERSONAL_INFO, CV_PATH, CV_FILENAME, getProfilePhoto } from '../data/portfolioData.ts';

export default function Hero() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => getProfilePhoto());

  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      const prefersReducedMotion = typeof window !== 'undefined' && 
        window.matchMedia && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-800/50"
      aria-label="Hero Section"
    >
      {/* Subtle, soft ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600/8 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Recruiter-Focused Introduction */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* 1. Intro Label & Candidate Name - Entrance 1 */}
            <div className="hero-animate-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/60 font-mono text-xs font-semibold uppercase tracking-widest text-blue-400">
                  {PERSONAL_INFO.introLabel}
                </span>
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Candidate Name */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.15]">
                {PERSONAL_INFO.name}
              </h1>

              {/* Primary Headline */}
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-200 tracking-tight leading-snug">
                Computer Engineering Graduate |{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  Software, Networks & Intelligent Systems
                </span>
              </h2>
            </div>

            {/* 2. Supporting Paragraph & Focus Areas - Entrance 2 */}
            <div className="hero-animate-2 space-y-4">
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {PERSONAL_INFO.supportingText}
              </p>

              {/* Personal Brand Tags: ONLY the four specified tags */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                  Core Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {PERSONAL_INFO.brandTags.map((tag) => {
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 text-slate-200 border border-slate-800 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span>{tag}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Main Call-to-Action Buttons - Entrance 3 */}
            <div className="hero-animate-3 pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Primary Action: Direct Download CV */}
              <a
                href={CV_PATH}
                download={CV_FILENAME}
                id="hero-download-cv-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
                aria-label="Download Curriculum Vitae as PDF"
              >
                <Download className="w-4 h-4 text-blue-100" />
                <span>Download CV</span>
              </a>

              {/* Secondary Action: Explore Work */}
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                id="hero-explore-work-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>

              {/* Tertiary Action: Get in Touch */}
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                id="hero-get-in-touch-btn"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Contact</span>
              </button>

              {/* Clean Social Icons: GitHub and LinkedIn */}
              <div className="flex items-center gap-2.5 pl-2 sm:pl-4 border-l border-slate-800">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-github-icon"
                  title="Visit Siyamthanda Mafuta's GitHub"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-850 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-linkedin-icon"
                  title="Visit Siyamthanda Mafuta's LinkedIn"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-850 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent, Elegant Profile Image Area - Entrance 4 */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end hero-animate-4">
            <div className="w-full max-w-sm sm:max-w-md">
              
              {/* Rectangular container with softly rounded corners */}
              <div 
                id="hero-profile-container"
                className="relative bg-gradient-to-b from-[#0e1627] to-[#0a0f1d] p-3.5 rounded-2xl border border-slate-800 transition-all duration-200 shadow-xl shadow-black/40 backdrop-blur-xl group"
              >
                {/* Subtle technical connection points & corner boundary lines */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-blue-400/80"></div>
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-blue-400/80"></div>
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-blue-400/80"></div>
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-blue-400/80"></div>

                {/* Technical engineering header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-3 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-slate-300">PORTRAIT CONTAINER</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400">CPUT // CAPACITI</span>
                </div>

                {/* Primary Image / Permanent Profile Presentation */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-[#0b1222] border border-slate-800/90 flex flex-col items-center justify-between p-6 text-center">
                  
                  {profilePhoto ? (
                    <div className="relative w-full h-full">
                      <img
                        src={profilePhoto}
                        alt="Siyamthanda Mafuta - Professional Portrait"
                        className="w-full h-full object-cover object-top rounded-lg"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setProfilePhoto(null);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-between py-2">
                      
                      {/* Grid lines and connection points */}
                      <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-500 px-1">
                        <span>CPUT // COMP.ENG</span>
                        <span>CAPE TOWN</span>
                      </div>

                      {/* Technical abstract shape / monogram */}
                      <div className="my-auto text-center space-y-3">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-2xl bg-gradient-to-br from-blue-900/30 via-slate-850 to-slate-900 border border-blue-500/30 flex items-center justify-center shadow-inner">
                          <span className="text-3xl sm:text-4xl font-mono font-bold text-slate-200 tracking-wider">
                            SM
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
                            Siyamthanda Mafuta
                          </p>
                          <p className="text-xs text-slate-400 max-w-[220px] mx-auto leading-relaxed">
                            Computer Engineering Graduate
                          </p>
                        </div>
                      </div>

                      <div className="w-full text-center">
                        <span className="text-[10px] font-mono text-slate-500">
                          SOFTWARE • NETWORKS • AI
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bottom identity tag */}
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md rounded-lg p-2.5 border border-slate-800 text-left flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-200">Siyamthanda Mafuta</p>
                      <p className="text-[11px] text-slate-400 font-mono">BEng Student (CPUT)</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-950 text-blue-300 border border-blue-800/50">
                      STUDENT
                    </span>
                  </div>
                </div>

                {/* Subtle footer info */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>DISCIPLINE: COMPUTER ENGINEERING</span>
                  <span className="text-slate-400">CPUT</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
