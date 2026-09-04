import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Challenge, Project } from '../../types';
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileCode,
  Briefcase,
  Share2,
} from 'lucide-react';

export const UniversityPortal: React.FC = () => {
  const {
    challenges,
    projects,
    universities,
    navigateTo,
    createProject,
    currentUniversityId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'assigned' | 'projects' | 'students'>('dashboard');

  // Currently viewing university (Default: Birsa Agricultural University or BIT Mesra)
  const activeUniv = universities.find((u) => u.id === currentUniversityId) || universities[0] || {
    id: 'univ-1',
    name: 'Birsa Agricultural University (BAU)',
    district: 'Ranchi',
    specializations: ['Precision Agriculture', 'Water Management'],
    studentCount: 3400,
    facultyCount: 142,
    rating: 4.8,
  };

  // University metrics
  const assignedCount = 7;
  const acceptedCount = 5;
  const activeProjectsCount = 4;
  const studentsInvolved = 28;
  const facultyMentorsCount = 6;
  const solutionsDeployed = 2;

  // Challenges assigned to or suitable for this university
  const assignedChallenges = challenges.filter(
    (c) => c.assignedUniversityId === activeUniv?.id || c.status === 'govt_verified' || c.status === 'university_assigned'
  );

  // Active university projects
  const universityProjects = projects.filter(
    (p) => p.universityId === activeUniv?.id || p.universityName?.toLowerCase().includes((activeUniv?.name || '').split(' ')[0].toLowerCase())
  );

  const handleAcceptAndCreate = (challenge: Challenge) => {
    // If project doesn't exist yet, create one
    if (!challenge.associatedProjectId) {
      const faculty = {
        id: 'FAC-01',
        name: 'Dr. Alok Ranjan',
        role: 'Faculty Mentor',
        department: 'Agricultural Engineering & Telemetry',
        email: 'a.ranjan@bau.edu.in',
        specialization: 'Telemetry & IoT Sensors',
      };
      const newProjId = createProject({
        challengeId: challenge.id,
        name: `R&D: ${(challenge.title || 'Civic Challenge').slice(0, 50)}...`,
        description: `Academic research, hardware prototyping, and field deployment tackling: ${challenge.description}`,
        domain: challenge.category,
        district: challenge.district,
        targetLocation: challenge.villageOrCity,
        facultyLead: faculty,
        facultyMentor: faculty,
        students: [
          { id: 'STU-1', name: 'Kavita Kumari', role: 'Hardware & Sensor Design', branch: 'IoT & Mechatronics', year: 'Final Year B.Tech', department: 'Mechatronics', specialization: 'Hardware' },
          { id: 'STU-2', name: 'Sameer Soren', role: 'Firmware & LoRaWAN', branch: 'Computer Science', year: '3rd Year B.Tech', department: 'CSE', specialization: 'Firmware' },
        ],
        industryPartners: [],
        milestones: [
          { id: 'm1', title: 'Problem Formulation & Soil Core Sampling', dueDate: '2026-03-15', status: 'completed' },
          { id: 'm2', title: 'Telemetry Node Breadboard Prototype', dueDate: '2026-04-10', status: 'in_progress' },
          { id: 'm3', title: 'Village Pilot Test & Irrigation Valve Rig', dueDate: '2026-05-20', status: 'pending' },
        ],
        currentStage: 'Prototype',
        progressPercent: 45,
        budgetEstimated: '₹4,50,000',
        budgetSecured: '₹2,50,000',
        hardwareRequirements: ['LoRaWAN Soil Probes', 'Lithium Iron Phosphate Battery Pack', 'Solenoid Valves'],
      });
      navigateTo('university-project', { projectId: newProjId });
    } else {
      navigateTo('university-project', { projectId: challenge.associatedProjectId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8" id="university-portal-root">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Academic R&D & Societal Engineering Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {activeUniv.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1.5 leading-relaxed">
              Transforming district challenges into student capstones, funded faculty research, hardware patents, and tangible grassroots deployments across Jharkhand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              Campus: {activeUniv.district}
            </div>
          </div>
        </div>
      </div>

      {/* TOP STATISTICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" id="univ-stats-grid">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Layers className="w-4 h-4 text-purple-600" />
            <span className="text-[10px] font-bold uppercase">Assigned</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{assignedCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Assigned Challenges</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase text-emerald-600">Accepted</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">{acceptedCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Accepted for R&D</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase text-blue-600">Active</span>
          </div>
          <div className="text-2xl font-black text-blue-700">{activeProjectsCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Active Projects</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Users className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase text-indigo-600">Students</span>
          </div>
          <div className="text-2xl font-black text-indigo-700">{studentsInvolved}</div>
          <div className="text-xs text-slate-500 mt-0.5">Student Innovators</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase text-amber-600">Faculty</span>
          </div>
          <div className="text-2xl font-black text-amber-700">{facultyMentorsCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Faculty Mentors</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase text-emerald-600">Deployed</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">{solutionsDeployed}</div>
          <div className="text-xs text-slate-500 mt-0.5">Solutions in Field</div>
        </div>
      </div>

      {/* SECTION 1: ASSIGNED CIVIC CHALLENGES WAITING FOR ACCEPTANCE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6" id="assigned-challenges-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Challenges Matched to Your Institution</h2>
            <p className="text-xs text-slate-500">
              Government-verified regional problems aligned with your university's laboratories and faculty research fields.
            </p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl">
            {assignedChallenges.length} Open Opportunities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(assignedChallenges || []).slice(0, 4).map((ch) => (
            <div
              key={ch.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              id={`univ-challenge-card-${ch.id}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {ch.id}
                  </span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Severity: {ch.aiAnalysis?.severityScore ?? 7}/10
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{ch.title}</h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ch.villageOrCity}, {ch.district}</span>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {ch.description}
                </p>

                {/* AI Required Tech Stack Tags */}
                <div className="mt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    AI Recommended Stack:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(ch.aiAnalysis?.requiredExpertise || ['Embedded Systems', 'Field Testing']).slice(0, 3).map((exp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                <button
                  onClick={() => navigateTo('challenge-details', { challengeId: ch.id })}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleAcceptAndCreate(ch)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs"
                  id={`accept-challenge-btn-${ch.id}`}
                >
                  <span>{ch.associatedProjectId ? 'Open Project' : 'Accept & Create R&D Project'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: ACTIVE UNIVERSITY R&D PROJECTS */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6" id="university-active-projects-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active R&D Engineering Projects</h2>
            <p className="text-xs text-slate-500">
              Student capstone teams and faculty investigators currently building prototypes.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
            {projects.length} Total Platform Projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              id={`project-card-${proj.id}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700">
                    {proj.domain}
                  </span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {proj.currentStage}
                  </span>
                </div>

                <h3
                  onClick={() => navigateTo('university-project', { projectId: proj.id })}
                  className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors line-clamp-2"
                >
                  {proj.name}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Lead: {(proj.facultyLead || proj.facultyMentor)?.name || 'Faculty Lead'}
                </p>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Team Avatars & Info */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.students.length} Student Engineers</span>
                  </div>
                  <span className="font-semibold text-slate-700">{proj.district}</span>
                </div>
              </div>

              {/* Progress Bar & Open Dashboard */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-500">Project Progress</span>
                  <span className="font-bold text-slate-900">{proj.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-3">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${proj.progressPercent}%` }}
                  />
                </div>

                <button
                  onClick={() => navigateTo('university-project', { projectId: proj.id })}
                  className="w-full py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center space-x-1 border border-slate-200"
                  id={`open-project-btn-${proj.id}`}
                >
                  <span>Open Project Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
