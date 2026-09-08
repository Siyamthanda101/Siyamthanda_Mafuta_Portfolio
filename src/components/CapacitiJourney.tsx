import { useState } from 'react';
import { 
  Compass, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { CAPACITI_MILESTONES } from '../data/portfolioData.ts';

export default function CapacitiJourney() {
  const [selectedMonth, setSelectedMonth] = useState<string>('Month 1');

  const activeMilestone = CAPACITI_MILESTONES.find((m) => m.month === selectedMonth) || CAPACITI_MILESTONES[0];

  return (
    <section
      id="journey"
      className="py-20 md:py-28 relative border-b border-slate-800/40 bg-[#080d17]/60"
      aria-label="CAPACITI Journey Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/40 text-blue-400 font-mono text-xs mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>03 // PROFESSIONAL DEVELOPMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            My CAPACITI Journey
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            A structured month-by-month learning and professional development pathway exploring practical artificial intelligence, machine learning engineering, and responsible technical workflows.
          </p>
        </div>

        {/* Month Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
          {CAPACITI_MILESTONES.map((milestone) => {
            const isSelected = selectedMonth === milestone.month;
            return (
              <button
                key={milestone.month}
                type="button"
                onClick={() => setSelectedMonth(milestone.month)}
                id={`journey-tab-${milestone.month.toLowerCase().replace(/\s+/g, '-')}`}
                className={`p-5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-blue-400 font-semibold uppercase">
                    {milestone.month}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
                      milestone.status === 'Completed'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {milestone.status === 'Completed' ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Clock className="w-3 h-3 text-slate-400" />
                    )}
                    <span>{milestone.status}</span>
                  </span>
                </div>

                <h3 className={`text-base font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {milestone.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {milestone.focus}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Milestone Detailed Showcase */}
        <div className="bg-gradient-to-br from-[#0d1424] via-[#0f172a] to-[#0b101c] p-6 sm:p-8 rounded-2xl border border-blue-500/30 shadow-2xl text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>TIMELINE FOCUS // {activeMilestone.month.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeMilestone.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                CAPACITI Program Progression
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Core Curriculum & Focus */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Learning Objectives & Covered Topics</span>
                </h4>
                <ul className="space-y-2.5">
                  {activeMilestone.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeMilestone.isPlaceholder && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300 font-mono">Future Progression Module</p>
                  <p>
                    This section is architected for ongoing updates. Verified milestones, engineering implementations, and advanced technical outcomes will be documented as the program advances.
                  </p>
                </div>
              )}
            </div>

            {/* Confirmed Certifications / Milestones in this phase */}
            <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Verified Certifications Linked</span>
              </h4>

              {activeMilestone.certifications && activeMilestone.certifications.length > 0 ? (
                <div className="space-y-2">
                  {activeMilestone.certifications.map((certName, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 flex items-center justify-between group hover:border-slate-700"
                    >
                      <span className="font-medium pr-2">{certName}</span>
                      <span className="shrink-0 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Upcoming modules will link verified credentials as evaluations are concluded.
                </p>
              )}

              <div className="pt-2 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>POLICY: STRICT VERIFIED DATA</span>
                <span className="text-blue-400">AUTHENTICATED</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
