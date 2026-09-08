import { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  Maximize2, 
  ShieldCheck,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { CV_CONFIG, CV_PATH, CV_FILENAME } from '../data/portfolioData.ts';

export default function CurriculumVitae() {
  const [showEmbeddedViewer, setShowEmbeddedViewer] = useState(true);

  return (
    <section
      id="cv"
      className="py-20 md:py-28 relative border-b border-slate-800/40 bg-[#080d18]"
      aria-label="Curriculum Vitae Section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="reveal-on-scroll">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/40 text-blue-400 font-mono text-xs mb-4">
            <FileCheck className="w-3.5 h-3.5" />
            <span>{CV_CONFIG.badgeLabel}</span>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {CV_CONFIG.title}
          </h2>
          
          <p className="text-lg sm:text-xl font-medium text-blue-300 mt-2 font-mono">
            {CV_CONFIG.subtitle}
          </p>

          {/* Supporting Description */}
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {CV_CONFIG.description}
          </p>
        </div>

        {/* Quick Access Action Card */}
        <div className="mt-8 max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#0b1120] border border-slate-800/90 shadow-2xl relative overflow-hidden reveal-on-scroll card-lift-hover">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500" />
          
          <div className="flex flex-col items-center justify-center space-y-6">
            
            {/* Document Details Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-inner">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-white">{CV_FILENAME}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-medium">{CV_CONFIG.metaText}</span>
            </div>

            {/* Two Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              
              {/* Primary Action 1: View CV (Opens in new browser tab) */}
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                id="cv-section-view-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all duration-200 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
                aria-label="View Curriculum Vitae in a new tab"
              >
                <Eye className="w-4 h-4" />
                <span>View CV</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-200 ml-0.5" />
              </a>

              {/* Primary Action 2: Download CV (Downloads PDF directly) */}
              <a
                href={CV_PATH}
                download={CV_FILENAME}
                id="cv-section-download-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-100 bg-slate-900 hover:bg-slate-800 border border-slate-700/90 hover:border-slate-600 shadow-lg transition-all duration-200 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
                aria-label="Download Curriculum Vitae as PDF"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Download CV</span>
              </a>

            </div>

            {/* Recruiter Guarantee & Verification Tag */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Authoritative Document</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span>Direct PDF Access</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span>Always Current</span>
            </div>

          </div>
        </div>

        {/* Embedded PDF Viewer Frame for In-Browser Reading */}
        <div className="mt-12 text-left">
          <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white font-mono">
                Document Preview
              </h3>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                ({CV_FILENAME})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowEmbeddedViewer(!showEmbeddedViewer)}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer font-mono"
                aria-label={showEmbeddedViewer ? 'Collapse document viewer' : 'Expand document viewer'}
              >
                {showEmbeddedViewer ? 'Hide Viewer' : 'Show Viewer'}
              </button>

              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-mono transition-colors"
                title="Open PDF in full new browser window"
              >
                <span>Full Window</span>
                <Maximize2 className="w-3 h-3" />
              </a>
            </div>
          </div>

          {showEmbeddedViewer && (
            <div className="mt-4 rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden">
              {/* Toolbar Bar */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-300 truncate">{CV_FILENAME}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={CV_PATH}
                    download={CV_FILENAME}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open in Tab</span>
                  </a>
                </div>
              </div>

              {/* PDF Container with Fallback */}
              <div className="relative w-full h-[650px] bg-slate-900/50 flex flex-col items-center justify-center">
                <object
                  data={`${CV_PATH}#view=FitH`}
                  type="application/pdf"
                  className="w-full h-full"
                  aria-label="Curriculum Vitae PDF viewer"
                >
                  {/* Graceful Fallback if browser does not support embedded PDF */}
                  <div className="p-8 text-center max-w-md mx-auto space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/50 mx-auto flex items-center justify-center text-blue-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-white">
                      Curriculum Vitae Document
                    </p>
                    <p className="text-xs text-slate-400">
                      Your browser does not support inline PDF previews. You can view or download the authoritative CV PDF directly below:
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
          )}
        </div>

      </div>
    </section>
  );
}
