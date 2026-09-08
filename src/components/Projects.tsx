import { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Activity, 
  Layers, 
  FileSearch, 
  Cpu, 
  Check, 
  X, 
  Sparkles,
  Info,
  Car,
  GitBranch,
  Github,
  Maximize2,
  Image as ImageIcon,
  ZoomIn,
  Globe,
  Users,
  UserCheck
} from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData.ts';
import { Project } from '../types.ts';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; caption?: string; title: string } | null>(null);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'csi-heart':
        return Activity;
      case 'roadready':
        return Car;
      case 'roadready-insights':
        return Globe;
      case 'infratrack':
        return Layers;
      case 'duplicate-file-finder':
        return FileSearch;
      case 'embedded-iot-project':
        return Cpu;
      default:
        return FolderGit2;
    }
  };

  const getProjectTypeBadge = (projectType: string) => {
    if (projectType.includes('CAPACITI')) {
      return {
        bg: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
        dot: 'bg-purple-400',
        short: 'CAPACITI Collaborative Project'
      };
    }
    if (projectType.includes('Personal')) {
      return {
        bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
        dot: 'bg-emerald-400',
        short: 'Personal Software Project'
      };
    }
    if (projectType.includes('Research')) {
      return {
        bg: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
        dot: 'bg-blue-400',
        short: 'Academic / Research Group'
      };
    }
    return {
      bg: 'bg-sky-950/80 text-sky-300 border-sky-800/60',
      dot: 'bg-sky-400',
      short: 'Academic Group Project'
    };
  };

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-28 relative border-b border-slate-800/40"
      aria-label="Projects Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/40 text-blue-400 font-mono text-xs mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            Engineering implementations across contactless Wi-Fi sensing, collaborative traffic platforms, municipal ticket tracking, desktop utilities and embedded IoT systems — with explicit attribution of project classifications, team roles and verified individual contributions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left reveal-on-scroll">
          
          {FEATURED_PROJECTS.map((project) => {
            const IconComp = getProjectIcon(project.id);
            const isFlagship = project.isFlagship;
            const typeStyle = getProjectTypeBadge(project.projectType);

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between group overflow-hidden card-lift-hover ${
                  isFlagship
                    ? 'bg-[#0b1424] border-blue-500/50 shadow-2xl shadow-blue-950/40'
                    : 'bg-[#0a0f1d] border-slate-800/90 hover:border-slate-700 shadow-xl'
                }`}
              >
                {/* Top Visual Area */}
                <div>
                  <div className="relative h-48 sm:h-52 border-b border-slate-800/90 overflow-hidden bg-slate-950">
                    
                    {/* Actual Project Screenshot / Setup Image */}
                    {project.imageUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={project.imageUrl}
                          alt={project.imageCaption || project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        {/* Dark gradient overlays for legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-slate-950 flex items-center justify-center">
                        <IconComp className="w-12 h-12 text-slate-700" />
                      </div>
                    )}

                    {/* Top Controls & Badges inside Visual Frame */}
                    <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[10px] font-mono text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span className="uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {/* Lightbox / Zoom Button */}
                        {project.imageUrl && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveLightbox({
                                src: project.imageUrl!,
                                title: project.title,
                                caption: project.imageCaption
                              });
                            }}
                            className="p-1.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition-colors cursor-pointer"
                            title="Expand Image"
                            aria-label={`Expand image for ${project.title}`}
                          >
                            <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                          </button>
                        )}
                        
                        <span className={`px-2 py-1 rounded-md text-[10px] font-mono font-medium border ${typeStyle.bg}`}>
                          {typeStyle.short}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Title & Tagline in Visual Frame */}
                    <div className="absolute bottom-3 left-4 right-4 z-10">
                      {isFlagship && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold mb-1 drop-shadow-md">
                          <Sparkles className="w-3 h-3" /> Flagship Research Project
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-md group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-300/90 truncate drop-shadow-md">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Project Type & Role Callout Strip */}
                    <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                            Project Type
                          </span>
                          <span className="text-xs font-semibold text-slate-200">
                            {project.projectType}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 pt-1 border-t border-slate-800/60">
                        <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                            Siyamthanda's Role
                          </span>
                          <span className="text-xs font-semibold text-emerald-300 font-mono">
                            {project.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Project Overview */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                        Project Overview
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Verified Individual Contribution (where verified) */}
                    {project.individualContribution && (
                      <div className="rounded-lg bg-blue-950/25 border border-blue-900/40 p-3 text-xs">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-blue-300 font-semibold uppercase tracking-wider mb-1">
                          <Check className="w-3 h-3 text-blue-400 shrink-0" />
                          <span>Individual Contribution (Verified)</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {project.individualContribution}
                        </p>
                      </div>
                    )}

                    {/* Verified Technologies */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-medium">
                        Verified Technologies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/70 mt-auto flex flex-wrap items-center justify-between gap-2.5 pt-4">
                  {/* View Details Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenModal(project)}
                    id={`project-details-btn-${project.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    <span>View Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {/* View Live Application Button (for RoadReady Insights / live projects) */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`project-live-btn-${project.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 transition-all cursor-pointer"
                        aria-label={`View Live Application for ${project.title}`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>View Live Application</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}

                    {/* GitHub Button - ONLY real verified URLs */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`project-github-btn-${project.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/30 transition-all cursor-pointer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View on GitHub</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Structured Reusable Project Details Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <div className="bg-[#0b111e] border border-blue-500/40 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl text-left relative max-h-[92vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 cursor-pointer transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Category & Status Header */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-400 mb-2">
                <span>PROJECT DETAILS</span>
                <span>•</span>
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span className={`px-2.5 py-0.5 rounded border text-[11px] font-mono font-medium ${getProjectTypeBadge(selectedProject.projectType).bg}`}>
                  {selectedProject.projectType}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-300/80 mb-5">
                {selectedProject.tagline}
              </p>

              {/* High-Resolution Project Visual Showcase */}
              {selectedProject.imageUrl && (
                <div className="mb-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <div className="relative group/preview max-h-[360px] flex items-center justify-center bg-black/40 overflow-hidden">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.imageCaption || selectedProject.title}
                      className="w-full h-auto max-h-[360px] object-contain rounded-t-lg"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Expand Button Overlay */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveLightbox({
                          src: selectedProject.imageUrl!,
                          title: selectedProject.title,
                          caption: selectedProject.imageCaption
                        });
                      }}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer shadow-lg backdrop-blur-md"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Full Resolution</span>
                    </button>
                  </div>

                  {/* Caption Bar */}
                  <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>
                        {selectedProject.imageCaption || selectedProject.title}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-500">Verified Project Artifact</span>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                
                {/* Classification & Role Detail Box */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Project Classification
                      </span>
                      <p className="text-sm text-slate-200 font-medium">
                        {selectedProject.projectType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800">
                    <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Siyamthanda's Role
                      </span>
                      <p className="text-sm font-mono text-emerald-300 font-semibold">
                        {selectedProject.role}
                      </p>
                    </div>
                  </div>

                  {selectedProject.individualContribution && (
                    <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800">
                      <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                          Verified Individual Contribution
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                          {selectedProject.individualContribution}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 1. Overview */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                    {selectedProject.projectDetails?.overview || selectedProject.description}
                  </p>
                </div>

                {/* 2. Problem Addressed */}
                {selectedProject.projectDetails?.problem && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                      Problem Addressed
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      {selectedProject.projectDetails.problem}
                    </p>
                  </div>
                )}

                {/* 3. Technical Approach */}
                {selectedProject.projectDetails?.approach && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                      Technical Approach
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      {selectedProject.projectDetails.approach}
                    </p>
                  </div>
                )}

                {/* Confirmed Technical Aspects */}
                {selectedProject.projectDetails?.bulletPoints && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                      Confirmed Technical Aspects
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.projectDetails.bulletPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 4. Technologies */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t) => (
                      <span key={t} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. Live Application & Repository Links */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {selectedProject.liveUrl && (
                    <div>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="modal-live-btn"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm shadow-emerald-600/30"
                      >
                        <Globe className="w-4 h-4" />
                        <span>View Live Application</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  )}

                  {selectedProject.githubUrl && (
                    <div>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="modal-github-btn"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm shadow-blue-600/30"
                      >
                        <Github className="w-4 h-4" />
                        <span>View on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Attribution & Accuracy confirmation */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Strict verification policy: Differentiates between collaborative group initiatives, academic prototypes, and personal software projects. Only confirmed repositories and live deployments are linked.
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Full-Screen Image Lightbox Modal */}
        {activeLightbox && (
          <div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Full Screen Image View"
            onClick={() => setActiveLightbox(null)}
          >
            {/* Top Bar with Title and Close Button */}
            <div className="w-full max-w-5xl flex items-center justify-between pb-3 text-slate-200" onClick={(e) => e.stopPropagation()}>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white font-mono">
                  {activeLightbox.title}
                </h4>
                {activeLightbox.caption && (
                  <p className="text-xs sm:text-sm text-slate-400 font-mono">
                    {activeLightbox.caption}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
                aria-label="Close full-screen image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Image */}
            <div 
              className="relative max-w-5xl w-full max-h-[82vh] flex items-center justify-center p-2 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-2xl overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeLightbox.src}
                alt={activeLightbox.caption || activeLightbox.title}
                className="max-w-full max-h-[78vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className="text-slate-500 text-xs font-mono mt-3">
              Click anywhere outside or press Esc to close preview
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

