import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  Compass,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Bell,
  User,
  Filter,
  Search,
} from 'lucide-react';

export const CitizenPortal: React.FC = () => {
  const { challenges, navigateTo, setRole, setIsNotificationsOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'my-challenges' | 'track'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter challenges for citizen perspective
  const citizenChallenges = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Citizen stats
  const submittedCount = 5;
  const underReviewCount = 2;
  const inProgressCount = 2;
  const resolvedCount = 1;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">Submitted</span>;
      case 'ai_analyzed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">AI Analyzed</span>;
      case 'govt_verified':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Govt Verified</span>;
      case 'university_assigned':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">University Assigned</span>;
      case 'project_created':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800">Project In Progress</span>;
      case 'industry_collaborating':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800">Industry Partnered</span>;
      case 'in_testing':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-800">Testing Prototype</span>;
      case 'deployed':
      case 'resolved':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800">Resolved & Deployed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" id="citizen-portal-root">
      {/* Clean Minimalist Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Citizen Innovation Portal • Jharkhand Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Good morning, Rajesh
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Transforming local community challenges into verified regional engineering solutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('report-challenge')}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center space-x-2 text-sm shrink-0"
            id="citizen-main-report-btn"
          >
            <Plus className="w-4 h-4" />
            <span>+ Report a Challenge</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1.5">Main Menu</div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2.5 ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              id="citizen-tab-dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo('report-challenge')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-between"
              id="citizen-tab-report"
            >
              <div className="flex items-center space-x-2.5">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Report Challenge</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700">New</span>
            </button>

            <button
              onClick={() => setActiveTab('my-challenges')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2.5 ${
                activeTab === 'my-challenges'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              id="citizen-tab-challenges"
            >
              <FileText className="w-4 h-4" />
              <span>My Submissions ({submittedCount})</span>
            </button>

            <button
              onClick={() => {
                navigateTo('challenge-details', { challengeId: 'CH-2026-081' });
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center space-x-2.5"
              id="citizen-tab-track"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Track Progress</span>
            </button>

            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center space-x-2.5"
              id="citizen-tab-notifications"
            >
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => navigateTo('admin-impact')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center space-x-2.5"
              id="citizen-tab-impact"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Social Impact</span>
            </button>
          </div>

          {/* Impact Score Card matching Design system */}
          <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-sm">
            <div className="text-xs opacity-80 mb-1 font-medium">Impact Score</div>
            <div className="text-2xl font-bold">842</div>
            <div className="mt-3 h-1.5 bg-indigo-400 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-white rounded-full"></div>
            </div>
            <div className="text-[10px] mt-2 opacity-80">Top 5% Innovators in Jharkhand</div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>What makes a good challenge?</span>
            </h4>
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              Describe concrete community problems with photos (e.g. soil salinity, handpump contamination, local craft strain). The AI engine automatically maps it to matching university research labs.
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-3 space-y-6">
          {/* STATISTICS OVERVIEW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" id="citizen-stats-grid">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Submitted</div>
              <div className="text-2xl font-bold text-slate-900">{submittedCount}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">AI Analyzed</div>
              <div className="text-2xl font-bold text-slate-900">{submittedCount - 1}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">In Innovation</div>
              <div className="text-2xl font-bold text-slate-900">{inProgressCount}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">Resolved</div>
              <div className="text-2xl font-bold text-slate-900">{resolvedCount}</div>
            </div>
          </div>

          {/* ACTIVE INNOVATION JOURNEY CARD */}
          {activeTab === 'dashboard' && (
            <div className="p-5 rounded-2xl border-2 border-indigo-100 bg-indigo-50/30 flex flex-col gap-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Active Innovation Journey</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mt-0.5">Namkum Groundwater Fluoride & Salinity Remediation</h3>
                  <p className="text-xs text-slate-500">Submitted 14 days ago • Challenge ID: CH-2026-081</p>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-slate-400">Assigned Hub</span>
                  <div className="text-sm font-bold text-slate-700">BIT Mesra (Env. Eng)</div>
                </div>
              </div>

              {/* 6 Stage Lifecycle Steps */}
              <div className="grid grid-cols-6 gap-2 pt-2 border-t border-indigo-100/60 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">✓</div>
                  <span className="text-[10px] font-bold text-slate-800 mt-1">Reported</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">✓</div>
                  <span className="text-[10px] font-bold text-slate-800 mt-1">Analyzed</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">✓</div>
                  <span className="text-[10px] font-bold text-slate-800 mt-1">Verified</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">✓</div>
                  <span className="text-[10px] font-bold text-slate-800 mt-1">Assigned</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs animate-pulse">05</div>
                  <span className="text-[10px] font-bold text-amber-700 mt-1">Prototype</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">06</div>
                  <span className="text-[10px] font-medium text-slate-400 mt-1">Impact</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-600">Active Stage: <strong>Fabrication of bio-char filtration cartridge at BIT Mesra Lab</strong></span>
                <button
                  onClick={() => navigateTo('challenge-details', { challengeId: 'CH-2026-081' })}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Track Full Flow</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges by title or district..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                id="citizen-search-input"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {['all', 'Agriculture', 'Healthcare', 'Education', 'Water Management', 'Environment'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Domains' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* CHALLENGES CARDS LIST */}
          <div className="space-y-4" id="citizen-challenges-list">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {activeTab === 'my-challenges' ? 'My Reported Challenges' : 'Recent Societal Challenges'}
              </h3>
              <span className="text-xs text-slate-500">Showing {citizenChallenges.length} challenges</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {citizenChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:border-slate-300 flex flex-col justify-between"
                  id={`challenge-card-${challenge.id}`}
                >
                  <div>
                    {/* Card Top Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {challenge.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          {challenge.category} • {challenge.subcategory}
                        </span>
                      </div>
                      {getStatusBadge(challenge.status)}
                    </div>

                    {/* Title */}
                    <h4
                      onClick={() => navigateTo('challenge-details', { challengeId: challenge.id })}
                      className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
                    >
                      {challenge.title}
                    </h4>

                    {/* Location & Meta */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {challenge.villageOrCity}, {challenge.district}
                      </span>
                      <span>Submitted: {challenge.submittedDate}</span>
                      {challenge.assignedUniversityName && (
                        <span className="text-indigo-600 font-medium">
                          Assigned: {challenge.assignedUniversityName}
                        </span>
                      )}
                    </div>

                    {/* Problem Description */}
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>

                  {/* Progress and Actions Bottom Bar */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 max-w-xs">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-500">Lifecycle Progress</span>
                        <span className="font-bold text-slate-900">{challenge.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${challenge.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigateTo('challenge-details', { challengeId: challenge.id })}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center space-x-1"
                        id={`track-progress-btn-${challenge.id}`}
                      >
                        <span>Track Lifecycle</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {challenge.associatedProjectId && (
                        <button
                          onClick={() => {
                            setRole('university');
                            navigateTo('university-project', { projectId: challenge.associatedProjectId });
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          View Prototype
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
