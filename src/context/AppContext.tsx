import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Challenge,
  Project,
  University,
  IndustryPartner,
  NotificationItem,
  MilestoneStatus,
  CollaborationOffer,
  SocialImpactMetric,
  OverallImpactMetrics,
} from '../types';
import {
  INITIAL_CHALLENGES,
  INITIAL_PROJECTS,
  INITIAL_UNIVERSITIES,
  INITIAL_INDUSTRY_PARTNERS,
  INITIAL_NOTIFICATIONS,
  SOCIAL_IMPACT_METRICS,
  INITIAL_OVERALL_IMPACT_METRICS,
} from '../data/mockData';

export type AppView =
  | 'landing'
  | 'citizen'
  | 'report-challenge'
  | 'challenge-details'
  | 'government'
  | 'admin-challenges'
  | 'admin-impact'
  | 'university'
  | 'university-project'
  | 'create-project'
  | 'industry'
  | 'industry-collaborate';

interface AppContextType {
  currentRole: UserRole;
  currentView: AppView;
  currentUniversityId: string;
  setCurrentUniversityId: (id: string) => void;
  challenges: Challenge[];
  projects: Project[];
  universities: University[];
  industryPartners: IndustryPartner[];
  notifications: NotificationItem[];
  impactMetrics: OverallImpactMetrics;
  socialImpactMetrics: SocialImpactMetric[];
  selectedChallengeId: string | null;
  selectedProjectId: string | null;
  unreadNotificationsCount: number;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  setRole: (role: UserRole) => void;
  navigateTo: (view: AppView, params?: { challengeId?: string; projectId?: string }) => void;
  addChallenge: (challenge: Challenge) => void;
  verifyChallenge: (challengeId: string, notes?: string) => void;
  rejectChallenge: (challengeId: string, reason: string) => void;
  assignUniversity: (challengeId: string, universityId: string) => void;
  acceptChallengeByUniversity: (challengeId: string) => void;
  createProject: (projectData: Partial<Project> & { challengeId: string }) => string;
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: MilestoneStatus) => void;
  addCollaborationOffer: (offerData: Omit<CollaborationOffer, 'id' | 'status' | 'date'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  getSelectedChallenge: () => Challenge | undefined;
  getSelectedProject: () => Project | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentUniversityId, setCurrentUniversityId] = useState<string>('univ-1');
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const saved = localStorage.getItem('jansetu_challenges_v1');
      const list: Challenge[] = saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
      return list.map((c) => ({
        ...c,
        submittedBy: c.submittedBy || {
          name: 'Citizen Reporter',
          phoneMasked: '+91 94311 •••••',
          userType: 'Local Citizen',
        },
      }));
    } catch {
      return INITIAL_CHALLENGES;
    }
  });
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('jansetu_projects_v1');
      const list: Project[] = saved ? JSON.parse(saved) : INITIAL_PROJECTS;
      return list.map((p) => {
        const lead = p.facultyLead || p.facultyMentor || {
          id: 'FAC-01',
          name: 'Dr. Rajesh Kumar',
          role: 'Faculty Mentor',
          department: 'Department of Agricultural Engineering',
          specialization: 'Grassroots Innovations',
          email: 'r.kumar@bau.edu.in',
        };
        return {
          ...p,
          district: p.district || 'Ranchi',
          targetLocation: p.targetLocation || 'Namkum Block',
          facultyMentor: p.facultyMentor || lead,
          facultyLead: p.facultyLead || lead,
          hardwareRequirements: p.hardwareRequirements || [
            'Microcontroller & Sensor Shield',
            'Solar Power Module & Battery Pack',
            'IoT Wireless Telemetry Node',
          ],
          budgetEstimated: p.budgetEstimated || `₹${((p.fundingTarget || 350000) / 100000).toFixed(1)}L`,
          budgetSecured: p.budgetSecured || `₹${((p.fundingRaised || 120000) / 100000).toFixed(1)}L`,
          industryPartners: p.industryPartners || ['Tata Steel CSR', 'Coal India CMPDI'],
        };
      });
    } catch {
      return INITIAL_PROJECTS;
    }
  });
  const [universities] = useState<University[]>(INITIAL_UNIVERSITIES);
  const [industryPartners] = useState<IndustryPartner[]>(INITIAL_INDUSTRY_PARTNERS);
  const [socialImpactMetrics] = useState<SocialImpactMetric[]>(SOCIAL_IMPACT_METRICS);
  const [impactMetrics] = useState<OverallImpactMetrics>(INITIAL_OVERALL_IMPACT_METRICS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('jansetu_notifications_v1');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>('CH-2026-081');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('PRJ-2026-014');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('jansetu_challenges_v1', JSON.stringify(challenges));
    } catch {
      // ignore quota
    }
  }, [challenges]);

  useEffect(() => {
    try {
      localStorage.setItem('jansetu_projects_v1', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('jansetu_notifications_v1', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'citizen') {
      setCurrentView('citizen');
    } else if (role === 'government') {
      setCurrentView('government');
    } else if (role === 'university') {
      setCurrentView('university');
    } else if (role === 'industry') {
      setCurrentView('industry');
    }
  };

  const navigateTo = (view: AppView, params?: { challengeId?: string; projectId?: string }) => {
    if (params?.challengeId) {
      setSelectedChallengeId(params.challengeId);
    }
    if (params?.projectId) {
      setSelectedProjectId(params.projectId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addChallenge = (newChallenge: Challenge) => {
    setChallenges((prev) => [newChallenge, ...prev]);
    // Add notification
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Challenge Submitted & AI Analyzed',
      description: `"${(newChallenge.title || 'Civic Challenge').slice(0, 50)}..." is ready for Government verification.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'government',
      type: 'verification',
      relatedId: newChallenge.id,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const verifyChallenge = (challengeId: string, notes?: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              status: 'govt_verified',
              progressPercent: Math.max(c.progressPercent, 28),
              verifiedByGovtDate: new Date().toISOString().split('T')[0],
              govtReviewNotes: notes || 'Verified by District Administration.',
            }
          : c
      )
    );

    const challenge = challenges.find((c) => c.id === challengeId);
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Challenge Verified by Government',
      description: `"${(challenge?.title || 'Civic Challenge').slice(0, 45)}..." has been verified and open for university assignment.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'citizen',
      type: 'verification',
      relatedId: challengeId,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const rejectChallenge = (challengeId: string, reason: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              status: 'rejected',
              govtReviewNotes: reason,
            }
          : c
      )
    );
  };

  const assignUniversity = (challengeId: string, universityId: string) => {
    const university = universities.find((u) => u.id === universityId);
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              status: 'university_assigned',
              progressPercent: Math.max(c.progressPercent, 38),
              assignedUniversityId: universityId,
              assignedUniversityName: university?.name || 'Selected University',
            }
          : c
      )
    );

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'University Assigned to Challenge',
      description: `${university?.name} has been assigned to lead research for challenge ${challengeId}.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'university',
      type: 'assignment',
      relatedId: challengeId,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const acceptChallengeByUniversity = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              status: 'university_assigned',
              progressPercent: Math.max(c.progressPercent, 42),
            }
          : c
      )
    );

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'University Accepted Challenge',
      description: `Challenge "${(challenge?.title || 'Civic Challenge').slice(0, 40)}..." was officially accepted. Ready to form research project team!`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'citizen',
      type: 'assignment',
      relatedId: challengeId,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const createProject = (projectData: Partial<Project> & { challengeId: string }): string => {
    const newProjectId = `PRJ-${new Date().getFullYear()}-${String(projects.length + 1).padStart(3, '0')}`;
    const associatedChallenge = challenges.find((c) => c.id === projectData.challengeId);

    const defaultFaculty = projectData.facultyLead || projectData.facultyMentor || {
      id: 'FAC-NEW',
      name: 'Dr. Rajesh Kumar',
      role: 'Faculty Mentor',
      department: 'Department of Agricultural Engineering',
      specialization: 'Grassroots Technologies',
      email: 'r.kumar@bau.edu.in',
    };

    const newProject: Project = {
      id: newProjectId,
      challengeId: projectData.challengeId,
      challengeTitle: associatedChallenge?.title || 'Societal Challenge',
      name: projectData.name || 'Innovation Solution Project',
      description: projectData.description || 'Student and faculty driven innovation project.',
      expectedOutcome: projectData.expectedOutcome || 'Prototype deployment with measurable social impact.',
      domain: projectData.domain || associatedChallenge?.category || 'Agriculture',
      universityId: projectData.universityId || 'univ-1',
      universityName: projectData.universityName || 'Birsa Agricultural University',
      district: projectData.district || associatedChallenge?.district || 'Ranchi',
      targetLocation: projectData.targetLocation || associatedChallenge?.villageOrCity || 'Namkum Block',
      facultyMentor: defaultFaculty,
      facultyLead: defaultFaculty,
      hardwareRequirements: projectData.hardwareRequirements || [
        'Microcontroller & Sensor Shield',
        'Solar Power Module & Battery Pack',
        'IoT Wireless Telemetry Node',
      ],
      budgetEstimated: projectData.budgetEstimated || `₹${((projectData.fundingTarget || 500000) / 100000).toFixed(1)}L`,
      budgetSecured: projectData.budgetSecured || `₹${((projectData.fundingRaised || 100000) / 100000).toFixed(1)}L`,
      industryPartners: projectData.industryPartners || [],
      students: projectData.students || [
        { id: 'STU-NEW1', name: 'Ananya Sen', role: 'Student Lead', department: 'Computer Science', specialization: 'Embedded & IoT' },
        { id: 'STU-NEW2', name: 'Rahul Verma', role: 'Student Researcher', department: 'Electronics', specialization: 'Sensors' },
      ],
      milestones: projectData.milestones || [
        { id: 'M-1', title: 'Research & Field Diagnosis', description: 'Baseline ground data collection and stakeholder interviews.', status: 'in_progress', targetDate: '2026-09-25' },
        { id: 'M-2', title: 'Solution Design & CAD/Firmware Blueprint', description: 'Architecting solution modules and circuit schematics.', status: 'upcoming', targetDate: '2026-10-15' },
        { id: 'M-3', title: 'Functional Prototype Development', description: 'Fabrication of working model ready for field tests.', status: 'upcoming', targetDate: '2026-11-05' },
        { id: 'M-4', title: 'Bench & Pilot Testing', description: 'Deploying in target community with telemetry verification.', status: 'upcoming', targetDate: '2026-11-30' },
        { id: 'M-5', title: 'Pilot Validation', description: 'Iterating on feedback from village representatives.', status: 'upcoming', targetDate: '2026-12-20' },
        { id: 'M-6', title: 'Government Deployment & Social Impact Handover', description: 'Scale deployment and baseline social impact audit.', status: 'upcoming', targetDate: '2027-01-15' },
      ],
      currentStage: 'Research',
      progressPercent: 15,
      fundingRaised: projectData.fundingRaised || 100000,
      fundingTarget: projectData.fundingTarget || 500000,
      requiredSupport: projectData.requiredSupport || ['IoT Hardware', 'Mentorship', 'Field Testing Support'],
      collaborationOffers: [],
      updates: [
        {
          id: 'UPD-NEW',
          date: new Date().toISOString().split('T')[0],
          title: 'Project officially initiated by University Team',
          author: projectData.facultyMentor?.name || 'Faculty Lead',
          content: 'Team formed and initial research baseline underway with local Gram Panchayat.',
        },
      ],
      documents: [
        { id: 'DOC-NEW', title: 'Project Charter & Initial Proposal.pdf', type: 'PDF', date: new Date().toISOString().split('T')[0], fileSize: '1.8 MB' },
      ],
      impactEstimate: {
        citizensDirectBenefited: 1200,
        metricKey: 'Expected Community Beneficiaries',
        metricValue: '1,200+ Citizens',
      },
    };

    setProjects((prev) => [newProject, ...prev]);

    // Update challenge status
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === projectData.challengeId
          ? {
              ...c,
              status: 'project_created',
              associatedProjectId: newProjectId,
              progressPercent: Math.max(c.progressPercent, 48),
            }
          : c
      )
    );

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Innovation Project Formed',
      description: `Project "${newProject.name}" has been created by ${newProject.universityName}. Seeking industry collaboration!`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'industry',
      type: 'milestone',
      relatedId: newProjectId,
    };
    setNotifications((prev) => [notif, ...prev]);

    return newProjectId;
  };

  const updateMilestoneStatus = (projectId: string, milestoneId: string, status: MilestoneStatus) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedMilestones = p.milestones.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status,
                completedDate: status === 'completed' ? new Date().toISOString().split('T')[0] : undefined,
              }
            : m
        );
        const completedCount = updatedMilestones.filter((m) => m.status === 'completed').length;
        const total = updatedMilestones.length;
        const newProgress = Math.round((completedCount / total) * 100);

        let newStage = p.currentStage;
        if (newProgress >= 90) newStage = 'Deployment';
        else if (newProgress >= 70) newStage = 'Pilot';
        else if (newProgress >= 50) newStage = 'Testing';
        else if (newProgress >= 30) newStage = 'Prototype';
        else if (newProgress >= 15) newStage = 'Solution Design';

        return {
          ...p,
          milestones: updatedMilestones,
          progressPercent: newProgress,
          currentStage: newStage,
        };
      })
    );

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Project Milestone Completed',
      description: `Project milestone status updated. Live progress recalculated.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'all',
      type: 'milestone',
      relatedId: projectId,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const addCollaborationOffer = (offerData: Omit<CollaborationOffer, 'id' | 'status' | 'date'>) => {
    const newOffer: CollaborationOffer = {
      ...offerData,
      id: `OFFER-${Date.now()}`,
      status: 'Pending Review',
      date: new Date().toISOString().split('T')[0],
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === offerData.projectId) {
          const numericAmount = offerData.amount ? parseInt(offerData.amount.replace(/[^0-9]/g, '')) || 0 : 0;
          return {
            ...p,
            collaborationOffers: [newOffer, ...p.collaborationOffers],
            fundingRaised: p.fundingRaised + numericAmount,
          };
        }
        return p;
      })
    );

    const targetProj = projects.find((p) => p.id === offerData.projectId);
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Industry Partner Offered Support',
      description: `${offerData.industryPartnerName} offered ${offerData.supportType} for project "${targetProj?.name || 'Innovation Solution'}".`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'university',
      type: 'collaboration',
      relatedId: offerData.projectId,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getSelectedChallenge = () => challenges.find((c) => c.id === selectedChallengeId) || challenges[0];
  const getSelectedProject = () => projects.find((p) => p.id === selectedProjectId) || projects[0];

  const unreadNotificationsCount = notifications.filter(
    (n) => !n.read && (n.roleTarget === 'all' || n.roleTarget === currentRole)
  ).length;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentView,
        currentUniversityId,
        setCurrentUniversityId,
        challenges,
        projects,
        universities,
        industryPartners,
        impactMetrics,
        socialImpactMetrics,
        notifications,
        selectedChallengeId,
        selectedProjectId,
        unreadNotificationsCount,
        isNotificationsOpen,
        setIsNotificationsOpen,
        setRole,
        navigateTo,
        addChallenge,
        verifyChallenge,
        rejectChallenge,
        assignUniversity,
        acceptChallengeByUniversity,
        createProject,
        updateMilestoneStatus,
        addCollaborationOffer,
        markNotificationRead,
        markAllNotificationsRead,
        getSelectedChallenge,
        getSelectedProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
