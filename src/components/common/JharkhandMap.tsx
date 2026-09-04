import React, { useState } from 'react';
import { JHARKHAND_DISTRICTS } from '../../data/mockData';
import { MapPin, Layers, Award } from 'lucide-react';

interface JharkhandMapProps {
  selectedDistrict: string | null;
  onSelectDistrict: (district: string | null) => void;
}

export const JharkhandMap: React.FC<JharkhandMapProps> = ({ selectedDistrict, onSelectDistrict }) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const activeDistrictData = JHARKHAND_DISTRICTS.find(
    (d) => d.name === (hoveredDistrict || selectedDistrict)
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs" id="jharkhand-map-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-semibold text-slate-900">Jharkhand State Innovation Heatmap</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Real-time citizen challenges & academic project deployment across 24 districts</p>
        </div>
        {selectedDistrict && (
          <button
            onClick={() => onSelectDistrict(null)}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg transition-colors self-start sm:self-auto"
            id="clear-district-filter"
          >
            Clear Filter: {selectedDistrict} ✕
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* SVG Map */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-xl p-4 border border-slate-100 flex items-center justify-center min-h-[300px] overflow-hidden">
          <svg viewBox="0 0 520 400" className="w-full max-w-lg h-auto drop-shadow-sm select-none">
            <defs>
              <linearGradient id="districtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stylized State Boundary Contour */}
            <path
              d="M 90,130 Q 130,90 200,95 Q 280,80 370,85 Q 460,70 480,105 Q 470,160 430,190 Q 420,270 380,340 Q 320,380 250,370 Q 180,360 140,320 Q 90,270 80,200 Z"
              fill="url(#districtGradient)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-70"
            />

            {/* District Hub Circles and Nodes */}
            {JHARKHAND_DISTRICTS.map((dist) => {
              const isSelected = selectedDistrict === dist.name;
              const isHovered = hoveredDistrict === dist.name;
              const radius = Math.max(12, Math.min(26, Math.sqrt(dist.challenges) * 1.2));

              return (
                <g
                  key={dist.name}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => onSelectDistrict(isSelected ? null : dist.name)}
                  onMouseEnter={() => setHoveredDistrict(dist.name)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  {/* Outer pulse ring for high activity */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={dist.coords.x}
                      cy={dist.coords.y}
                      r={radius + 8}
                      fill="none"
                      stroke={isSelected ? '#4f46e5' : '#3b82f6'}
                      strokeWidth="2"
                      className="animate-ping opacity-30"
                    />
                  )}

                  {/* Base Circle */}
                  <circle
                    cx={dist.coords.x}
                    cy={dist.coords.y}
                    r={radius}
                    fill={isSelected ? '#4f46e5' : isHovered ? '#6366f1' : '#3b82f6'}
                    fillOpacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.65}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? '3' : '2'}
                  />

                  {/* Challenge count text inside node */}
                  <text
                    x={dist.coords.x}
                    y={dist.coords.y + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={radius > 16 ? '11' : '9'}
                    fontWeight="700"
                    className="pointer-events-none"
                  >
                    {dist.challenges}
                  </text>

                  {/* District Name Label */}
                  <text
                    x={dist.coords.x}
                    y={dist.coords.y + radius + 12}
                    textAnchor="middle"
                    fill={isSelected ? '#312e81' : '#334155'}
                    fontSize="10"
                    fontWeight={isSelected ? '700' : '500'}
                    className="pointer-events-none"
                  >
                    {dist.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick instructions floating badge */}
          <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] text-slate-500 border border-slate-200">
            Click any district node to filter challenges
          </div>
        </div>

        {/* Selected District Stats Card */}
        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">District Snapshot</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {activeDistrictData ? activeDistrictData.name : 'State Overview (Jharkhand)'}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {activeDistrictData
                ? `Active innovation pipeline in ${activeDistrictData.name}`
                : 'Select or hover on a district node to view real-time data.'}
            </p>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-100">
                <span className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  Total Citizen Challenges
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {activeDistrictData ? activeDistrictData.challenges : '1,248'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-100">
                <span className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-500" />
                  Active University Projects
                </span>
                <span className="text-sm font-bold text-indigo-600">
                  {activeDistrictData ? activeDistrictData.activeProjects : '126'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-100">
                <span className="text-xs text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Implemented Solutions
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  {activeDistrictData ? activeDistrictData.completed : '38'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/80">
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Top Domains:</span>
              <span className="font-medium text-slate-700">Agriculture • Water • Health</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
