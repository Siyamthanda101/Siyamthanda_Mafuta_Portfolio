import { useState, type FormEvent } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Phone,
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
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
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    if (PERSONAL_INFO.phone) {
      navigator.clipboard.writeText(PERSONAL_INFO.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getMailtoUrl = () => {
    const mailSubject = subject.trim() 
      ? `[Portfolio Contact] ${subject.trim()}` 
      : `[Portfolio Contact] Inquiry from ${name.trim() || 'Visitor'}`;
    const mailBody = `Hello Siyamthanda,\n\n${message.trim() || '[Your message here]'}\n\n---\nFrom: ${name.trim() || '[Your Name]'}\nEmail: ${email.trim() || '[Your Email]'}`;
    return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  };

  const getGmailWebUrl = () => {
    const mailSubject = subject.trim() 
      ? `[Portfolio Contact] ${subject.trim()}` 
      : `[Portfolio Contact] Inquiry from ${name.trim() || 'Visitor'}`;
    const mailBody = `Hello Siyamthanda,\n\n${message.trim() || '[Your message here]'}\n\n---\nFrom: ${name.trim() || '[Your Name]'}\nEmail: ${email.trim() || '[Your Email]'}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Dispatch real email message to Siyamthanda via FormSubmit API
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(PERSONAL_INFO.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _replyto: email.trim(),
          _subject: subject.trim() 
            ? `Portfolio Message: ${subject.trim()}` 
            : `New Portfolio Inquiry from ${name.trim()}`,
          message: message.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok || (data && (data.success === 'true' || data.success === true))) {
        setIsSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error(data?.message || 'Unable to deliver message through endpoint.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmissionError(
        'Direct web dispatch was restricted by browser/network settings. You can send your message directly using your email app below without losing your text:'
      );
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Personal Email</span>
                  </span>
                  <div className="flex items-center gap-2">
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
                </div>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="block text-sm font-mono font-medium text-white hover:text-blue-300 transition-colors break-all"
                  title="Click to compose an email"
                >
                  {PERSONAL_INFO.email}
                </a>

                {/* Quick email client triggers */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-[11px] font-mono text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-750 transition-colors inline-flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3 text-blue-400" />
                    <span>Mail App</span>
                  </a>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-750 transition-colors inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 text-red-400" />
                    <span>Open in Gmail</span>
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              {PERSONAL_INFO.phone && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      <span>Phone / Mobile</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                      id="copy-phone-btn"
                    >
                      {copiedPhone ? (
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
                    href={PERSONAL_INFO.phoneTel}
                    className="block text-sm font-mono font-medium text-white hover:text-blue-300 transition-colors"
                  >
                    {PERSONAL_INFO.phone} <span className="text-xs text-slate-400 font-normal">({PERSONAL_INFO.phoneIntl})</span>
                  </a>
                </div>
              )}

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
                  Thank you for reaching out! Your message was delivered directly to Siyamthanda at <span className="font-mono text-blue-300 font-semibold">{PERSONAL_INFO.email}</span>. He has received your notification and will reply shortly.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2 rounded-lg text-xs font-semibold text-blue-300 bg-blue-950 border border-blue-800 hover:bg-blue-900 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Open Email App</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Network / Dispatch Error Fallback Banner */}
                {submissionError && (
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs space-y-2.5">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{submissionError}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 pt-1 pl-6">
                      <a
                        href={getMailtoUrl()}
                        id="fallback-mailto-btn"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-[11px] font-medium border border-amber-500/40 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Mail App</span>
                      </a>
                      <a
                        href={getGmailWebUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="fallback-gmail-btn"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] font-medium border border-slate-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                        <span>Open in Gmail</span>
                      </a>
                    </div>
                  </div>
                )}

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
                    placeholder="e.g. Engineering Opportunity / Project Collaboration"
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

                {/* Submit & Alternative Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span>Direct delivery to {PERSONAL_INFO.email}</span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <a
                      href={getMailtoUrl()}
                      id="contact-mailto-client-btn"
                      title="Open your device's default email client with your message prefilled"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-medium text-slate-300 bg-slate-850 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span className="hidden sm:inline">Send via Mail App</span>
                      <span className="sm:hidden">Mail App</span>
                    </a>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-submit-btn"
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition-all duration-200 shadow-md shadow-blue-600/25 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          <span>Sending...</span>
                        </span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
