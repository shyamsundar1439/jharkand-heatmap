import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Brain,
  CheckCircle2,
  Clock,
  Building2,
  Briefcase,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ChallengeDetailsModal: React.FC = () => {
  const {
    getSelectedChallenge,
    navigateTo,
    setRole,
    projects,
    universities,
    assignUniversity,
    verifyChallenge,
  } = useApp();

  const challenge = getSelectedChallenge();
  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-sm text-slate-500">Challenge not found.</p>
        <button
          onClick={() => navigateTo('citizen')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Portal
        </button>
      </div>
    );
  }

  // Linked project if exists
  const associatedProject = projects.find((p) => p.id === challenge.associatedProjectId || p.challengeId === challenge.id);

  // 7-Stage visual lifecycle
  const lifecycleStages = [
    { key: 'submitted', label: 'Challenge Submitted', desc: 'Reported by local citizen' },
    { key: 'ai_analyzed', label: 'AI Analysis', desc: 'Domain & severity assessed' },
    { key: 'govt_verified', label: 'Government Validation', desc: 'Verified by District Admin' },
    { key: 'university_assigned', label: 'University Assigned', desc: 'Academic institution matched' },
    { key: 'project_created', label: 'Project Created', desc: 'Faculty-student team mobilized' },
    { key: 'industry_collaborating', label: 'Industry Collaboration', desc: 'CSR funding & hardware linked' },
    { key: 'deployed', label: 'Implementation & Impact', desc: 'Ground solution verified' },
  ];

  // Map challenge status to stage index
  const getStageIndex = (status: string) => {
    switch (status) {
      case 'submitted':
        return 0;
      case 'ai_analyzed':
        return 1;
      case 'govt_verified':
        return 2;
      case 'university_assigned':
        return 3;
      case 'project_created':
        return 4;
      case 'industry_collaborating':
      case 'in_testing':
        return 5;
      case 'deployed':
      case 'resolved':
        return 6;
      default:
        return 1;
    }
  };

  const currentStageIndex = getStageIndex(challenge.status);

  // Recommended Universities based on domain
  const matchedUniversities = (universities || [])
    .filter((u) => (u.specializations || []).some((s) => s.toLowerCase().includes((challenge.category || '').toLowerCase()) || s.toLowerCase().includes('water') || s.toLowerCase().includes('iot')))
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="challenge-details-view">
      {/* Back link & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={() => navigateTo('citizen')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Challenge List</span>
        </button>

        <div className="flex items-center space-x-2">
          {challenge.status === 'ai_analyzed' && (
            <button
              onClick={() => {
                verifyChallenge(challenge.id);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin: Verify Challenge</span>
            </button>
          )}

          {associatedProject && (
            <button
              onClick={() => {
                setRole('university');
                navigateTo('university-project', { projectId: associatedProject.id });
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs"
              id="view-linked-project-btn"
            >
              <span>View R&D Project Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {challenge.id}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
              {challenge.category} • {challenge.subcategory}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Progress: {challenge.progressPercent}%</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Status: {challenge.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {challenge.title}
        </h1>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <MapPin className="w-4 h-4 text-rose-500" />
            {challenge.specificLocation ? `${challenge.specificLocation}, ` : ''}
            {challenge.villageOrCity}, {challenge.district}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            Reported: {challenge.submittedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-400" />
            Submitted By: {challenge.submittedBy?.name || 'Citizen'} ({challenge.submittedBy?.userType || 'Resident'})
          </span>
          {challenge.assignedUniversityName && (
            <span className="flex items-center gap-1.5 text-indigo-600 font-semibold">
              <Building2 className="w-4 h-4" />
              Lead University: {challenge.assignedUniversityName}
            </span>
          )}
        </div>
      </div>

      {/* 7-STAGE VISUAL LIFECYCLE TIMELINE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Societal Innovation Lifecycle</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking from citizen report to verified ground social impact.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
            Stage {currentStageIndex + 1} of 7
          </span>
        </div>

        {/* Timeline track */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 relative">
          {lifecycleStages.map((stg, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isUpcoming = idx > currentStageIndex;

            return (
              <div
                key={stg.key}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                    {isCompleted ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <h4 className={`text-xs font-bold ${isCurrent ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {stg.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{stg.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/50">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted ? 'text-emerald-700' : isCurrent ? 'text-indigo-700' : 'text-slate-400'
                    }`}
                  >
                    {isCompleted ? 'Completed' : isCurrent ? 'Current' : 'Upcoming'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Description & AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Problem & Evidence (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Details */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Problem Description & Ground Reality</h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">{challenge.description}</p>

            {challenge.govtReviewNotes && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs">
                <span className="font-bold text-indigo-900 block mb-1">Government Validation Note:</span>
                <span className="text-indigo-800">{challenge.govtReviewNotes}</span>
              </div>
            )}
          </div>

          {/* Evidence Media Gallery */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Civic Ground Evidence</h3>
              <span className="text-xs text-slate-500">{challenge.evidence.length} file(s) attached</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {challenge.evidence.map((ev, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                  {ev.type === 'image' ? (
                    <div className="h-44 overflow-hidden bg-slate-200 relative group">
                      <img
                        src={ev.url}
                        alt={ev.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <span className="text-xs font-semibold text-white truncate">{ev.title}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        PDF
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{ev.title}</div>
                        <div className="text-[11px] text-slate-500">{ev.size || 'Document verification'}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & University Matches (1 col) */}
        <div className="space-y-6">
          {/* AI Intelligence Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-800/80 mb-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                <h4 className="text-sm font-bold text-white">AI Analysis Score</h4>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                {challenge.aiAnalysis.severityScore} / 10 Severity
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Primary Domain</span>
                <span className="font-bold text-indigo-200 text-sm">{challenge.aiAnalysis.primaryDomain}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Required Expertise</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {challenge.aiAnalysis.requiredExpertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/10 text-slate-200 text-[11px] font-medium border border-white/10"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                  Recommended Technologies
                </span>
                <div className="space-y-1 mt-1 text-slate-300 text-[11px]">
                  {challenge.aiAnalysis.recommendedTechnologies.map((tech, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <span className="w-1 h-1 rounded-full bg-indigo-400" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Universities */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Recommended University Labs</h4>
            <p className="text-xs text-slate-500 mb-4">Ranked by lab equipment and faculty specialization match.</p>

            <div className="space-y-3">
              {matchedUniversities.map((univ, idx) => (
                <div
                  key={univ.id}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{univ.name}</span>
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {94 - idx * 4}% Match
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {univ.district} • {univ.activeProjectsCount} active social projects
                  </div>

                  {!challenge.assignedUniversityId && (
                    <button
                      onClick={() => assignUniversity(challenge.id, univ.id)}
                      className="mt-2.5 w-full py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs font-bold transition-colors"
                    >
                      Assign to this University
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
