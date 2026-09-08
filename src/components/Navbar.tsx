import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X, Terminal, ArrowUpRight, Download } from 'lucide-react';
import { PERSONAL_INFO, CV_PATH, CV_FILENAME } from '../data/portfolioData.ts';
import ThemeToggle from './ThemeToggle.tsx';

interface NavItem {
  name: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Journey', href: '#journey', id: 'journey' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'CV', href: '#cv', id: 'cv' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-navigation"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-[#080c14]/70 backdrop-blur-sm border-b border-slate-800/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          id="nav-brand-link"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400/60 group-hover:text-blue-300 transition-colors shadow-sm shadow-blue-500/10">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-100 text-sm tracking-tight flex items-center gap-1.5">
              <span>{PERSONAL_INFO.name}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 tracking-normal">
              Computer Engineering
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-800/80" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Quick CTA, Theme Toggle & Status */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Theme Toggle in Header */}
          <ThemeToggle variant="compact" />

          {/* Direct Download CV Button */}
          <a
            href={CV_PATH}
            download={CV_FILENAME}
            id="nav-download-cv-btn"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-md shadow-sm shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Download Curriculum Vitae as PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-github-link"
            className="flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-md border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            id="nav-contact-cta"
            className="text-xs font-medium text-blue-300 bg-blue-950/60 hover:bg-blue-900/70 border border-blue-500/30 hover:border-blue-400/50 px-3.5 py-1.5 rounded-md transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-blue-900/20"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Actions: Theme Toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle variant="compact" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#0a0f1c] border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          {/* Mobile Theme Toggle Full Switch */}
          <div className="pb-1">
            <ThemeToggle variant="full" />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Quick Mobile CV Download CTA */}
          <div className="pt-1">
            <a
              href={CV_PATH}
              download={CV_FILENAME}
              id="mobile-nav-download-cv-btn"
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-blue-600/30 cursor-pointer"
              aria-label="Download Curriculum Vitae as PDF"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Cape Town, South Africa</span>
            <div className="flex gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:text-white"
              >
                GitHub
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-blue-900/60 text-blue-200 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
