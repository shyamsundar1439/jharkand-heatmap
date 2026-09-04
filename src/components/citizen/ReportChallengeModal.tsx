import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Challenge, SocietalDomain, PriorityLevel } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  MapPin,
  Brain,
  Layers,
  FileText,
  AlertTriangle,
  Cpu,
  RefreshCw,
  Image as ImageIcon,
  Check,
  ShieldAlert,
} from 'lucide-react';

export const ReportChallengeModal: React.FC = () => {
  const { addChallenge, navigateTo, setRole } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiProcessingStage, setAiProcessingStage] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedChallengeData, setSubmittedChallengeData] = useState<Challenge | null>(null);

  // Form State
  const [title, setTitle] = useState('Groundwater depletion and drying borewells during paddy season');
  const [description, setDescription] = useState(
    'Over 250 smallholder farmers in our panchayat face severe water shortage by February. Borewells are failing due to unmeasured over-pumping, leaving our rabi vegetables completely destroyed.'
  );
  const [category, setCategory] = useState<SocietalDomain>('Agriculture');
  const [subcategory, setSubcategory] = useState('Water Management & Irrigation');
  const [district, setDistrict] = useState('Ranchi');
  const [villageOrCity, setVillageOrCity] = useState('Namkum Block (Lalgutwa Village)');
  const [specificLocation, setSpecificLocation] = useState('Near Ring Road Sector 4, Subarnarekha tributary');
  const [evidenceItems, setEvidenceItems] = useState<{ name: string; size: string; type: string }[]>([
    { name: 'Cracked_Paddy_Field_Soil.jpg', size: '2.4 MB', type: 'image' },
    { name: 'Panchayat_Borewell_Log_2026.pdf', size: '680 KB', type: 'doc' },
  ]);

  const districtsList = [
    'Ranchi',
    'Dhanbad',
    'Bokaro',
    'East Singhbhum',
    'West Singhbhum',
    'Hazaribagh',
    'Palamu',
    'Dumka',
    'Deoghar',
    'Giridih',
    'Gumla',
    'Simdega',
    'Ramgarh',
    'Sahibganj',
    'Latehar',
    'Khunti',
  ];

  const domainsList: SocietalDomain[] = [
    'Agriculture',
    'Water Management',
    'Healthcare',
    'Education',
    'Environment',
    'Rural Livelihoods',
    'Accessibility',
    'Energy',
    'Urban Development',
  ];

  const handleFileUploadMock = () => {
    setEvidenceItems((prev) => [
      ...prev,
      { name: `Field_Evidence_Photo_${prev.length + 1}.jpg`, size: '1.8 MB', type: 'image' },
    ]);
  };

  const handleSubmit = () => {
    setIsAiProcessing(true);
    setAiProcessingStage(0);

    // Simulated multi-stage AI reasoning pipeline
    const stages = [
      'Extracting semantic problem context & technical entities...',
      'Computing regional severity score & multi-domain mapping...',
      'Matching required STEM engineering expertise...',
      'Executing vector similarity scan across regional database...',
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < stages.length) {
        setAiProcessingStage(current);
      } else {
        clearInterval(interval);
        // Complete AI analysis
        const newChallenge: Challenge = {
          id: `CH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
          title,
          description,
          category,
          subcategory,
          district,
          villageOrCity,
          specificLocation,
          submittedBy: {
            name: 'Rameshwar Mahato',
            phoneMasked: '+91 94311 •••••',
            userType: 'Local Farmer',
          },
          submittedDate: new Date().toISOString().split('T')[0],
          status: 'ai_analyzed',
          progressPercent: 20,
          evidence: evidenceItems.map((e) => ({
            type: e.type as 'image' | 'doc',
            title: e.name,
            url: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=800&auto=format&fit=crop&q=80',
            size: e.size,
          })),
          aiAnalysis: {
            primaryDomain: category,
            secondaryDomain: 'Water Management',
            priority: 'High',
            severityScore: 8.7,
            requiredExpertise: ['Precision Agriculture', 'IoT Sensors', 'Electronics', 'Groundwater Hydrology'],
            keyChallengesIdentified: [
              'Rapid water table decline below seasonal threshold',
              'Over-irrigation due to lack of real-time soil moisture telemetry',
              'Absence of sub-surface recharge shafts on village nullahs',
            ],
            recommendedTechnologies: ['LoRaWAN Soil Moisture Nodes', 'Solar Automated Drip Valves', 'Sub-surface aquifer recharge shafts'],
            estimatedTimeframe: '4 - 6 Months',
            similarChallengesFound: [
              {
                id: 'CH-2026-034',
                title: 'Groundwater drop in Ormanjhi multi-crop belt',
                similarityPercent: 88,
                district: 'Ranchi',
              },
              {
                id: 'CH-2026-061',
                title: 'Solar pump drying out in Torpa tribal cluster',
                similarityPercent: 79,
                district: 'Khunti',
              },
            ],
          },
        };

        addChallenge(newChallenge);
        setSubmittedChallengeData(newChallenge);
        setIsAiProcessing(false);
        setIsSubmitted(true);
      }
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="report-challenge-page">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigateTo('citizen')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center space-x-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Citizen Portal</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Report a Societal Challenge</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Submit a real civic pain point. JanSetu AI will extract requirements and connect matching research universities.
          </p>
        </div>
      </div>

      {/* Stepper Progress Bar (Only before submitted) */}
      {!isSubmitted && !isAiProcessing && (
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Problem Details' },
              { num: 2, label: 'Location' },
              { num: 3, label: 'Evidence' },
              { num: 4, label: 'Review & AI Submit' },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center flex-1 relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step === s.num
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-sm'
                      : step > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-1.5 hidden sm:block ${
                    step === s.num ? 'text-indigo-600' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: PROBLEM DETAILS */}
      {!isSubmitted && !isAiProcessing && step === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 1: Describe the Problem</h2>
            <p className="text-xs text-slate-500">Provide clear details on what community obstacle needs solving.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Challenge Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Water shortage affecting farmers in Namkum dry belt"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-medium text-slate-900"
              id="challenge-title-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SocietalDomain)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-white font-medium text-slate-800"
                id="challenge-category-select"
              >
                {domainsList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Subcategory / Focus *
              </label>
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="e.g. Micro-irrigation, Sensor Telemetry"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-800"
                id="challenge-subcategory-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Detailed Description & Ground Impact *
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the background, how many citizens or farmers are affected, seasonal patterns, and previous attempts to fix it..."
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-slate-800 leading-relaxed"
              id="challenge-desc-input"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              Tip: Include specific metrics (e.g. number of affected households, water loss, crop acres impacted) so AI can estimate project severity accurately.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center space-x-2"
              id="step-1-next-btn"
            >
              <span>Next: Location Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: LOCATION */}
      {!isSubmitted && !isAiProcessing && step === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 2: Geographic Location</h2>
            <p className="text-xs text-slate-500">Pinpoint where the problem is occurring in Jharkhand.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                District (Jharkhand) *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-white font-medium text-slate-800"
                id="challenge-district-select"
              >
                {districtsList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Village / Block / Town Ward *
              </label>
              <input
                type="text"
                value={villageOrCity}
                onChange={(e) => setVillageOrCity(e.target.value)}
                placeholder="e.g. Namkum Block (Lalgutwa Village)"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-800"
                id="challenge-village-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Specific Landmark or GPS Point
            </label>
            <input
              type="text"
              value={specificLocation}
              onChange={(e) => setSpecificLocation(e.target.value)}
              placeholder="e.g. Near Ring Road Sector 4, Subarnarekha tributary bridge"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-800"
              id="challenge-landmark-input"
            />
          </div>

          {/* Interactive Map Visualizer Placeholder */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Geotagged Map Pin (Auto-coordinates: 23.3441° N, 85.3096° E)</span>
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Verified District Node
              </span>
            </div>

            <div className="h-44 bg-gradient-to-br from-indigo-50/50 via-slate-100 to-blue-50/60 rounded-xl border border-dashed border-slate-300 flex items-center justify-center relative">
              <div className="text-center p-4">
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">{villageOrCity}</div>
                <div className="text-[11px] text-slate-500">{district}, Jharkhand</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center space-x-2"
              id="step-2-next-btn"
            >
              <span>Next: Upload Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: EVIDENCE */}
      {!isSubmitted && !isAiProcessing && step === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 3: Upload Evidence & Documents</h2>
            <p className="text-xs text-slate-500">
              Photos, test reports, or videos help AI and university labs understand field ground-truth.
            </p>
          </div>

          {/* Drag & drop upload area */}
          <div
            onClick={handleFileUploadMock}
            className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/20 hover:bg-indigo-50/40 rounded-2xl p-8 text-center cursor-pointer transition-all"
            id="evidence-drop-zone"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Drag & drop evidence photos, videos, or PDFs</h4>
            <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, MP4, PDF up to 25MB</p>
            <button
              type="button"
              className="mt-4 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-indigo-600 shadow-xs hover:bg-slate-50"
            >
              + Browse / Attach Sample Evidence
            </button>
          </div>

          {/* Uploaded attachments list */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Attached Evidence ({evidenceItems.length})
            </h4>
            <div className="space-y-2">
              {evidenceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-slate-50/50"
                >
                  <div className="flex items-center space-x-2.5">
                    {item.type === 'image' ? (
                      <ImageIcon className="w-4 h-4 text-blue-500" />
                    ) : (
                      <FileText className="w-4 h-4 text-emerald-500" />
                    )}
                    <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                    <span className="text-[11px] text-slate-400">({item.size})</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Ready for AI Analysis
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center space-x-2"
              id="step-3-next-btn"
            >
              <span>Next: Review & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & SUBMIT */}
      {!isSubmitted && !isAiProcessing && step === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 4: Review Your Challenge</h2>
            <p className="text-xs text-slate-500">
              Confirm the information before submitting to the JanSetu Multimodal AI engine.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Title</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{title}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Category</span>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {category} • {subcategory}
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Location</span>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {villageOrCity}, {district}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description</span>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">{description}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Evidence Files Attached ({evidenceItems.length})
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {evidenceItems.map((e, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-medium text-slate-700"
                  >
                    {e.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
              id="submit-challenge-btn"
            >
              <Brain className="w-4 h-4" />
              <span>Submit & Run JanSetu AI Analysis</span>
            </button>
          </div>
        </div>
      )}

      {/* AI PROCESSING STATE (NEURAL SCANNER) */}
      {isAiProcessing && (
        <div
          className="bg-white rounded-3xl border border-indigo-200 p-8 sm:p-12 text-center shadow-lg animate-in fade-in duration-300"
          id="ai-processing-state"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Brain className="w-10 h-10 animate-pulse" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900">Analyzing your challenge...</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            JanSetu Multimodal Neural Core is categorizing societal domains, calculating regional severity, and matching academic research laboratories.
          </p>

          <div className="mt-8 max-w-md mx-auto bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
            {[
              'Extracting semantic problem context & technical entities...',
              'Computing regional severity score & multi-domain mapping...',
              'Matching required STEM engineering expertise...',
              'Executing vector similarity scan across regional database...',
            ].map((st, i) => (
              <div key={i} className="flex items-center space-x-3 text-xs text-left">
                {aiProcessingStage > i ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : aiProcessingStage === i ? (
                  <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span
                  className={
                    aiProcessingStage === i
                      ? 'font-bold text-indigo-700'
                      : aiProcessingStage > i
                      ? 'text-slate-700 line-through'
                      : 'text-slate-400'
                  }
                >
                  {st}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP COMPLETED: AI CHALLENGE ANALYSIS RESULT */}
      {isSubmitted && submittedChallengeData && (
        <div
          className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300"
          id="ai-analysis-completed-view"
        >
          <div className="flex items-center space-x-3 text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-emerald-900">Challenge submitted successfully.</h3>
              <p className="text-xs text-emerald-700">
                Assigned ID: <span className="font-mono font-bold">{submittedChallengeData.id}</span>. AI analysis complete and ready for District Government validation.
              </p>
            </div>
          </div>

          <div className="border border-indigo-100 rounded-3xl p-6 bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/30">
            <div className="flex items-center justify-between pb-4 border-b border-indigo-100 mb-6">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">AI Challenge Analysis</h4>
                  <p className="text-[11px] text-slate-500">JanSetu Neural Intelligence Evaluation</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
                Score: 8.7 / 10
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Domain</span>
                <div className="text-sm font-bold text-indigo-700 mt-1">
                  {submittedChallengeData.aiAnalysis.primaryDomain}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Secondary Domain</span>
                <div className="text-sm font-bold text-blue-700 mt-1">
                  {submittedChallengeData.aiAnalysis.secondaryDomain}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority Level</span>
                <div className="text-sm font-bold text-rose-600 mt-1">
                  {submittedChallengeData.aiAnalysis.priority}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Severity Rating</span>
                <div className="text-sm font-bold text-amber-600 mt-1">
                  {submittedChallengeData.aiAnalysis.severityScore} / 10
                </div>
              </div>
            </div>

            {/* Required Expertise */}
            <div className="mb-6">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Required Technical Expertise for University Team:
              </h5>
              <div className="flex flex-wrap gap-2">
                {submittedChallengeData.aiAnalysis.requiredExpertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-bold bg-white text-indigo-900 border border-indigo-200 shadow-2xs"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Challenges Identified */}
            <div className="mb-6">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Identified Core Engineering Obstacles:
              </h5>
              <div className="space-y-1.5">
                {submittedChallengeData.aiAnalysis.keyChallengesIdentified.map((ch, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <span>{ch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Potentially Similar Challenges Found */}
            {submittedChallengeData.aiAnalysis.similarChallengesFound &&
              submittedChallengeData.aiAnalysis.similarChallengesFound.length > 0 && (
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80">
                  <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Potentially similar challenges found in Jharkhand database</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {submittedChallengeData.aiAnalysis.similarChallengesFound.map((sim) => (
                      <div
                        key={sim.id}
                        className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-800">{sim.title}</div>
                          <div className="text-[11px] text-slate-500">
                            {sim.district} • ID: {sim.id}
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          {sim.similarityPercent}% match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                setTitle('');
                setDescription('');
              }}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              + Submit another challenge
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setRole('government');
                  navigateTo('government');
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                Switch to Admin to Verify
              </button>

              <button
                onClick={() => navigateTo('challenge-details', { challengeId: submittedChallengeData.id })}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center space-x-1.5"
                id="view-submitted-challenge-btn"
              >
                <span>Track Challenge Lifecycle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
