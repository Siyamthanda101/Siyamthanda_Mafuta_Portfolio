import { 
  GraduationCap, 
  Network, 
  Code2, 
  Cpu, 
  BrainCircuit, 
  Cloud, 
  ArrowDown
} from 'lucide-react';
import { ABOUT_PARAGRAPHS } from '../data/portfolioData.ts';

interface JourneyNode {
  title: string;
  icon: typeof GraduationCap;
  note: string;
  category: string;
}

const JOURNEY_NODES: JourneyNode[] = [
  {
    title: 'Computer Engineering',
    icon: GraduationCap,
    category: 'Academic Foundation',
    note: 'Foundational degree studies in hardware, digital systems, and engineering problem-solving.',
  },
  {
    title: 'Networks & Systems',
    icon: Network,
    category: 'Infrastructure',
    note: 'Network infrastructure, TCP/IP fundamentals, Cisco switching, and Linux administration.',
  },
  {
    title: 'Software Development',
    icon: Code2,
    category: 'Development',
    note: 'Application logic, backend programming, data structures, and script automation.',
  },
  {
    title: 'Embedded Systems',
    icon: Cpu,
    category: 'Hardware & IoT',
    note: 'Interfacing microcontrollers (ESP32), sensor signals, and low-level communication.',
  },
  {
    title: 'AI & Machine Learning',
    icon: BrainCircuit,
    category: 'Intelligent Systems',
    note: 'Core machine learning, neural concepts, generative AI, and prompt engineering.',
  },
  {
    title: 'Cloud Technologies',
    icon: Cloud,
    category: 'Modern Deployments',
    note: 'Database architectures, cloud fundamentals, and contemporary operational tools.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 relative border-b border-slate-800/50 bg-[#090d18]/60"
      aria-label="About Me Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/50 text-blue-400 font-mono text-xs mb-3">
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-2 text-sm sm:text-base font-mono text-slate-400">
            A journey of continuous technical growth, practical problem-solving, and systems thinking.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Side: About Me Narrative */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-sm space-y-5">
              {ABOUT_PARAGRAPHS.map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className="text-slate-300 text-base sm:text-[1.03rem] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              {/* Verified academic context callout */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-blue-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Based in Cape Town, South Africa
                </span>
                <span className="text-slate-400">CPUT Engineering</span>
              </div>
            </div>
          </div>

          {/* Right Side: Visual "Technology Journey" Component */}
          <div className="lg:col-span-6 text-left">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-sm">
              
              {/* Header explaining that these are areas of development and interest */}
              <div className="mb-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Technology Journey
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Areas of development and interest (not job titles)
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-950/70 border border-blue-800/40 text-blue-300">
                  6 Key Areas
                </span>
              </div>

              {/* Connected Flow List */}
              <div className="space-y-2 relative">
                {JOURNEY_NODES.map((node, index) => {
                  const Icon = node.icon;
                  const isLast = index === JOURNEY_NODES.length - 1;

                  return (
                    <div key={node.title} className="relative group">
                      
                      {/* Node Card */}
                      <div className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 group-hover:border-blue-500/40 group-hover:bg-slate-850 transition-all duration-200">
                        <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-400 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-blue-300 transition-colors truncate">
                              {node.title}
                            </h4>
                            <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded shrink-0">
                              {node.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-snug">
                            {node.note}
                          </p>
                        </div>
                      </div>

                      {/* Connecting Line with Arrow indicator */}
                      {!isLast && (
                        <div className="flex justify-center py-1">
                          <div className="flex items-center gap-1 text-slate-600">
                            <span className="w-px h-3 bg-slate-700"></span>
                            <ArrowDown className="w-3 h-3 text-blue-500/60" />
                            <span className="w-px h-3 bg-slate-700"></span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
