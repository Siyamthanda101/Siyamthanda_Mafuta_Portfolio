import { useState } from 'react';
import { 
  Award, 
  Search, 
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building2,
  X,
  Sparkles,
  Layers,
  Medal,
  BookOpen,
  Maximize2
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData.ts';
import { Certification } from '../types.ts';

type FilterType = 'All' | 'Badges' | 'Specializations' | 'Courses';

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [lightboxCert, setLightboxCert] = useState<Certification | null>(null);

  // Dynamic counter computations
  const totalCount = CERTIFICATIONS.length;
  const badgeCount = CERTIFICATIONS.filter(c => c.classification === 'Badge').length;
  const specializationCount = CERTIFICATIONS.filter(c => c.classification === 'Specialization').length;
  const courseCount = CERTIFICATIONS.filter(c => c.classification === 'Course').length;

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Filter and Search Logic
  const filteredCertifications = CERTIFICATIONS.filter((cert) => {
    // Category match
    const matchesFilter = 
      activeFilter === 'All' ||
      (activeFilter === 'Badges' && cert.classification === 'Badge') ||
      (activeFilter === 'Specializations' && cert.classification === 'Specialization') ||
      (activeFilter === 'Courses' && cert.classification === 'Course');

    // Search query match (Title, Provider, Classification)
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      cert.title.toLowerCase().includes(query) ||
      cert.provider.toLowerCase().includes(query) ||
      cert.classification.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const getClassificationBadge = (classification: Certification['classification']) => {
    switch (classification) {
      case 'Badge':
        return {
          bg: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
          dot: 'bg-amber-400',
          icon: Medal,
          label: 'Badge',
        };
      case 'Specialization':
        return {
          bg: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
          dot: 'bg-purple-400',
          icon: Layers,
          label: 'Specialization',
        };
      case 'Course':
      default:
        return {
          bg: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
          dot: 'bg-blue-400',
          icon: BookOpen,
          label: 'Course',
        };
    }
  };

  return (
    <section
      id="certifications"
      className="py-20 md:py-28 relative border-b border-slate-800/40 bg-[#090e19]/50"
      aria-label="Certifications & Courses Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-left reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/40 text-blue-400 font-mono text-xs mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>05 // CONFIRMED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Certifications &amp; Courses
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            15 verified learning achievements completed through Coursera in August 2026.
          </p>
        </div>

        {/* Summary Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 text-left reveal-on-scroll">
          {/* Total */}
          <button
            type="button"
            onClick={() => setActiveFilter('All')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer card-lift-hover ${
              activeFilter === 'All'
                ? 'bg-blue-950/60 border-blue-500/60 ring-1 ring-blue-500/40'
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider">Total</span>
              <Award className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {totalCount}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Total Achievements
            </div>
          </button>

          {/* Badges */}
          <button
            type="button"
            onClick={() => setActiveFilter('Badges')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeFilter === 'Badges'
                ? 'bg-amber-950/60 border-amber-500/60 ring-1 ring-amber-500/40'
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider">Badge</span>
              <Medal className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono">
              {badgeCount}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Badge
            </div>
          </button>

          {/* Specializations */}
          <button
            type="button"
            onClick={() => setActiveFilter('Specializations')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeFilter === 'Specializations'
                ? 'bg-purple-950/60 border-purple-500/60 ring-1 ring-purple-500/40'
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider">Specialization</span>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-300 font-mono">
              {specializationCount}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Specialization
            </div>
          </button>

          {/* Courses */}
          <button
            type="button"
            onClick={() => setActiveFilter('Courses')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeFilter === 'Courses'
                ? 'bg-sky-950/60 border-sky-500/60 ring-1 ring-sky-500/40'
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider">Courses</span>
              <BookOpen className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-sky-300 font-mono">
              {courseCount}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Courses
            </div>
          </button>
        </div>

        {/* Controls: Filter Buttons & Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 text-left">
          
          {/* Classification Filters */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Achievement Classification Filters">
            {(['All', 'Badges', 'Specializations', 'Courses'] as FilterType[]).map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(filter)}
                  id={`cert-filter-${filter.toLowerCase()}`}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, provider, or classification..."
              className="w-full pl-10 pr-9 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              id="certifications-search-input"
              aria-label="Search certifications"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter if filtering/searching */}
        {(activeFilter !== 'All' || searchQuery.trim() !== '') && (
          <div className="mb-6 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>
              Showing {filteredCertifications.length} of {totalCount} achievements
              {activeFilter !== 'All' && <span> • Filter: <strong className="text-slate-200">{activeFilter}</strong></span>}
              {searchQuery.trim() && <span> • Query: &ldquo;<strong className="text-slate-200">{searchQuery.trim()}</strong>&rdquo;</span>}
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Certifications Grid */}
        {filteredCertifications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-sm">
            <p className="font-medium text-slate-300 mb-1">No achievements found</p>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or selecting &ldquo;All&rdquo; in the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Show All Achievements
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left reveal-on-scroll">
            {filteredCertifications.map((cert) => {
              const badgeStyle = getClassificationBadge(cert.classification);
              const BadgeIcon = badgeStyle.icon;
              const hasError = imageErrors[cert.id];

              return (
                <div
                  key={cert.id}
                  id={`cert-card-${cert.id}`}
                  className="rounded-2xl bg-[#0a0f1d] border border-slate-800/90 hover:border-slate-700 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden group card-lift-hover"
                >
                  <div>
                    {/* Top Preview Image Container */}
                    <div className="relative h-48 sm:h-52 bg-slate-950 border-b border-slate-800/90 overflow-hidden flex items-center justify-center p-3">
                      {!hasError ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img
                            src={cert.previewImage}
                            alt={cert.title}
                            onError={() => handleImageError(cert.id)}
                            className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />

                          {/* Quick Lightbox Expand Button */}
                          <button
                            type="button"
                            onClick={() => setLightboxCert(cert)}
                            className="absolute bottom-1 right-1 p-1.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition-colors opacity-80 group-hover:opacity-100 cursor-pointer"
                            title="Expand preview image"
                            aria-label={`Expand preview for ${cert.title}`}
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        /* Clean Fallback State if image fails to load */
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-slate-950 border border-slate-800/50 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-blue-950/80 border border-blue-800/60 flex items-center justify-center mb-2 text-blue-400">
                            <BadgeIcon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-200 line-clamp-2">
                            {cert.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 mt-1">
                            {cert.provider}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Coursera Verified
                          </span>
                        </div>
                      )}

                      {/* Top Overlay Classification Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium border backdrop-blur-md ${badgeStyle.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`}></span>
                          <span>{badgeStyle.label}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-3.5">
                      
                      {/* Provider Header */}
                      <div className="flex items-start gap-2 text-slate-300">
                        <Building2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                            Provider
                          </span>
                          <span className="text-xs font-semibold text-slate-200">
                            {cert.provider}
                          </span>
                        </div>
                      </div>

                      {/* Exact Achievement Title */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                          Achievement Title
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug group-hover:text-blue-300 transition-colors">
                          {cert.title}
                        </h3>
                      </div>

                      {/* Completion Date */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Completed: <strong className="text-slate-300">{cert.completedDate}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Footer with Verification Action */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/70 mt-auto flex items-center justify-between gap-3 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Verified Credential</span>
                    </span>

                    {/* Button: View Certificate or View Badge */}
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`cert-btn-${cert.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/30 transition-all cursor-pointer"
                      aria-label={`${cert.buttonLabel} for ${cert.title}`}
                    >
                      <span>{cert.buttonLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Full-Screen Preview Lightbox Modal */}
        {lightboxCert && (
          <div
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={`Preview of ${lightboxCert.title}`}
            onClick={() => setLightboxCert(null)}
          >
            <div
              className="w-full max-w-4xl flex items-center justify-between pb-3 text-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
                  {lightboxCert.classification} • {lightboxCert.provider}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-mono">
                  {lightboxCert.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                >
                  <span>{lightboxCert.buttonLabel}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxCert(null)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center p-2 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxCert.previewImage}
                alt={lightboxCert.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
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
