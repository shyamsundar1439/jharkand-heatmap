import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Challenge, University } from '../../types';
import { JharkhandMap } from '../common/JharkhandMap';
import {
  ShieldCheck,
  FileCheck,
  Building2,
  Briefcase,
  TrendingUp,
  Award,
  Layers,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Brain,
  AlertTriangle,
  X,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const GovernmentPortal: React.FC = () => {
  const {
    challenges,
    projects,
    universities,
    industryPartners,
    verifyChallenge,
    rejectChallenge,
    assignUniversity,
    navigateTo,
    setRole,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'challenges' | 'universities' | 'projects' | 'industry' | 'analytics'
  >('dashboard');

  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Review Drawer State
  const [reviewChallenge, setReviewChallenge] = useState<Challenge | null>(null);
  const [selectedUnivToAssign, setSelectedUnivToAssign] = useState<string>('');
  const [reviewNotes, setReviewNotes] = useState('');

  // Top Stats
  const totalChallenges = 1248;
  const verifiedChallenges = 842;
  const activeProjectsCount = 126;
  const completedSolutions = 38;
  const universityPartnersCount = 18;
  const industryPartnersCount = 42;

  // Chart Data: Challenges by Category
  const categoryChartData = [
    { name: 'Agriculture', count: 342 },
    { name: 'Water', count: 284 },
    { name: 'Healthcare', count: 196 },
    { name: 'Education', count: 158 },
    { name: 'Environment', count: 142 },
    { name: 'Livelihoods', count: 118 },
  ];

  // Chart Data: Project Status
  const projectStatusData = [
    { name: 'Research', value: 24, color: '#3b82f6' },
    { name: 'Solution Design', value: 32, color: '#6366f1' },
    { name: 'Prototype', value: 38, color: '#8b5cf6' },
    { name: 'Testing', value: 18, color: '#f59e0b' },
    { name: 'Pilot', value: 14, color: '#10b981' },
    { name: 'Deployed', value: 38, color: '#059669' },
  ];

  // University participation
  const universityChartData = [
    { name: 'BIT Mesra', projects: 9, students: 114 },
    { name: 'Birsa Agri Univ', projects: 7, students: 86 },
    { name: 'NIT Jamshedpur', projects: 6, students: 92 },
    { name: 'IIT (ISM) Dhanbad', projects: 11, students: 140 },
    { name: 'Ranchi Univ', projects: 4, students: 48 },
    { name: 'Kolhan Univ', projects: 3, students: 38 },
  ];

  // Filtered challenges for management table
  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch =
      (c.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.district || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.submittedBy?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = !selectedDistrict || c.district === selectedDistrict;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || c.aiAnalysis.priority === priorityFilter;
    return matchesSearch && matchesDistrict && matchesStatus && matchesPriority;
  });

  const handleOpenReview = (challenge: Challenge) => {
    setReviewChallenge(challenge);
    setSelectedUnivToAssign(challenge.assignedUniversityId || universities[0].id);
    setReviewNotes(challenge.govtReviewNotes || '');
  };

  const handleVerify = () => {
    if (!reviewChallenge) return;
    verifyChallenge(reviewChallenge.id, reviewNotes);
    setReviewChallenge((prev) => (prev ? { ...prev, status: 'govt_verified', govtReviewNotes: reviewNotes } : null));
  };

  const handleAssign = () => {
    if (!reviewChallenge || !selectedUnivToAssign) return;
    assignUniversity(reviewChallenge.id, selectedUnivToAssign);
    const u = universities.find((x) => x.id === selectedUnivToAssign);
    setReviewChallenge((prev) =>
      prev ? { ...prev, status: 'university_assigned', assignedUniversityId: selectedUnivToAssign, assignedUniversityName: u?.name } : null
    );
  };

  const handleReject = () => {
    if (!reviewChallenge) return;
    rejectChallenge(reviewChallenge.id, reviewNotes || 'Does not meet technical criteria for academic innovation pipeline.');
    setReviewChallenge(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8" id="government-portal-root">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>State Government Administration & Verification Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Jharkhand Societal Innovation Council
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1.5 leading-relaxed">
              Verify grassroots civic problems, allocate premier university engineering hubs, monitor CSR co-investments, and audit public social return on investment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigateTo('admin-impact')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-100 transition-all flex items-center space-x-1.5"
              id="admin-view-impact-btn"
            >
              <Award className="w-4 h-4" />
              <span>Public Impact Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* TOP STATISTICS TILES */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="government-top-stats">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase text-slate-400">Total</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalChallenges.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-0.5">Reported Challenges</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase text-emerald-600">Verified</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">{verifiedChallenges.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-0.5">Govt Verified</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase text-blue-600">Active</span>
          </div>
          <div className="text-2xl font-black text-blue-700">{activeProjectsCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">R&D Projects</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase text-emerald-600">Deployed</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">{completedSolutions}</div>
          <div className="text-xs text-slate-500 mt-0.5">Completed Solutions</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Building2 className="w-4 h-4 text-purple-600" />
            <span className="text-[10px] font-bold uppercase text-purple-600">Academia</span>
          </div>
          <div className="text-2xl font-black text-purple-700">{universityPartnersCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">University Partners</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase text-amber-600">Industry</span>
          </div>
          <div className="text-2xl font-black text-amber-700">{industryPartnersCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Industry CSR Partners</div>
        </div>
      </div>

      {/* JHARKHAND MAP HEATMAP SECTION */}
      <JharkhandMap selectedDistrict={selectedDistrict} onSelectDistrict={setSelectedDistrict} />

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenges by Category Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Challenges by Domain</h3>
          <p className="text-xs text-slate-500 mb-4">Volume of verified civic submissions</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Stage Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Active Projects by Stage</h3>
          <p className="text-xs text-slate-500 mb-4">126 solutions across R&D lifecycle</p>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-[10px]">
            {projectStatusData.map((s) => (
              <span key={s.name} className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name} ({s.value})
              </span>
            ))}
          </div>
        </div>

        {/* University Engineering Participation */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">University Lab Engagement</h3>
          <p className="text-xs text-slate-500 mb-4">Active projects & student innovators</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={universityChartData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" width={95} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="projects" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ADMIN CHALLENGE REVIEW & MANAGEMENT TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5" id="challenge-management-table-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Challenge Management & Triage Console</h2>
            <p className="text-xs text-slate-500">
              Review AI severity scores, verify claims, and assign premier universities.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges or districts..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                id="admin-table-search"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="ai_analyzed">AI Analyzed</option>
              <option value="govt_verified">Govt Verified</option>
              <option value="university_assigned">Univ Assigned</option>
              <option value="project_created">Project Active</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" id="admin-challenges-table">
            <thead className="bg-slate-50/80 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Challenge</th>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Submitted By</th>
                <th className="py-3 px-3">AI Score</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChallenges.map((ch) => (
                <tr key={ch.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-bold text-slate-900 truncate">{ch.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{ch.id}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-medium">{ch.district}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {ch.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                        ch.aiAnalysis.priority === 'Critical'
                          ? 'bg-rose-50 text-rose-700'
                          : ch.aiAnalysis.priority === 'High'
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {ch.aiAnalysis.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                    <div>{ch.submittedBy?.name || 'Citizen'}</div>
                    <div className="text-[10px] text-slate-400">{ch.submittedBy?.userType || 'Resident'}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap font-bold text-indigo-700">
                    {ch.aiAnalysis.severityScore} / 10
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                      {ch.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleOpenReview(ch)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors"
                      id={`review-btn-${ch.id}`}
                    >
                      Review & Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED ADMIN REVIEW MODAL / DRAWER */}
      {reviewChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
            id="admin-challenge-review-modal"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {reviewChallenge.id}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {reviewChallenge.district}, Jharkhand
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{reviewChallenge.title}</h3>
              </div>
              <button
                onClick={() => setReviewChallenge(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Problem & Evidence */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Citizen Problem Description
                </span>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">{reviewChallenge.description}</p>
                <div className="text-[11px] text-slate-500 mt-2">
                  Submitted by {reviewChallenge.submittedBy?.name || 'Citizen'} ({reviewChallenge.submittedBy?.userType || 'Resident'}) on{' '}
                  {reviewChallenge.submittedDate}
                </div>
              </div>

              {/* AI Analysis Box */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-indigo-900">AI Intelligence Triage</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200">
                    Severity: {reviewChallenge.aiAnalysis.severityScore}/10 ({reviewChallenge.aiAnalysis.priority})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-slate-500 text-[11px]">Primary Domain:</span>
                    <span className="font-bold text-slate-800 ml-1.5">
                      {reviewChallenge.aiAnalysis.primaryDomain}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Estimated R&D Time:</span>
                    <span className="font-bold text-slate-800 ml-1.5">
                      {reviewChallenge.aiAnalysis.estimatedTimeframe}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[11px] block mb-1">Required Academic Expertise:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {reviewChallenge.aiAnalysis.requiredExpertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-bold bg-white text-indigo-900 px-2.5 py-0.5 rounded-md border border-indigo-200"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Similar Challenges Found in Region */}
              {reviewChallenge.aiAnalysis.similarChallengesFound && (
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs">
                  <div className="flex items-center space-x-1.5 text-amber-900 font-bold mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Regional Cluster Warning: Similar challenges detected</span>
                  </div>
                  <div className="space-y-1">
                    {reviewChallenge.aiAnalysis.similarChallengesFound.map((sim) => (
                      <div key={sim.id} className="text-[11px] text-amber-800">
                        • {sim.title} ({sim.district}) - {sim.similarityPercent}% similarity
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification Notes Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  District Officer Verification Notes:
                </label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="e.g. Field visited by Block Development Officer. Groundwater depletion verified with local wells."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* University Assignment Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Assign Recommended University R&D Hub:
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedUnivToAssign}
                    onChange={(e) => setSelectedUnivToAssign(e.target.value)}
                    className="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                  >
                    {universities.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.district}) - {(u.specializations || []).slice(0, 2).join(', ')}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAssign}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold whitespace-nowrap shadow-xs"
                    id="assign-univ-action-btn"
                  >
                    Assign University
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center space-x-1"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Challenge</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    handleVerify();
                    alert('Clarification request sent to reporting citizen via SMS.');
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
                >
                  Request Clarification
                </button>

                <button
                  onClick={handleVerify}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs"
                  id="verify-challenge-action-btn"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Challenge</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
