import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Sparkles,
  Users,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Bell,
  Compass,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRole,
    currentView,
    setRole,
    navigateTo,
    unreadNotificationsCount,
    setIsNotificationsOpen,
    isNotificationsOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; user: string; location: string; avatar: string }[] = [
    {
      role: 'citizen',
      label: 'Citizen',
      icon: <Users className="w-3.5 h-3.5" />,
      user: 'Rajesh Mahato',
      location: 'Namkum, Ranchi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    },
    {
      role: 'government',
      label: 'Admin',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      user: 'Pooja Verma, IAS',
      location: 'DC Office, Ranchi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja',
    },
    {
      role: 'university',
      label: 'University',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      user: 'Dr. Ramesh Kumar',
      location: 'BAU Ranchi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh',
    },
    {
      role: 'industry',
      label: 'Industry',
      icon: <Briefcase className="w-3.5 h-3.5" />,
      user: 'Vikram Sengupta',
      location: 'TSRDS Jamshedpur',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    setMobileMenuOpen(false);
  };

  const handleNav = (view: AppView) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  const activeRoleObj = roles.find((r) => r.role === currentRole) || roles[0];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('landing')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-indigo-900">JanSetu</span>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider">
                AI Platform
              </span>
            </div>
          </div>

          {/* Center Role Switcher (Segmented Control from Clean Minimalism theme) */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl gap-1">
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => handleRoleSelect(r.role)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  currentRole === r.role
                    ? 'bg-white shadow-sm text-indigo-600 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                id={`role-btn-${r.role}`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Navigation Links & User Info */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Quick Links */}
            <button
              onClick={() => handleNav('landing')}
              className={`hidden lg:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'landing'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Platform Tour</span>
            </button>

            <button
              onClick={() => handleNav('admin-impact')}
              className={`hidden lg:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'admin-impact'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Social Impact</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              id="header-notification-btn"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="flex flex-col items-end leading-tight">
                <span className="text-xs sm:text-sm font-semibold text-slate-900">{activeRoleObj.user}</span>
                <span className="text-[10px] text-slate-500">{activeRoleObj.location}</span>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shadow-xs">
                <img src={activeRoleObj.avatar} alt={activeRoleObj.user} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                setRole('citizen');
                navigateTo('report-challenge');
              }}
              className="bg-indigo-600 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center space-x-1.5"
              id="header-report-btn"
            >
              <span>+ Report Challenge</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-4 space-y-3" id="mobile-nav-drawer">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Demo Role</div>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl">
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => handleRoleSelect(r.role)}
                className={`p-2 rounded-lg text-xs font-semibold text-center transition-all ${
                  currentRole === r.role
                    ? 'bg-white text-indigo-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <button
              onClick={() => handleNav('landing')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Platform Tour
            </button>
            <button
              onClick={() => handleNav('admin-impact')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Social Impact Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
