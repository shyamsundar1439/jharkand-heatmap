import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setRole, navigateTo } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-20" id="jansetu-footer">
      {/* Banner reinforcement */}
      <div className="bg-gradient-to-r from-indigo-900/50 via-slate-900 to-blue-950/50 border-b border-indigo-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The JanSetu Philosophy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              "Real societal problems should become opportunities for research, innovation and real-world solutions."
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Bridging citizens, premier universities, student engineers, corporate CSR, and government administration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setRole('citizen');
                navigateTo('report-challenge');
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center space-x-2"
              id="footer-report-btn"
            >
              <span>Submit a Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('admin-impact')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700"
              id="footer-impact-btn"
            >
              Explore Impact
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">JanSetu</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-driven Societal Innovation Collaboration Platform. Connecting grassroots voices with academic research and industrial execution.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>State Pilot Active • Jharkhand</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-3">Ecosystem Roles</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setRole('citizen')} className="hover:text-white transition-colors">
                  Citizen Portal (Submit & Track)
                </button>
              </li>
              <li>
                <button onClick={() => setRole('university')} className="hover:text-white transition-colors">
                  University R&D Portal (Faculty & Students)
                </button>
              </li>
              <li>
                <button onClick={() => setRole('industry')} className="hover:text-white transition-colors">
                  Industry & Startups (CSR & Hardware)
                </button>
              </li>
              <li>
                <button onClick={() => setRole('government')} className="hover:text-white transition-colors">
                  Government Administration & Impact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-3">Innovation Domains</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Agriculture & Micro-Irrigation</li>
              <li>Clean Water & Groundwater Toxicity</li>
              <li>Rural Healthcare & Cold Chain Logistics</li>
              <li>Vernacular Offline STEM Education</li>
              <li>Clean Energy Microgrids & Bio-Acoustics</li>
              <li>Accessible Universal Infrastructure</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-3">Partner Institutions</h4>
            <p className="text-xs text-slate-400 mb-2">
              Birsa Agricultural University • BIT Mesra • NIT Jamshedpur • IIT (ISM) Dhanbad • Tata Steel CSR • CMPDI Coal India
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-800">
              Demonstration prototype built for Hackathon Showcase. Not an Aadhaar or certificate ticketing portal.
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} JanSetu Societal Innovation Platform. Open Architecture.</p>
          <div className="flex items-center space-x-1">
            <span>Engineered for impactful societal change</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
