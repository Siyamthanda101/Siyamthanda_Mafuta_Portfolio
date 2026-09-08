import { useState } from 'react';
import { 
  Code2, 
  Network, 
  BrainCircuit, 
  Cpu, 
  Terminal,
  Database,
  Cloud,
  FileCode2,
  Server,
  Workflow,
  Radio,
  Sparkles
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';

// Helper to provide custom icons for recognizable technologies
function TechBadgeIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();

  if (lower.includes('python')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.008 2.752h5.805v.824H3.85S0 5.78 0 11.905c0 6.124 3.36 5.922 3.36 5.922h2.003v-2.81c0-3.21 2.74-3.21 2.74-3.21h5.727s2.617.04 2.617-2.584V2.656S16.906 0 11.914 0zm-3.23 1.83a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.008-2.752H11.99v-.824h8.163s3.85.452 3.85-5.673c0-6.124-3.36-5.922-3.36-5.922h-2.003v2.81c0 3.21-2.74 3.21-2.74 3.21H10.17s-2.617-.04-2.617 2.584v6.567S7.094 24 12.086 24zm3.23-1.83a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z"/>
      </svg>
    );
  }

  if (lower.includes('java') && !lower.includes('script')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 text-red-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.851 18.56s-.917.534.667.701c2.164.227 3.77-.202 5.093-.574 0 0 .538.337 1.346.541-4.143 1.847-9.524-.135-7.106-.668zm1.096-2.502s-1.074.673.808.875c2.399.258 4.678-.175 6.467-.674 0 0 .337.37.876.54-5.285 1.751-11.75-.135-8.151-.741zm-1.579-4.881s-1.481 1.009.605 1.312c3.097.437 6.467-.202 8.857-.841 0 0 .539.471 1.144.64-6.396 2.052-14.777-.202-10.606-1.111zm1.313 11.243c3.467.236 7.104-.135 9.897-1.346 0 0-.471-.471-1.077-.673-2.491.908-5.756 1.245-8.82 1.043 0 0-.47.674 0 .976z"/>
      </svg>
    );
  }

  if (lower.includes('javascript') || lower.includes('js')) {
    return (
      <span className="w-3.5 h-3.5 shrink-0 rounded-[2px] bg-yellow-400 text-black font-bold text-[9px] flex items-center justify-center font-mono">
        JS
      </span>
    );
  }

  if (lower.includes('node')) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 text-green-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm-1.2 17.6h-2.4v-8h2.4v8zm6 0h-2.4v-4.8c0-1.2-.8-1.6-1.6-1.6s-1.6.4-1.6 1.6v4.8h-2.4v-8h2.4v1.2c.6-.8 1.6-1.4 2.6-1.4 1.8 0 3 1.2 3 3.4v4.8z"/>
      </svg>
    );
  }

  if (lower.includes('linux')) {
    return <Terminal className="w-3.5 h-3.5 shrink-0 text-amber-400" />;
  }

  if (lower.includes('cisco') || lower.includes('network') || lower.includes('tcp')) {
    return <Network className="w-3.5 h-3.5 shrink-0 text-sky-400" />;
  }

  if (lower.includes('mysql') || lower.includes('mongodb') || lower.includes('database')) {
    return <Database className="w-3.5 h-3.5 shrink-0 text-cyan-400" />;
  }

  if (lower.includes('esp32') || lower.includes('embedded')) {
    return <Cpu className="w-3.5 h-3.5 shrink-0 text-emerald-400" />;
  }

  if (lower.includes('cloud')) {
    return <Cloud className="w-3.5 h-3.5 shrink-0 text-blue-400" />;
  }

  if (lower.includes('ai') || lower.includes('learning') || lower.includes('prompt')) {
    return <Sparkles className="w-3.5 h-3.5 shrink-0 text-purple-400" />;
  }

  return <FileCode2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />;
}

export default function Skills() {
  const [activeHoveredTag, setActiveHoveredTag] = useState<string | null>(null);

  const categoryIcons: Record<string, typeof Code2> = {
    software: Code2,
    networks: Network,
    'ai-data': BrainCircuit,
    engineering: Cpu,
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative border-b border-slate-800/50 overflow-hidden"
      aria-label="Technical Skills Section"
    >
      {/* Subtle Engineering Circuit & Diagram Background Visual */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] -z-10 flex items-center justify-center overflow-hidden">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="circuit-pattern"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 20 20 L 40 20 L 40 60 L 80 60 M 0 40 L 20 40 M 60 20 L 80 20 L 80 0 M 60 60 L 60 80"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="1"
              />
              <circle cx="20" cy="20" r="3" fill="#60a5fa" />
              <circle cx="40" cy="60" r="3" fill="#60a5fa" />
              <circle cx="60" cy="20" r="3" fill="#60a5fa" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/50 text-blue-400 font-mono text-xs mb-3">
            <span>TECHNICAL SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            Technologies and areas I am developing through academic work, projects and professional learning.
          </p>
        </div>

        {/* 4 Skill Category Cards in a Balanced 2x2 Grid (1-col on mobile, 2-col on tablet & desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 reveal-on-scroll">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category.id] || Code2;

            return (
              <div
                key={category.id}
                id={`skill-card-${category.id}`}
                className="group relative p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-850/80 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/30 backdrop-blur-sm card-lift-hover"
              >
                {/* Subtle top corner indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800/50 text-blue-400 group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                        {category.skills.length} Technologies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category One-Line Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Technology Tags */}
                <div className="pt-2 border-t border-slate-800/70">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.skills.map((skill) => {
                      const isHovered = activeHoveredTag === skill;

                      return (
                        <div
                          key={skill}
                          onMouseEnter={() => setActiveHoveredTag(skill)}
                          onMouseLeave={() => setActiveHoveredTag(null)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-default transition-all duration-200 ${
                            isHovered
                              ? 'bg-blue-600/20 text-white border-blue-400/80 -translate-y-0.5 shadow-md shadow-blue-500/10'
                              : 'bg-slate-950/70 text-slate-300 border border-slate-800/90 hover:border-slate-700'
                          }`}
                        >
                          <TechBadgeIcon name={skill} />
                          <span className="truncate max-w-[200px] sm:max-w-none">{skill}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card footer note */}
                <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>AREA OF DEVELOPMENT</span>
                  <span className="text-slate-400">PRACTICE & STUDY</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest & Credible Statement Banner */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            * Communicating real technical proficiencies and active areas of study — no exaggerated metrics or simulated experience scores.
          </p>
        </div>

      </div>
    </section>
  );
}
