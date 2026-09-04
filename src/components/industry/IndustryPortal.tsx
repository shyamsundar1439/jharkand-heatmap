import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, IndustryPartner } from '../../types';
import {
  Briefcase,
  DollarSign,
  Cpu,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Filter,
  Search,
  Building,
  Rocket,
  ShieldCheck,
  Plus,
  X,
} from 'lucide-react';

export const IndustryPortal: React.FC = () => {
  const {
    projects,
    industryPartners,
    addIndustryCollaboration,
    navigateTo,
    setRole,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  // Modal for offering support
  const [collaborationProject, setCollaborationProject] = useState<Project | null>(null);
  const [supportType, setSupportType] = useState<'Funding Grant' | 'Hardware Donation' | 'Technical Mentorship' | 'Testing Facilities'>('Funding Grant');
  const [commitmentValue, setCommitmentValue] = useState('₹2,50,000');
  const [partnerName, setPartnerName] = useState('Tata Steel Rural Development Society (TSRDS)');
  const [proposalNotes, setProposalNotes] = useState('Happy to sponsor initial 10 LoRa sensor node gateways under our CSR watershed initiative.');
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  // Industry stats
  const projectsSupported = 8;
  const fundingCommitted = '₹24,50,000';
  const activeStartups = 14;
  const hardwareProvided = '42 units';
  const fieldPilots = 5;

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || p.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const handleOpenOfferModal = (project: Project) => {
    setCollaborationProject(project);
    setOfferSubmitted(false);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collaborationProject) return;

    addIndustryCollaboration(collaborationProject.id, {
      partnerName,
      supportType,
      commitmentValue,
      notes: proposalNotes,
    });

    setOfferSubmitted(true);
    setTimeout(() => {
      setCollaborationProject(null);
      setOfferSubmitted(false);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8" id="industry-portal-root">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Corporate CSR & Deep-Tech Startup Accelerator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Industry & Venture Collaboration Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1.5 leading-relaxed">
              Connect corporate CSR capital, precision hardware, and industrial engineering mentorship with university innovation teams solving genuine grassroots problems in Jharkhand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('admin-impact')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-100 transition-all flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Audit Verified Impact ROI</span>
            </button>
          </div>
        </div>
      </div>

      {/* TOP STATISTICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4" id="industry-stats-grid">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Building className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase">Supported</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{projectsSupported}</div>
          <div className="text-xs text-slate-500 mt-0.5">Projects Co-Funded</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase text-emerald-600">Committed</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">{fundingCommitted}</div>
          <div className="text-xs text-slate-500 mt-0.5">CSR Grants Allocated</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Rocket className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase text-indigo-600">Startups</span>
          </div>
          <div className="text-2xl font-black text-indigo-700">{activeStartups}</div>
          <div className="text-xs text-slate-500 mt-0.5">Active Tech Startups</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase text-blue-600">Hardware</span>
          </div>
          <div className="text-2xl font-black text-blue-700">{hardwareProvided}</div>
          <div className="text-xs text-slate-500 mt-0.5">IoT Kits & Sensors</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Award className="w-4 h-4 text-rose-600" />
            <span className="text-[10px] font-bold uppercase text-rose-600">Pilots</span>
          </div>
          <div className="text-2xl font-black text-rose-700">{fieldPilots}</div>
          <div className="text-xs text-slate-500 mt-0.5">Field Pilots Scaled</div>
        </div>
      </div>

      {/* CORPORATE CSR PARTNERS CURRENTLY COMMITTED */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Featured Industry & Ecosystem Partners</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industryPartners.map((ip) => (
            <div
              key={ip.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start space-x-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                {ip.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{ip.name}</h4>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {ip.type}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Focus: {ip.focusDomain}</div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">
                  Committed: {ip.committedFunding} ({ip.projectsSupported} projects)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS SEEKING SUPPORT */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6" id="projects-seeking-support-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">University R&D Projects Seeking Support</h2>
            <p className="text-xs text-slate-500">
              High-impact student and faculty prototypes in need of funding, hardware, testing labs, or scale-up mentoring.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or universities..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-600"
              />
            </div>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
            >
              <option value="all">All Domains</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Water Management">Water Management</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
            </select>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              id={`industry-project-card-${proj.id}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800">
                    {proj.domain}
                  </span>
                  <span className="font-semibold text-slate-500">{proj.currentStage}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mt-1">{proj.name}</h3>
                <p className="text-xs text-purple-700 font-semibold mt-1">{proj.universityName}</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{proj.description}</p>

                {/* Requested Hardware Tag List */}
                <div className="mt-3.5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Seeking Hardware & Sensors:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(proj.hardwareRequirements || ['Microcontroller Unit', 'Field Sensors']).slice(0, 2).map((hw, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {hw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Budget Comparison */}
                <div className="mt-3 flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Est. Budget</span>
                    <span className="font-bold text-slate-900">
                      {proj.budgetEstimated || `₹${((proj.fundingTarget || 350000) / 100000).toFixed(1)}L`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Secured</span>
                    <span className="font-bold text-emerald-700">
                      {proj.budgetSecured || `₹${((proj.fundingRaised || 120000) / 100000).toFixed(1)}L`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setRole('university');
                    navigateTo('university-project', { projectId: proj.id });
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleOpenOfferModal(proj)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center space-x-1"
                  id={`offer-support-btn-${proj.id}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Offer Support</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFER COLLABORATION MODAL */}
      {collaborationProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  CSR & Startup Collaboration Offer
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{collaborationProject.name}</h3>
                <p className="text-xs text-slate-500">Led by {collaborationProject.universityName}</p>
              </div>
              <button
                onClick={() => setCollaborationProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {offerSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Collaboration Offer Submitted</h4>
                <p className="text-xs text-slate-500">
                  Your offer has been dispatched to {(collaborationProject.facultyLead || collaborationProject.facultyMentor)?.name || 'the University Project Lead'} and the JanSetu innovation council.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitOffer} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Organization / Startup Name *
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Support Type *
                    </label>
                    <select
                      value={supportType}
                      onChange={(e) => setSupportType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                    >
                      <option value="Funding Grant">Funding Grant</option>
                      <option value="Hardware Donation">Hardware Donation</option>
                      <option value="Technical Mentorship">Technical Mentorship</option>
                      <option value="Testing Facilities">Testing Facilities</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Commitment Value *
                    </label>
                    <input
                      type="text"
                      value={commitmentValue}
                      onChange={(e) => setCommitmentValue(e.target.value)}
                      placeholder="e.g. ₹2,50,000 or 15 LoRa Gateways"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-600 font-semibold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Proposal Notes & Equipment Specifications:
                  </label>
                  <textarea
                    rows={3}
                    value={proposalNotes}
                    onChange={(e) => setProposalNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-600 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCollaborationProject(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs"
                    id="submit-proposal-btn"
                  >
                    Send Collaboration Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
