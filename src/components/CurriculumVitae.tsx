import { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  Maximize2, 
  Printer, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Code2, 
  Sparkles,
  FileCheck,
  Building2,
  Calendar,
  Layers,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';
import { 
  CV_CONFIG, 
  CV_PATH, 
  CV_FILENAME, 
  PERSONAL_INFO, 
  SKILL_CATEGORIES, 
  EDUCATION_HISTORY 
} from '../data/portfolioData.ts';

export default function CurriculumVitae() {
  const [activeTab, setActiveTab] = useState<'interactive' | 'pdf'>('interactive');

  const handlePrint = () => {
    window.print();
  };

  const cvProjects = [
    {
      title: 'PromptCraft AI — AI Content Generator & Prompt Library',
      type: 'CAPACITI Demand Academy — Individual Project',
      role: 'Individual Developer',
      description: 'An AI-powered content generation platform developed individually as part of the CAPACITI Demand Academy programme. The project combines a structured prompt library with an interactive AI content-generation workflow.',
      github: 'https://github.com/Siyamthanda101/prompt-buddy-gen',
      live: 'https://preview--prompt-buddy-gen.lovable.app/',
    },
    {
      title: 'Varsity Path — Digital Varsity Guidance Experience',
      type: 'CAPACITI Demand Academy — Group Project',
      role: 'Researcher & Backend/Data Handling Contributor',
      description: 'A collaborative CAPACITI Demand Academy project focused on supporting students through a digital varsity guidance experience. Contributed as a researcher and supported the team with data handling and backend-related work.',
      github: 'https://github.com/RatiloeMbonani/Varsity_Path',
    },
    {
      title: 'RoadReady Traffic Services',
      type: 'CAPACITI Demand Academy — Collaborative Project',
      role: 'Project Team Member / Developer',
      description: 'Collaborative software project focused on digital traffic service requests and related operational workflows.',
      github: 'https://github.com/Siyamthanda101/RoadReady-Traffic-Services',
    },
    {
      title: 'RoadReady Insights',
      type: 'CAPACITI Demand Academy — Collaborative Project',
      role: 'Project Team Member / Developer',
      description: 'Interactive platform for sharing traffic service experiences and insights.',
      live: 'https://road-ready-pulse.lovable.app/',
    },
    {
      title: 'InfraTrack System',
      type: 'University Academic Group Project',
      role: 'Project Team Member / Developer',
      description: 'A full-stack ticket and infrastructure maintenance management system modelled around the City of Johannesburg Public Works Department workflow (academic group project prototype).',
      github: 'https://github.com/allen-vandieman/InfraTrack-System',
    },
  ];

  const cvCertifications = [
    { title: 'Artificial Intelligence Bootcamp (AI)', provider: 'CAPACITI / Coursera' },
    { title: 'Google AI Essentials Specialization', provider: 'Google' },
    { title: 'Machine Learning: Regression and Classification', provider: 'DeepLearning.AI' },
    { title: 'Generative AI with Large Language Models', provider: 'DeepLearning.AI / AWS' },
    { title: 'Python for Data Science, AI & Development', provider: 'IBM' },
    { title: 'Introduction to Artificial Intelligence (AI)', provider: 'IBM' },
    { title: 'Developing Back-End Apps with Node.js and Express', provider: 'IBM' },
    { title: 'Developing Front-End Apps with React', provider: 'IBM' },
    { title: 'Additional CAPACITI learning: AI For Everyone, Prompt Engineering, Responsible AI and AI productivity courses', provider: 'CAPACITI' },
  ];

  return (
    <section
      id="cv"
      className="py-20 md:py-28 relative border-b border-slate-800/40 bg-[#080d18]"
      aria-label="Curriculum Vitae Section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/40 text-blue-400 font-mono text-xs mb-4">
            <FileCheck className="w-3.5 h-3.5" />
            <span>{CV_CONFIG.badgeLabel}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {CV_CONFIG.title}
          </h2>
          
          <p className="text-lg sm:text-xl font-medium text-blue-300 mt-2 font-mono">
            {CV_CONFIG.subtitle}
          </p>

          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {CV_CONFIG.description} Download the verified PDF or review the complete, structured curriculum vitae below.
          </p>
        </div>

        {/* Quick Access Actions Bar */}
        <div className="mt-8 max-w-2xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#0b1120] border border-slate-800/90 shadow-2xl relative overflow-hidden reveal-on-scroll card-lift-hover">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500" />
          
          <div className="flex flex-col items-center justify-center space-y-4">
            
            {/* Document Details Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-inner">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-white">{CV_FILENAME}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-medium">2-Page PDF • Updated</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              
              {/* Primary Action 1: Download CV (Direct PDF download) */}
              <a
                href={CV_PATH}
                download={CV_FILENAME}
                id="cv-section-download-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all duration-200 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
                aria-label="Download Curriculum Vitae as PDF"
              >
                <Download className="w-4 h-4 text-sky-200" />
                <span>Download CV (.PDF)</span>
              </a>

              {/* Primary Action 2: View CV (Opens in new browser tab) */}
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                id="cv-section-view-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-100 bg-slate-900 hover:bg-slate-850 border border-slate-700/90 hover:border-slate-600 shadow-lg transition-all duration-200 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
                aria-label="View Curriculum Vitae in a new tab"
              >
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Open in Tab</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
              </a>

              {/* Print Action */}
              <button
                type="button"
                onClick={handlePrint}
                id="cv-section-print-btn"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:text-white transition-all cursor-pointer"
                aria-label="Print Curriculum Vitae"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                <span>Print</span>
              </button>

            </div>

            {/* Recruiter Guarantee & Verification Tag */}
            <div className="pt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-400 font-mono">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Authoritative Document</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span>2-Page Complete CV</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span>Cape Town, South Africa</span>
            </div>

          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              id="cv-tab-interactive"
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'interactive'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-pressed={activeTab === 'interactive'}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Interactive CV View</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              id="cv-tab-pdf"
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'pdf'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-pressed={activeTab === 'pdf'}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Embedded PDF Viewer</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Structured CV (Matches exact CV document) */}
        {activeTab === 'interactive' && (
          <div className="mt-8 rounded-2xl bg-[#0b101d] border border-slate-800 shadow-2xl p-6 sm:p-10 text-left space-y-10 reveal-on-scroll">
            
            {/* CV Header */}
            <div className="border-b border-slate-800/80 pb-6 text-center space-y-2.5">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {PERSONAL_INFO.name.toUpperCase()}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-blue-400">
                {PERSONAL_INFO.headline}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-300 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>
                <span className="text-slate-600">•</span>
                <a href={PERSONAL_INFO.phoneTel} className="flex items-center gap-1 hover:text-blue-300 transition-colors">
                  <Phone className="w-3 h-3 text-blue-400" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
                <span className="text-slate-600">•</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1 hover:text-blue-300 transition-colors">
                  <Mail className="w-3 h-3 text-blue-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-1 text-slate-400">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <Linkedin className="w-3 h-3 text-blue-400" />
                  <span>linkedin.com/in/siyamthanda-mafuta-0454b51ba</span>
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <Github className="w-3 h-3 text-slate-400" />
                  <span>github.com/Siyamthanda101</span>
                </a>
              </div>
            </div>

            {/* Section 1: Professional Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                  Professional Summary
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {PERSONAL_INFO.professionalSummary}
              </p>
            </div>

            {/* Section 2: Technical Skills */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                  Technical Skills
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                    <span className="text-blue-400">❖</span> Software & Development
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Python, Java, JavaScript, Node.js, Express, React, HTML, CSS, Backend Development
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                    <span className="text-cyan-400">❖</span> Networks & Systems
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    TCP/IP, Routing & Switching, Cisco Networking, Linux, Network Troubleshooting
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                    <span className="text-purple-400">❖</span> AI & Data
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Artificial Intelligence, Machine Learning Fundamentals, Generative AI, Prompt Engineering, Signal Processing
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                    <span className="text-emerald-400">❖</span> Databases & Engineering
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    MySQL, MongoDB, Database Design, ESP32, Arduino, Embedded Systems, MATLAB, Git/GitHub
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Professional Development */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                  Professional Development
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Demand Academy Participant
                    </h4>
                    <p className="text-xs text-blue-400 font-mono">
                      CAPACITI | Cape Town
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 sm:text-right">
                    2026 – Present
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                  <li>
                    Four months of professional development and collaborative project experience through the CAPACITI Demand Academy.
                  </li>
                  <li>
                    Completed IBM courses in back-end development with Node.js and Express, and front-end development with React, alongside learning in AI, Python and machine learning.
                  </li>
                  <li>
                    Collaborating on bootcamp projects and building a professional portfolio to showcase technical growth and project experience.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4: Selected Projects */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                  Selected Projects
                </span>
              </div>

              <div className="space-y-3">
                {cvProjects.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span className="text-blue-400">❖</span> {p.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono text-blue-400 hover:text-blue-300 inline-flex items-center gap-0.5"
                          >
                            <span>Repo</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-0.5"
                          >
                            <span>Live App</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 italic">
                      {p.type} | {p.role}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Education */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                  Education
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EDUCATION_HISTORY.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                    <h4 className="text-sm font-bold text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-blue-400 font-mono">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-slate-400">
                      {edu.period} • {edu.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Selected Certifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                  Selected Certifications
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cvCertifications.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/70 flex items-start gap-2">
                    <span className="text-blue-400 text-sm mt-0.5">•</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">
                        {c.title}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400">
                        {c.provider}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Download Banner */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-mono">
                Official document format: <span className="text-white font-semibold">{CV_FILENAME}</span>
              </div>
              <a
                href={CV_PATH}
                download={CV_FILENAME}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Document</span>
              </a>
            </div>

          </div>
        )}

        {/* Tab 2: Embedded PDF Viewer Frame for In-Browser Reading */}
        {activeTab === 'pdf' && (
          <div className="mt-8 text-left">
            <div className="rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden">
              {/* Toolbar Bar */}
              <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-300 font-medium truncate">{CV_FILENAME}</span>
                  <span className="text-slate-500 hidden sm:inline">•</span>
                  <span className="text-emerald-400 hidden sm:inline">2 Pages Complete</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={CV_PATH}
                    download={CV_FILENAME}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" />
                    <span>Download</span>
                  </a>
                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Full Window</span>
                  </a>
                </div>
              </div>

              {/* PDF Container with Graceful Fallback */}
              <div className="relative w-full h-[750px] bg-slate-900/50 flex flex-col items-center justify-center">
                <object
                  data={`${CV_PATH}#view=FitH`}
                  type="application/pdf"
                  className="w-full h-full"
                  aria-label="Curriculum Vitae PDF viewer"
                >
                  <div className="p-8 text-center max-w-md mx-auto space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/50 mx-auto flex items-center justify-center text-blue-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-white">
                      Curriculum Vitae Document
                    </p>
                    <p className="text-xs text-slate-400">
                      Your browser does not support inline PDF previews. You can view or download the authoritative CV PDF directly:
                    </p>
                    <div className="flex justify-center gap-3 pt-2">
                      <a
                        href={CV_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
                      >
                        Open PDF in New Tab
                      </a>
                      <a
                        href={CV_PATH}
                        download={CV_FILENAME}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </object>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
