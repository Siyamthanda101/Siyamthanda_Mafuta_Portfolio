import { useState, useRef, type FormEvent, type ChangeEvent, type DragEvent } from 'react';
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Code, 
  Network, 
  Sparkles, 
  Cpu, 
  Camera, 
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  Trash2,
  X,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export default function Hero() {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('siyamthanda_user_profile_photo');
      if (saved) return saved;
    }
    return PERSONAL_INFO.photoUrl || '/professional_image.png';
  });
  
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [tempInputUrl, setTempInputUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (.png, .jpg, .jpeg, or .webp).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomPhotoUrl(result);
        if (typeof window !== 'undefined') {
          localStorage.setItem('siyamthanda_user_profile_photo', result);
        }
        setUploadSuccessMessage('Original photo loaded and applied successfully!');
        setTimeout(() => setUploadSuccessMessage(null), 4000);
        setShowPhotoModal(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUrlSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tempInputUrl.trim()) {
      const url = tempInputUrl.trim();
      setCustomPhotoUrl(url);
      if (typeof window !== 'undefined') {
        localStorage.setItem('siyamthanda_user_profile_photo', url);
      }
      setUploadSuccessMessage('Photo URL applied successfully!');
      setTimeout(() => setUploadSuccessMessage(null), 4000);
      setShowPhotoModal(false);
      setTempInputUrl('');
    }
  };

  const handleResetPhoto = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('siyamthanda_user_profile_photo');
    }
    setCustomPhotoUrl('/professional_image.png');
    setUploadSuccessMessage('Reverted to default image.');
    setTimeout(() => setUploadSuccessMessage(null), 3000);
    setShowPhotoModal(false);
  };

  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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
            
            {/* Introduction Label & Status */}
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
              Computer Engineering Student |{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Building Across Software, AI, Networks & Intelligent Systems
              </span>
            </h2>

            {/* Supporting Paragraph */}
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 text-slate-200 border border-slate-800 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <span>{tag}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Two Main Call-to-Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                id="hero-explore-work-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all duration-200 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                id="hero-get-in-touch-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Get In Touch</span>
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
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-850 transition-colors"
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
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-850 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent, Elegant Profile Image Area */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md">
              
              {/* Rectangular container with softly rounded corners */}
              <div 
                id="hero-profile-container"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative bg-gradient-to-b from-[#0e1627] to-[#0a0f1d] p-3.5 rounded-2xl border transition-all duration-200 shadow-xl shadow-black/40 backdrop-blur-xl group ${
                  isDragging ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-800'
                }`}
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
                  <button
                    type="button"
                    onClick={() => setShowPhotoModal(true)}
                    className="text-[10px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
                    title="Upload or Change Photo"
                  >
                    <Upload className="w-3 h-3" />
                    <span>CHANGE PHOTO</span>
                  </button>
                </div>

                {/* Drag-over overlay */}
                {isDragging && (
                  <div className="absolute inset-0 z-30 bg-blue-950/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-blue-400">
                    <Upload className="w-10 h-10 text-blue-400 mb-2 animate-bounce" />
                    <p className="text-sm font-bold text-white">Drop your original photo here</p>
                    <p className="text-xs text-blue-200 mt-1">Accepts PNG, JPG, JPEG, WEBP</p>
                  </div>
                )}

                {/* Success notification */}
                {uploadSuccessMessage && (
                  <div className="mb-2 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in duration-200">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{uploadSuccessMessage}</span>
                  </div>
                )}

                {/* Primary Image / Clearly Temporary Neutral Placeholder */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-[#0b1222] border border-slate-800/90 flex flex-col items-center justify-between p-6 text-center">
                  
                  {customPhotoUrl ? (
                    <div className="relative w-full h-full group/photo">
                      <img
                        src={customPhotoUrl}
                        alt="Siyamthanda Mafuta - Professional Portrait"
                        className="w-full h-full object-cover object-top rounded-lg"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setCustomPhotoUrl(null);
                        }}
                      />
                      {/* Action buttons on hover */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover/photo:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => setShowPhotoModal(true)}
                          className="p-1.5 rounded-md bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer shadow-lg"
                          title="Upload / Change Photo"
                          aria-label="Upload or change photo"
                        >
                          <Camera className="w-3.5 h-3.5 text-blue-400" />
                        </button>
                      </div>
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
                            Profile Portrait Frame
                          </p>
                          <p className="text-xs text-slate-400 max-w-[220px] mx-auto leading-relaxed">
                            Upload your original graduation photograph directly.
                          </p>
                        </div>
                      </div>

                      {/* Easily upload original photo button */}
                      <button
                        type="button"
                        onClick={() => setShowPhotoModal(true)}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-white px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 font-semibold transition-colors cursor-pointer shadow-md"
                        id="hero-toggle-photo-input-btn"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Add Original Photo</span>
                      </button>
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

                {/* Photo Upload & Change Modal */}
                {showPhotoModal && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="photo-modal-title"
                    onClick={() => setShowPhotoModal(false)}
                  >
                    <div
                      className="bg-[#0b111e] border border-blue-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-left relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Close button */}
                      <button
                        type="button"
                        onClick={() => setShowPhotoModal(false)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 cursor-pointer transition-colors"
                        aria-label="Close dialog"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2.5 text-xs font-mono text-blue-400 mb-2">
                        <Camera className="w-4 h-4" />
                        <span>PROFILE PHOTO MANAGER</span>
                      </div>

                      <h3 id="photo-modal-title" className="text-xl font-bold text-white mb-1">
                        Use Original Profile Photograph
                      </h3>
                      <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Add your unaltered original photo directly. The image will be applied exactly as provided without filters, edits, or regeneration.
                      </p>

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                      />

                      {/* Primary Option: Drag and Drop or Browse File */}
                      <div className="space-y-4">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-6 text-center bg-slate-900/60 hover:bg-slate-900 cursor-pointer transition-all group/drop"
                        >
                          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover/drop:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                          </div>
                          <p className="text-sm font-semibold text-slate-200 group-hover/drop:text-blue-300">
                            Click to browse or drop your original photo here
                          </p>
                          <p className="text-xs text-slate-400 mt-1 font-mono">
                            Supports PNG, JPG, JPEG, WEBP (stored locally in high resolution)
                          </p>
                        </div>

                        <div className="relative flex items-center justify-center">
                          <div className="border-t border-slate-800 w-full"></div>
                          <span className="bg-[#0b111e] px-3 text-[11px] font-mono text-slate-500 uppercase">
                            Or Use Direct URL
                          </span>
                        </div>

                        {/* Secondary Option: Direct Image URL */}
                        <form onSubmit={handleUrlSubmit} className="space-y-2">
                          <label htmlFor="photo-url-input" className="block text-xs font-mono text-slate-400">
                            Image URL:
                          </label>
                          <div className="flex gap-2">
                            <input
                              id="photo-url-input"
                              type="url"
                              placeholder="https://.../my-photo.jpg"
                              value={tempInputUrl}
                              onChange={(e) => setTempInputUrl(e.target.value)}
                              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                              Apply URL
                            </button>
                          </div>
                        </form>

                        {/* Reset / Actions */}
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleResetPhoto}
                            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Reset to Default</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowPhotoModal(false)}
                            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                          >
                            Close
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

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
