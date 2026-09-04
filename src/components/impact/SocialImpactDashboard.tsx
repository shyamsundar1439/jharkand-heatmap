import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  TrendingUp,
  Droplets,
  Wheat,
  HeartPulse,
  BookOpen,
  Trees,
  CheckCircle2,
  Users,
  Building2,
  Briefcase,
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

export const SocialImpactDashboard: React.FC = () => {
  const { impactMetrics, projects, navigateTo, setRole } = useApp();

  const [timeframe, setTimeframe] = useState<'all' | '2026' | '2025'>('all');

  const defaultMetrics = {
    citizensBenefited: 12500,
    solutionsDeployed: 14,
    universitiesActive: 18,
    industryPartners: 42,
    economicValueGenerated: '₹4.2 Cr',
    waterSavedLitres: '3.8M L',
  };

  const metrics = impactMetrics || defaultMetrics;

  // Month-by-month civic impact growth
  const monthlyImpactTrend = [
    { month: 'Jul', beneficiaries: 1200, waterSavedKL: 400 },
    { month: 'Aug', beneficiaries: 2600, waterSavedKL: 950 },
    { month: 'Sep', beneficiaries: 4800, waterSavedKL: 1600 },
    { month: 'Oct', beneficiaries: 7200, waterSavedKL: 2400 },
    { month: 'Nov', beneficiaries: 9500, waterSavedKL: 3100 },
    { month: 'Dec', beneficiaries: 11400, waterSavedKL: 3500 },
    { month: 'Jan', beneficiaries: 12500, waterSavedKL: 3820 },
  ];

  const caseStudies = [
    {
      title: 'Namkum Smart Irrigation & Borewell Telemetry',
      domain: 'Agriculture & Water',
      district: 'Ranchi',
      university: 'Birsa Agricultural University + BIT Mesra',
      partner: 'Tata Steel Rural Development Society (TSRDS)',
      image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=800&auto=format&fit=crop&q=80',
      beneficiaries: '340 farming households',
      outcome: '34% reduction in dry-season groundwater consumption; average rabi crop yields increased by 22%.',
      status: 'Field Deployed • 8 Months Active',
    },
    {
      title: 'GyanVriksha Solar Offline STEM Micro-Cloud',
      domain: 'Vernacular Education',
      district: 'Latehar',
      university: 'IIT (ISM) Dhanbad',
      partner: 'Coal India CMPDI CSR',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
      beneficiaries: '1,800 tribal students across 14 forest ashram schools',
      outcome: 'Zero internet dependency; 42 interactive STEM simulation modules delivered in Santhali and Mundari.',
      status: 'Field Deployed • 6 Months Active',
    },
    {
      title: 'Sanjeevani-Box Antivenom & Vaccine Cold Chain',
      domain: 'Rural Healthcare',
      district: 'Gumla & Simdega',
      university: 'NIT Jamshedpur',
      partner: 'Zenith Micro-Mobility Labs',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
      beneficiaries: '4,200 villagers across 8 primary health sub-centers',
      outcome: '100% preservation of polyvalent snakebite antivenom and rabies vaccines during 14-hour monsoon outages.',
      status: 'Field Deployed • 4 Months Active',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="social-impact-dashboard-root">
      {/* Hero Impact Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3 border border-indigo-100">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Public Societal Accountability & Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Measurable Social Impact Across Jharkhand
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-normal">
            JanSetu bridges citizens, universities, and industry. Here is the verified audit of tangible societal returns—from litres of groundwater preserved to students empowered in remote forest clusters.
          </p>
        </div>
      </div>

      {/* TOP AUDIT METRICS TILES */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="impact-audit-metrics">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Users className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase text-emerald-600">Lives</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{(metrics.citizensBenefited || 12500).toLocaleString()}+</div>
          <div className="text-xs text-slate-500 mt-0.5">Citizens Benefited</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase text-indigo-600">Solutions</span>
          </div>
          <div className="text-2xl font-black text-indigo-700">{metrics.solutionsDeployed || 14}</div>
          <div className="text-xs text-slate-500 mt-0.5">Solutions Deployed</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Building2 className="w-4 h-4 text-purple-600" />
            <span className="text-[10px] font-bold uppercase text-purple-600">R&D Hubs</span>
          </div>
          <div className="text-2xl font-black text-purple-700">{metrics.universitiesActive || 18}</div>
          <div className="text-xs text-slate-500 mt-0.5">Universities Active</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase text-amber-600">Partners</span>
          </div>
          <div className="text-2xl font-black text-amber-700">{metrics.industryPartners || 42}</div>
          <div className="text-xs text-slate-500 mt-0.5">Industry Partners</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase text-blue-600">Economic</span>
          </div>
          <div className="text-2xl font-black text-blue-700">{metrics.economicValueGenerated || '₹4.2 Cr'}</div>
          <div className="text-xs text-slate-500 mt-0.5">Economic Value</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Droplets className="w-4 h-4 text-cyan-600" />
            <span className="text-[10px] font-bold uppercase text-cyan-600">Water</span>
          </div>
          <div className="text-2xl font-black text-cyan-700">{metrics.waterSavedLitres || '3.8M L'}</div>
          <div className="text-xs text-slate-500 mt-0.5">Water Preserved</div>
        </div>
      </div>

      {/* TREND CHART & DOMAIN BREAKDOWN ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cumulative Citizens Benefited Trend */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Beneficiary Reach Trajectory</h3>
              <p className="text-xs text-slate-500">Cumulative citizens impacted through deployed university prototypes</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
              +148% Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyImpactTrend}>
                <defs>
                  <linearGradient id="colorBen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="beneficiaries"
                  stroke="#059669"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBen)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact By Domain Breakdown Cards */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Impact by Domain</h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-emerald-600" />
                  <span>Agriculture</span>
                </span>
                <span className="text-emerald-700">4,200 Farmers</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Smart irrigation & disease CV triage</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>Clean Water</span>
                </span>
                <span className="text-blue-700">3.8M Litres Saved</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Arsenic filters & borewell shutoffs</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-600" />
                  <span>Healthcare</span>
                </span>
                <span className="text-rose-700">3,400 Patients</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Antivenom & vaccine solar cold chains</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Education</span>
                </span>
                <span className="text-purple-700">2,600 Students</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Solar offline Vernacular STEM clouds</p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED CASE STUDIES OF DEPLOYED INNOVATIONS */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold">Field Deployment Case Studies</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Proven Innovations in Daily Ground Use
          </h2>
          <p className="text-xs text-slate-500">
            Real societal problems turned into student capstones, scaled with CSR capital, and actively improving lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-slate-100 overflow-hidden relative">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                    {cs.domain}
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {cs.status}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2">{cs.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {cs.district} • {cs.university}
                  </p>

                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 text-xs border border-slate-100">
                    <span className="font-bold text-slate-800 block mb-0.5">Verified Impact Outcome:</span>
                    <span className="text-slate-600 leading-relaxed">{cs.outcome}</span>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 font-medium">
                    Beneficiaries: <span className="font-bold text-slate-900">{cs.beneficiaries}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                  Supported by: {cs.partner}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
