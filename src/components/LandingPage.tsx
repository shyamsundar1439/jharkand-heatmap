import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SocietalDomain } from '../types';
import {
  Sparkles,
  ArrowRight,
  Brain,
  GraduationCap,
  Briefcase,
  Rocket,
  BarChart3,
  Wheat,
  BookOpen,
  HeartPulse,
  Droplets,
  Trees,
  Hammer,
  Accessibility,
  Zap,
  Building,
  CheckCircle2,
  Users,
  ShieldCheck,
  Cpu,
  ChevronRight,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole, navigateTo, challenges, projects } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Citizen Reports',
      subtitle: 'Voice of the Grassroots',
      desc: 'Local citizens, farmers, teachers, and panchayats document real community challenges with photos, video logs, and geo-coordinates.',
      badge: 'Civic Intake',
      icon: <Users className="w-5 h-5 text-blue-500" />,
      color: 'border-blue-500/30 bg-blue-500/5',
      actionLabel: 'Try Reporting a Problem',
      actionRole: 'citizen' as const,
      actionView: 'report-challenge' as const,
    },
    {
      num: '02',
      title: 'AI Understands',
      subtitle: 'Multimodal Deep Analysis',
      desc: 'JanSetu AI extracts core problem domains, calculates severity scores (e.g. 8.7/10), identifies required STEM expertise, and clusters similar regional reports.',
      badge: 'Neural Engine',
      icon: <Brain className="w-5 h-5 text-indigo-500" />,
      color: 'border-indigo-500/30 bg-indigo-500/5',
      actionLabel: 'See AI Analysis Sample',
      actionRole: 'citizen' as const,
      actionView: 'challenge-details' as const,
    },
    {
      num: '03',
      title: 'University Innovates',
      subtitle: 'Faculty & Student Engineering',
      desc: 'Top academic institutions (IIT ISM, BIT Mesra, BAU) receive matched challenges and mobilize student capstone teams under expert faculty mentors.',
      badge: 'Academic R&D',
      icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
      color: 'border-purple-500/30 bg-purple-500/5',
      actionLabel: 'Explore University Projects',
      actionRole: 'university' as const,
      actionView: 'university' as const,
    },
    {
      num: '04',
      title: 'Industry Collaborates',
      subtitle: 'Corporate CSR & Tech Startups',
      desc: 'Industry leaders and deep-tech startups offer IoT hardware, prototype grant funding, technical mentorship, and manufacturing scale.',
      badge: 'Private Capital & Scale',
      icon: <Briefcase className="w-5 h-5 text-amber-500" />,
      color: 'border-amber-500/30 bg-amber-500/5',
      actionLabel: 'View Projects Seeking Support',
      actionRole: 'industry' as const,
      actionView: 'industry' as const,
    },
    {
      num: '05',
      title: 'Solution Deploys',
      subtitle: 'Pilot & Field Rollout',
      desc: 'Tested prototypes are deployed in the target village or municipal ward with direct civic participation and real-time telemetry verification.',
      badge: 'Ground Implementation',
      icon: <Rocket className="w-5 h-5 text-emerald-500" />,
      color: 'border-emerald-500/30 bg-emerald-500/5',
      actionLabel: 'Inspect Active Prototypes',
      actionRole: 'university' as const,
      actionView: 'university-project' as const,
    },
    {
      num: '06',
      title: 'Impact Measured',
      subtitle: 'Quantified Social ROI',
      desc: 'Government administration verifies tangible societal metrics—litres of water saved, respiratory infections reduced, farm income elevated.',
      badge: 'Public Accountability',
      icon: <BarChart3 className="w-5 h-5 text-rose-500" />,
      color: 'border-rose-500/30 bg-rose-500/5',
      actionLabel: 'View Social Impact Data',
      actionRole: 'government' as const,
      actionView: 'admin-impact' as const,
    },
  ];

  const domains: { name: SocietalDomain; icon: React.ReactNode; desc: string; count: number }[] = [
    {
      name: 'Agriculture',
      icon: <Wheat className="w-5 h-5 text-emerald-600" />,
      desc: 'Precision micro-irrigation, crop disease computer vision, pest deterrents',
      count: 342,
    },
    {
      name: 'Water Management',
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      desc: 'Aquifer recharge, arsenic & fluoride filtration, lake silt remediation',
      count: 284,
    },
    {
      name: 'Healthcare',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      desc: 'Vaccine & antivenom cold chain, telemedicine triaging, rural emergency logistics',
      count: 196,
    },
    {
      name: 'Education',
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      desc: 'Solar offline digital micro-clouds, STEM experiential learning kits',
      count: 158,
    },
    {
      name: 'Environment',
      icon: <Trees className="w-5 h-5 text-teal-600" />,
      desc: 'Wet electrostatic air scrubbers, bio-acoustic wildlife deterrents, wildfire detection',
      count: 142,
    },
    {
      name: 'Rural Livelihoods',
      icon: <Hammer className="w-5 h-5 text-amber-600" />,
      desc: 'PCM forest harvest thermal vaults, ergonomic handloom mechanization',
      count: 118,
    },
    {
      name: 'Accessibility',
      icon: <Accessibility className="w-5 h-5 text-violet-600" />,
      desc: 'Universal hospital ramps, assistive stair glides, vernacular tactile tools',
      count: 86,
    },
    {
      name: 'Energy',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      desc: 'Solar battery thermal cooling, microgrid power conditioning, biogas hubs',
      count: 94,
    },
    {
      name: 'Urban Development',
      icon: <Building className="w-5 h-5 text-sky-600" />,
      desc: 'Automated culvert trash rakes, stormwater flash flood telemetry, waste sorting',
      count: 76,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12" id="landing-page-root">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        {/* Background glow and subtle grid */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle chip */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-6 shadow-xs animate-in fade-in slide-in-from-top-3 duration-300">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Societal Innovation Collaboration Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            <span className="text-slate-500 font-normal">State Pilot Jharkhand</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Turn Local Challenges Into{' '}
            <span className="text-indigo-600">
              Real Solutions.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            JanSetu connects citizens, universities, industry and government to transform real societal challenges
            into innovation and measurable social impact.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => {
                setRole('citizen');
                navigateTo('report-challenge');
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm shadow-indigo-100 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              id="landing-hero-report-cta"
            >
              <span>Report a Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setRole('government');
                navigateTo('government');
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center justify-center space-x-2"
              id="landing-hero-explore-cta"
            >
              <span>Explore Innovation Ecosystem</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Key Metrics Bar */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-center p-2">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">1,248</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Challenges Reported</div>
            </div>
            <div className="text-center p-2 border-l border-slate-100">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600">18</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Universities Active</div>
            </div>
            <div className="text-center p-2 border-l border-slate-100">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">42</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Industry CSR Partners</div>
            </div>
            <div className="text-center p-2 border-l border-slate-100">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">12,500+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Citizens Benefited</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 6-STEP VISUAL PROCESS (THE CORE WORKFLOW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="how-jansetu-works">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>End-to-End Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">How JanSetu Works</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A continuous loop transforming unstructured civic pain points into verified engineering prototypes and measured societal impact.
          </p>
        </div>

        {/* 6 Step Interactive Horizontal Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                activeStep === idx
                  ? 'bg-white border-indigo-500 ring-2 ring-indigo-50 shadow-sm'
                  : 'bg-white hover:bg-slate-50/50 border-slate-200 shadow-sm hover:border-slate-300'
              }`}
              id={`process-step-${step.num}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-slate-300 group-hover:text-indigo-600 transition-colors">
                    {step.num}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">{step.icon}</div>
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
                  {step.badge}
                </div>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs font-semibold text-indigo-600 mb-2">{step.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRole(step.actionRole);
                    navigateTo(step.actionView);
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ROLE GATEWAY - QUICK DEMO ACCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">Hackathon Role Sandbox</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Experience the Ecosystem As:</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Click any role below to launch the dedicated portal with pre-loaded mock workflows and interactive states.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Citizen Card */}
              <div
                onClick={() => {
                  setRole('citizen');
                  navigateTo('citizen');
                }}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all hover:shadow-sm flex flex-col justify-between"
                id="landing-role-citizen-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Citizen Portal</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Submit local challenges, view AI severity feedback, and track solution progress in real-time.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 space-x-1">
                  <span>Enter as Citizen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Government Card */}
              <div
                onClick={() => {
                  setRole('government');
                  navigateTo('government');
                }}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all hover:shadow-sm flex flex-col justify-between"
                id="landing-role-govt-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Government / Admin</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Review and verify citizen submissions, assign universities, monitor district maps, and track social impact.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 space-x-1">
                  <span>Enter as Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* University Card */}
              <div
                onClick={() => {
                  setRole('university');
                  navigateTo('university');
                }}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all hover:shadow-sm flex flex-col justify-between"
                id="landing-role-univ-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">University Portal</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Accept matched challenges, build faculty-student research teams, run project milestones, and publish updates.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-purple-700 space-x-1">
                  <span>Enter as University</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Industry Card */}
              <div
                onClick={() => {
                  setRole('industry');
                  navigateTo('industry');
                }}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all hover:shadow-sm flex flex-col justify-between"
                id="landing-role-ind-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Industry / Startup</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Discover projects seeking hardware or funding, submit collaboration offers, and mentor student innovators.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-amber-700 space-x-1">
                  <span>Enter as Industry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SOCIETAL DOMAINS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Societal Innovation Domains</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            JanSetu addresses core grassroot challenges categorized across 9 vital development frontiers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((dom) => (
            <div
              key={dom.name}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex items-start space-x-3.5"
            >
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 shrink-0">{dom.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{dom.name}</h4>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {dom.count}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{dom.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: FEATURED REAL PROJECTS BREAKTHROUGH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-indigo-600 font-bold">Proven Innovations</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Active Solutions in the Field
            </h2>
          </div>
          <button
            onClick={() => {
              setRole('government');
              navigateTo('government');
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 mt-2 sm:mt-0"
          >
            <span>View all 126 active projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(projects || []).slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700">
                    {proj.domain}
                  </span>
                  <span className="font-semibold text-slate-500">{proj.currentStage}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-2 mt-1">{proj.name}</h3>
                <p className="text-xs text-slate-500 mt-1">Led by {proj.universityName}</p>
                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">{proj.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-500">Project Progress</span>
                  <span className="font-bold text-slate-900">{proj.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${proj.progressPercent}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">{proj.students.length}</span> students involved
                  </div>
                  <button
                    onClick={() => {
                      setRole('university');
                      navigateTo('university-project', { projectId: proj.id });
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
