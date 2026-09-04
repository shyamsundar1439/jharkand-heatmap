/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { CitizenPortal } from './components/citizen/CitizenPortal';
import { ReportChallengeModal } from './components/citizen/ReportChallengeModal';
import { ChallengeDetailsModal } from './components/citizen/ChallengeDetailsModal';
import { GovernmentPortal } from './components/admin/GovernmentPortal';
import { UniversityPortal } from './components/university/UniversityPortal';
import { UniversityProjectDashboard } from './components/university/UniversityProjectDashboard';
import { IndustryPortal } from './components/industry/IndustryPortal';
import { SocialImpactDashboard } from './components/impact/SocialImpactDashboard';
import { NotificationsModal } from './components/common/NotificationsModal';

const MainRouter: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'citizen':
        return <CitizenPortal />;
      case 'report-challenge':
        return <ReportChallengeModal />;
      case 'challenge-details':
        return <ChallengeDetailsModal />;
      case 'government':
        return <GovernmentPortal />;
      case 'university':
        return <UniversityPortal />;
      case 'university-project':
        return <UniversityProjectDashboard />;
      case 'industry':
        return <IndustryPortal />;
      case 'admin-impact':
        return <SocialImpactDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar />
      <NotificationsModal />
      <main className="flex-1 transition-opacity duration-200">
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
