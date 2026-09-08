import { useState, type FormEvent } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please provide a message or inquiry.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate clean frontend submission state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 900);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative border-b border-slate-800/40 bg-[#080d17]/50"
      aria-label="Contact Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/40 text-blue-400 font-mono text-xs mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>07 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Contact Siyamthanda
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Interested in engineering collaboration, graduate opportunities, or discussing practical software, networking, or intelligent systems? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* Left Column: Direct Contact Info & Verified Profiles */}
          <div className="lg:col-span-5 space-y-6 reveal-on-scroll">
            <div className="bg-[#0b101d] p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl card-lift-hover">
              <h3 className="text-base font-bold text-white tracking-tight">
                Direct Contact & Verified Handles
              </h3>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Email Address</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    id="copy-email-btn"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="block text-sm font-mono font-medium text-white hover:text-blue-300 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Location</span>
                </div>
                <p className="text-sm font-medium text-white">
                  {PERSONAL_INFO.location}
                </p>
                <p className="text-xs text-slate-400">
                  Available for engineering opportunities, hybrid and on-site in Cape Town, or remote collaboration.
                </p>
              </div>

              {/* Profiles */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Verified Online Profiles
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-github-link"
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 flex items-center justify-between text-xs text-slate-200 transition-colors group"
                  >
                    <span className="font-mono">GitHub / Siyamthanda101</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-linkedin-link"
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-850 flex items-center justify-between text-xs text-slate-200 transition-colors group"
                  >
                    <span className="font-mono">LinkedIn Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#0c1220] p-6 sm:p-8 rounded-2xl border border-blue-500/25 shadow-2xl reveal-on-scroll card-lift-hover">
            {isSuccess ? (
              <div className="py-12 px-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been received and Siyamthanda will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2 rounded-lg text-xs font-semibold text-blue-300 bg-blue-950 border border-blue-800 hover:bg-blue-900 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. John Doe"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="e.g. name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject / Reason for Contact
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Engineering Opportunity / CSI-Heart Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    placeholder="Write your inquiry or message here..."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors resize-y ${
                      errors.message ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    * Ready for backend API integration
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition-all duration-200 shadow-md shadow-blue-600/25 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
