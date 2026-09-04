export type UserRole = 'citizen' | 'government' | 'university' | 'industry';

export type ChallengeStatus = 
  | 'submitted' 
  | 'ai_analyzed' 
  | 'govt_verified' 
  | 'university_assigned' 
  | 'project_created' 
  | 'industry_collaborating' 
  | 'in_testing' 
  | 'deployed' 
  | 'resolved'
  | 'rejected';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type SocietalDomain = 
  | 'Agriculture'
  | 'Water Management'
  | 'Healthcare'
  | 'Education'
  | 'Environment'
  | 'Rural Livelihoods'
  | 'Energy'
  | 'Accessibility'
  | 'Urban Development';

export interface AIAnalysis {
  primaryDomain: SocietalDomain;
  secondaryDomain: SocietalDomain;
  priority: PriorityLevel;
  severityScore: number; // e.g. 8.7
  requiredExpertise: string[];
  keyChallengesIdentified: string[];
  recommendedTechnologies: string[];
  estimatedTimeframe: string;
  similarChallengesFound?: {
    id: string;
    title: string;
    similarityPercent: number;
    district: string;
  }[];
}

export interface UniversityMatch {
  id: string;
  name: string;
  district: string;
  matchScore: number;
  matchReasons: string[];
  department: string;
  activeProjectsCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Faculty Mentor' | 'Student Lead' | 'Student Researcher' | 'Industry Advisor' | string;
  department: string;
  specialization: string;
  avatar?: string;
  email?: string;
  branch?: string;
  year?: string;
}

export type MilestoneStatus = 'completed' | 'in_progress' | 'upcoming';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  targetDate: string;
  completedDate?: string;
  deliverables?: string[];
}

export type ProjectStage = 'Research' | 'Solution Design' | 'Prototype' | 'Testing' | 'Pilot' | 'Deployment' | 'Deployed';

export interface CollaborationOffer {
  id: string;
  projectId: string;
  industryPartnerName: string;
  partnerType: 'Corporate CSR' | 'DeepTech Startup' | 'Industry Leader' | 'Foundation' | 'Enterprise / CSR' | 'AgriTech Startup' | 'IoT & Hardware' | 'Healthcare Tech' | 'Renewable Energy';
  supportType: 'Funding' | 'Technology' | 'Mentorship' | 'Hardware' | 'Prototype' | 'Testing' | 'Deployment';
  amount?: string;
  description: string;
  status: 'Pending Review' | 'Accepted' | 'Active';
  contactPerson: string;
  date: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: SocietalDomain;
  subcategory: string;
  district: string;
  villageOrCity: string;
  specificLocation: string;
  coordinates?: { lat: number; lng: number };
  submittedBy: {
    name: string;
    phoneMasked: string;
    userType: 'Local Farmer' | 'Gram Panchayat Rep' | 'Youth Citizen' | 'Teacher' | 'Local Artisan' | 'Community Elder';
  };
  submittedDate: string;
  status: ChallengeStatus;
  progressPercent: number;
  evidence: {
    type: 'image' | 'video' | 'doc';
    title: string;
    url: string;
    size?: string;
  }[];
  aiAnalysis: AIAnalysis;
  assignedUniversityId?: string;
  assignedUniversityName?: string;
  associatedProjectId?: string;
  verifiedByGovtDate?: string;
  govtReviewNotes?: string;
}

export interface Project {
  id: string;
  challengeId: string;
  challengeTitle: string;
  name: string;
  description: string;
  expectedOutcome: string;
  domain: SocietalDomain;
  universityId: string;
  universityName: string;
  district?: string;
  targetLocation?: string;
  facultyMentor?: TeamMember;
  facultyLead?: TeamMember;
  students: TeamMember[];
  milestones: Milestone[];
  currentStage: 'Research' | 'Solution Design' | 'Prototype' | 'Testing' | 'Pilot' | 'Deployment';
  progressPercent: number;
  fundingRaised: number;
  fundingTarget: number;
  hardwareRequirements?: string[];
  budgetEstimated?: string;
  budgetSecured?: string;
  industryPartners?: string[];
  requiredSupport: string[];
  collaborationOffers: CollaborationOffer[];
  updates: {
    id: string;
    date: string;
    title: string;
    author: string;
    content: string;
  }[];
  documents: {
    id: string;
    title: string;
    type: string;
    date: string;
    fileSize: string;
  }[];
  impactEstimate: {
    citizensDirectBenefited: number;
    metricKey: string;
    metricValue: string;
  };
}

export interface University {
  id: string;
  name: string;
  type: 'Central University' | 'State Technical' | 'Agriculture University' | 'Institute of National Importance';
  district: string;
  facultyCount: number;
  studentsInvolved: number;
  assignedChallengesCount: number;
  activeProjectsCount: number;
  completedProjectsCount: number;
  specializations: string[];
  laboratories: string[];
  contactEmail: string;
}

export interface IndustryPartner {
  id: string;
  name: string;
  category: 'Enterprise / CSR' | 'AgriTech Startup' | 'IoT & Hardware' | 'Healthcare Tech' | 'Renewable Energy';
  headquarters: string;
  projectsSupportedCount: number;
  totalGrantsDisbursed: string;
  focusAreas: SocietalDomain[];
  contactPerson: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  roleTarget: UserRole | 'all';
  type: 'verification' | 'assignment' | 'milestone' | 'collaboration' | 'impact';
  relatedId?: string;
}

export interface OverallImpactMetrics {
  citizensBenefited: number;
  solutionsDeployed: number;
  universitiesActive: number;
  industryPartners: number;
  economicValueGenerated: string;
  waterSavedLitres: string;
}

export interface SocialImpactMetric {
  id: string;
  domain: SocietalDomain;
  metricLabel: string;
  beforeValue: string;
  afterValue: string;
  percentageImprovement: string;
  unitsSavedOrImproved: string;
  beneficiariesCount: number;
  district: string;
  challengeTitle: string;
  projectTitle: string;
}
