import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectStage } from '../../types';
import {
  ArrowLeft,
  Users,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Cpu,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  ExternalLink,
  DollarSign,
  FileText,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const UniversityProjectDashboard: React.FC = () => {
  const {
    getSelectedProject,
    updateMilestoneStatus,
    addMilestone,
    navigateTo,
    setRole,
  } = useApp();

  const project = getSelectedProject();

  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-sm text-slate-500">Project not found.</p>
        <button
          onClick={() => navigateTo('university')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Back to University Portal
        </button>
      </div>
    );
  }

  const stages: ProjectStage[] = [
    'Research',
    'Solution Design',
    'Prototype',
    'Testing',
    'Pilot',
    'Deployed',
  ];

  const currentStageIndex = stages.indexOf(project.currentStage);

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    addMilestone(project.id, {
      title: newMilestoneTitle,
      dueDate: newMilestoneDate || '2026-06-30',
      status: 'pending',
    });
    setNewMilestoneTitle('');
    setNewMilestoneDate('');
    setIsAddingMilestone(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="university-project-detail-view">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={() => navigateTo('university')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to University Portal</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setRole('industry');
              navigateTo('industry');
            }}
            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs"
            id="seek-industry-support-btn"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Seek Industry Support</span>
          </button>

          <button
            onClick={() => {
              setRole('citizen');
              navigateTo('challenge-details', { challengeId: project.challengeId });
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1"
          >
            <span>Original Challenge</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Hero Project Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {project.id}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
              {project.domain}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700">
              {project.universityName}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Progress: {project.progressPercent}%</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Stage: {project.currentStage}
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {project.name}
        </h1>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-4xl">{project.description}</p>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <MapPin className="w-4 h-4 text-rose-500" />
            Field Target: {project.targetLocation || 'Local Cluster'}, {project.district || 'Jharkhand'}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Users className="w-4 h-4 text-indigo-500" />
            {project.students.length} Student Engineers
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <GraduationCap className="w-4 h-4 text-purple-500" />
            Lead: {(project.facultyLead || project.facultyMentor)?.name || 'Faculty Mentor'} ({(project.facultyLead || project.facultyMentor)?.department || 'Innovation Lab'})
          </span>
        </div>
      </div>

      {/* R&D STAGES PROGRESSION TRACKER */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Engineering R&D Pipeline</h2>
            <p className="text-xs text-slate-500">From academic lab formulation to public civic deployment</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg">
            Stage {currentStageIndex + 1} of 6
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {stages.map((stg, idx) => {
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isUpcoming = idx > currentStageIndex;

            return (
              <div
                key={stg}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                    : isDone
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-slate-400 mb-1">0{idx + 1}</div>
                <div className={`text-xs font-bold ${isCurrent ? 'text-indigo-900' : 'text-slate-800'}`}>
                  {stg}
                </div>
                <div className="mt-2">
                  {isDone ? (
                    <span className="text-[10px] font-bold text-emerald-700">✓ Completed</span>
                  ) : isCurrent ? (
                    <span className="text-[10px] font-bold text-indigo-700">● Active</span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Upcoming</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO COLUMN WORKSPACE: Milestones & Team/Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Milestones & Deliverables */}
        <div className="lg:col-span-2 space-y-6">
          {/* MILESTONE TRACKER */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5" id="milestones-section">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Project Milestones & Deliverables</h3>
                <p className="text-xs text-slate-500">Track progress by toggling completed milestones</p>
              </div>
              <button
                onClick={() => setIsAddingMilestone(!isAddingMilestone)}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center space-x-1"
                id="add-milestone-toggle-btn"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Milestone</span>
              </button>
            </div>

            {/* Add Milestone Form */}
            {isAddingMilestone && (
              <form
                onSubmit={handleAddMilestoneSubmit}
                className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3"
              >
                <h4 className="text-xs font-bold text-indigo-900">New Milestone</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    placeholder="Milestone title (e.g. PCB fabrication)"
                    className="sm:col-span-2 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  />
                  <input
                    type="date"
                    value={newMilestoneDate}
                    onChange={(e) => setNewMilestoneDate(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingMilestone(false)}
                    className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                  >
                    Save Milestone
                  </button>
                </div>
              </form>
            )}

            {/* Milestones List */}
            <div className="space-y-3">
              {project.milestones.map((ms) => (
                <div
                  key={ms.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    ms.status === 'completed'
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : ms.status === 'in_progress'
                      ? 'bg-indigo-50/40 border-indigo-200'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                  id={`milestone-${ms.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        const nextStatus =
                          ms.status === 'completed'
                            ? 'pending'
                            : ms.status === 'in_progress'
                            ? 'completed'
                            : 'in_progress';
                        updateMilestoneStatus(project.id, ms.id, nextStatus);
                      }}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                        ms.status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : ms.status === 'in_progress'
                          ? 'border-2 border-indigo-600 text-indigo-600'
                          : 'border-2 border-slate-300 hover:border-slate-400'
                      }`}
                      title="Click to advance status"
                    >
                      {ms.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                      {ms.status === 'in_progress' && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                    </button>

                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          ms.status === 'completed' ? 'text-emerald-900 line-through' : 'text-slate-900'
                        }`}
                      >
                        {ms.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Due: {ms.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      ms.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ms.status === 'in_progress'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {ms.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* HARDWARE & MATERIAL REQUIREMENTS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>Hardware & Sensor Stack Requirements</span>
            </h3>
            <p className="text-xs text-slate-500">
              Bill of Materials currently requested from Corporate CSR & Startup hardware sponsors.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(project.hardwareRequirements || ['Microcontroller Board', 'Telemetry Sensors', 'Field Power Module']).map((req, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                >
                  <span className="text-xs font-semibold text-slate-800">{req}</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Sponsor Needed
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* INDUSTRY PARTNERS ON THIS PROJECT */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>Industry & CSR Collaborators</span>
              </h3>
              <span className="text-xs text-slate-500">{project.industryPartners.length} Active Partner(s)</span>
            </div>

            {project.industryPartners.length === 0 ? (
              <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 text-center">
                <p className="text-xs text-amber-800 font-medium">
                  No industry partners attached yet. This project is open for Corporate CSR grant support and hardware sponsorship.
                </p>
                <button
                  onClick={() => {
                    setRole('industry');
                    navigateTo('industry');
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
                >
                  Switch to Industry Role & Submit Offer
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {project.industryPartners.map((ip) => (
                  <div
                    key={ip.partnerId}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{ip.partnerName}</h4>
                      <p className="text-[11px] text-slate-500">
                        {ip.supportType} • Committed: {ip.commitmentValue}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                      {ip.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Team, Mentors & Budget */}
        <div className="space-y-6">
          {/* BUDGET & SECURED CSR GRANTS */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-md space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Project R&D Funding</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Estimated Budget</span>
                <span className="text-lg font-black text-white">{project.budgetEstimated}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                <span className="text-[10px] text-emerald-300 uppercase tracking-wider block">Secured Grants</span>
                <span className="text-lg font-black text-emerald-400">{project.budgetSecured}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-300 pt-2 border-t border-indigo-800">
              Funding sources include Jharkhand Innovation Seed Fund, Tata Steel CSR, and Birsa Agricultural R&D Capstone Pool.
            </div>
          </div>

          {/* FACULTY LEAD */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faculty Principal Investigator</h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">
                  {(project.facultyLead || project.facultyMentor)?.name || 'Faculty Lead'}
                </h5>
                <p className="text-xs text-slate-500">
                  {(project.facultyLead || project.facultyMentor)?.department || 'Faculty Department'}
                </p>
                <p className="text-[11px] text-indigo-600 mt-0.5">
                  {(project.facultyLead || project.facultyMentor)?.email || 'mentor@university.edu.in'}
                </p>
              </div>
            </div>
          </div>

          {/* STUDENT TEAM MEMBERS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Student Engineering Team ({project.students.length})
              </h4>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Capstones
              </span>
            </div>

            <div className="space-y-3">
              {project.students.map((student, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start space-x-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {student.name ? student.name.charAt(0) : 'S'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{student.name || 'Student Engineer'}</div>
                    <div className="text-[11px] text-indigo-700 font-medium">{student.role || 'Researcher'}</div>
                    <div className="text-[10px] text-slate-400">
                      {student.branch || student.department || 'Engineering'} • {student.year || 'Student Member'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
