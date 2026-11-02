import { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, Calendar, CheckCircle2, ExternalLink, Search, X } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData.ts';
import { Certification, CertificationGroup } from '../types.ts';

function CredentialPreview({
  certification,
  onPreview,
  compact = false,
}: {
  certification: Certification;
  onPreview: (certification: Certification) => void;
  compact?: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const size = compact ? 'h-10 w-10' : 'h-14 w-14';

  if (!certification.previewImage || imageFailed) {
    return (
      <span className={`${size} flex shrink-0 items-center justify-center rounded-xl bg-blue-950/60 text-blue-400`}>
        <Award className={compact ? 'h-4 w-4' : 'h-6 w-6'} aria-hidden="true" />
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onPreview(certification)}
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
      aria-label={`Preview image for ${certification.title}`}
    >
      <img
        src={certification.previewImage}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        className="max-h-full max-w-full object-contain"
        onError={() => setImageFailed(true)}
      />
    </button>
  );
}

const COURSE_GROUPS: {
  id: CertificationGroup;
  title: string;
  description: string;
}[] = [
  {
    id: 'software-development',
    title: 'Software engineering and development',
    description: 'IBM coursework completed through CAPACITI / Coursera, as applicable',
  },
  {
    id: 'cloud-infrastructure-ai',
    title: 'Cloud, infrastructure and AI coursework',
    description: 'Cloud foundations, machine learning and applied AI',
  },
];

function matchesSearch(certification: Certification, query: string) {
  const searchableText = [
    certification.title,
    certification.provider,
    certification.offeredThrough,
    certification.classification,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return searchableText.includes(query);
}

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxCertification, setLightboxCertification] = useState<Certification | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const query = searchQuery.trim().toLowerCase();
  const featuredCredentials = CERTIFICATIONS.filter(
    (certification) => certification.featured && matchesSearch(certification, query),
  );
  const groupedCourses = COURSE_GROUPS.map((group) => ({
    ...group,
    courses: CERTIFICATIONS.filter(
      (certification) =>
        !certification.featured &&
        certification.group === group.id &&
        matchesSearch(certification, query),
    ),
  }));
  const hasResults =
    featuredCredentials.length > 0 || groupedCourses.some((group) => group.courses.length > 0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !lightboxCertification) return;

    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [lightboxCertification]);

  useEffect(() => {
    if (!lightboxCertification) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setLightboxCertification(null);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [lightboxCertification]);

  return (
    <section
      id="certifications"
      className="relative border-b border-slate-800/40 bg-[#111b2e]/30 py-20 md:py-24"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-blue-800/40 bg-blue-950/70 px-3 py-1 font-mono text-xs text-blue-400">
            <Award className="h-3.5 w-3.5" aria-hidden="true" />
            <span>PROFESSIONAL DEVELOPMENT</span>
          </div>
          <h2
            id="certifications-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Certifications &amp; coursework
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Completed learning paths and courses across software development, cloud infrastructure and AI.
            Certificate links are shown only where a credential URL is available.
          </p>
        </div>

        <div className="mb-8 max-w-md">
          <label className="sr-only" htmlFor="certifications-search-input">
            Search credentials and courses
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="certifications-search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search courses or providers"
              className="w-full rounded-lg border border-slate-700 bg-[#172338] py-2.5 pl-10 pr-10 text-sm text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {!hasResults ? (
          <p className="rounded-xl border border-slate-800 bg-[#172338] p-6 text-sm text-slate-300">
            No credentials match “{searchQuery.trim()}”.
          </p>
        ) : (
          <div className="space-y-10">
            {featuredCredentials.length > 0 && (
              <section aria-labelledby="featured-credentials-heading">
                <div className="mb-4">
                  <h3
                    id="featured-credentials-heading"
                    className="text-lg font-semibold text-white"
                  >
                    Featured credentials and learning paths
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Key completed programmes, with their credential type clearly identified.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {featuredCredentials.map((certification) => (
                    <article
                      key={certification.id}
                      className="flex flex-col justify-between gap-5 rounded-xl border border-slate-700/80 bg-[#172338] p-5 sm:flex-row sm:items-start"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <CredentialPreview
                          certification={certification}
                          onPreview={setLightboxCertification}
                        />
                        <div className="min-w-0">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-blue-300">
                              {certification.classification}
                            </span>
                            <span className="text-xs text-slate-400">{certification.provider}</span>
                          </div>
                          <h4 className="font-semibold leading-snug text-white">
                            {certification.title}
                          </h4>
                          {certification.offeredThrough && (
                            <p className="mt-1 text-xs text-slate-400">
                              Offered through {certification.offeredThrough}
                            </p>
                          )}
                          {certification.learningPathCourseCount && (
                            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-300">
                              <BookOpen className="h-4 w-4 text-blue-400" aria-hidden="true" />
                              {certification.learningPathCourseCount}-course learning path
                            </p>
                          )}
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1.5 text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                              Completed
                            </span>
                            {certification.completedDate && (
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                {certification.completedDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {certification.verificationUrl && certification.buttonLabel && (
                        <a
                          href={certification.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#172338]"
                          aria-label={`${certification.buttonLabel} for ${certification.title}`}
                        >
                          {certification.buttonLabel}
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {groupedCourses.map((group) =>
              group.courses.length === 0 ? null : (
                <details
                  key={group.id}
                  className="group rounded-xl border border-slate-700/80 bg-[#172338]"
                  open={query.length > 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400">
                    <span>
                      <span className="block font-semibold text-white">{group.title}</span>
                      <span className="mt-1 block text-sm text-slate-400">{group.description}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                      {group.courses.length} {group.courses.length === 1 ? 'course' : 'courses'}
                    </span>
                  </summary>
                  <ul className="divide-y divide-slate-700/70 border-t border-slate-700/70">
                    {group.courses.map((certification) => (
                      <li
                        key={certification.id}
                        className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          {certification.previewImage && (
                            <CredentialPreview
                              certification={certification}
                              onPreview={setLightboxCertification}
                              compact
                            />
                          )}
                          <div className="min-w-0">
                            <h4 className="font-medium leading-snug text-slate-100">
                              {certification.title}
                            </h4>
                            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                              <span>{certification.classification} · {certification.provider}</span>
                              {certification.offeredThrough && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>{certification.offeredThrough}</span>
                                </>
                              )}
                              {certification.completedDate && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>{certification.completedDate}</span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3 pl-0 sm:pl-3">
                          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Completed
                          </span>
                          {certification.verificationUrl && certification.buttonLabel && (
                            <a
                              href={certification.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-blue-300 hover:bg-blue-950/60 hover:text-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                              aria-label={`${certification.buttonLabel} for ${certification.title}`}
                            >
                              {certification.buttonLabel}
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              ),
            )}
          </div>
        )}
      </div>

      {lightboxCertification?.previewImage && (
        <dialog
          ref={dialogRef}
          className="m-auto w-[min(92vw,900px)] max-h-[90vh] rounded-2xl border border-slate-700 bg-[#111b2e] p-0 text-slate-100 shadow-2xl backdrop:bg-slate-950/80"
          aria-label={`Image preview for ${lightboxCertification.title}`}
          onClose={() => setLightboxCertification(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightboxCertification(null);
          }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-700 p-4">
            <div>
              <p className="text-xs text-slate-400">
                {lightboxCertification.classification} · {lightboxCertification.provider}
              </p>
              <h3 className="mt-1 font-semibold text-white">{lightboxCertification.title}</h3>
            </div>
            <button
              type="button"
              onClick={() => setLightboxCertification(null)}
              className="rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex max-h-[75vh] items-center justify-center overflow-auto p-4">
            <img
              src={lightboxCertification.previewImage}
              alt={`${lightboxCertification.title} credential image`}
              className="max-h-[70vh] max-w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </dialog>
      )}
    </section>
  );
}
