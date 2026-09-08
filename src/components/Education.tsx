import { GraduationCap, Calendar, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData.ts';

export default function Education() {
  return (
    <section
      id="education"
      className="py-20 md:py-28 relative border-b border-slate-800/40"
      aria-label="Education Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/40 text-blue-400 font-mono text-xs mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>06 // ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education & Academic Background
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Formal engineering education at the Cape Peninsula University of Technology (CPUT), providing deep grounding in computer systems, electronic hardware, software structures, and network engineering.
          </p>
        </div>

        {/* Education Cards Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {EDUCATION_DATA.map((edu, index) => {
            const isInProgress = edu.status.includes('In Progress');

            return (
              <div
                key={index}
                id={`education-card-${index}`}
                className={`p-7 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isInProgress
                    ? 'bg-gradient-to-br from-[#0c1424] via-[#0e1628] to-[#090e1a] border-blue-500/40 shadow-xl shadow-blue-950/20'
                    : 'bg-[#0b101c] border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                <div>
                  {/* Status Banner */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{edu.period}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full font-medium ${
                        isInProgress
                          ? 'bg-blue-950/80 text-blue-300 border border-blue-800'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {isInProgress ? (
                        <Clock className="w-3 h-3 text-blue-400" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      )}
                      <span>{isInProgress ? 'In Progress (Currently Completing)' : 'Completed'}</span>
                    </span>
                  </div>

                  {/* Degree Title & Field */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                    {edu.degree} in {edu.field}
                  </h3>

                  {/* Institution & Location */}
                  <div className="space-y-1 mb-6">
                    <p className="text-sm font-semibold text-blue-400">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{edu.location}</span>
                    </p>
                  </div>

                  {/* Key Syllabus & Disciplines */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Key Engineering Areas
                    </h4>
                    <div className="space-y-1.5">
                      {edu.keyAreas.map((area, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>DISCIPLINE: COMPUTER ENGINEERING</span>
                  <span>CPUT</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
