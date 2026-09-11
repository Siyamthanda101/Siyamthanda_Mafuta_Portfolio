export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: string[];
  accentColor: string;
}

export interface ProjectDetails {
  overview: string;
  projectType?: string;
  role?: string;
  individualContribution?: string;
  problem?: string;
  approach?: string;
  technologies: string[];
  status: string;
  repository?: string;
  liveUrl?: string;
  bulletPoints?: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  isFlagship?: boolean;
  isProminent?: boolean;
  category: string;
  projectType: string;
  role: string;
  individualContribution?: string;
  status: string;
  details: string[];
  imageUrl?: string;
  secondaryImageUrl?: string;
  imageCaption?: string;
  secondaryImageCaption?: string;
  githubUrl?: string;
  liveUrl?: string;
  projectDetails?: ProjectDetails;
}

export type AchievementClassification = 'Badge' | 'Specialization' | 'Course';

export interface Certification {
  id: string;
  title: string;
  classification: AchievementClassification;
  provider: string;
  completedDate: string;
  previewImage: string;
  verificationUrl: string;
  buttonLabel: 'View Badge' | 'View Certificate';
}

export interface JourneyMilestone {
  month: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  focus: string;
  topics: string[];
  certifications?: string[];
  isPlaceholder?: boolean;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  keyAreas: string[];
}

export interface CVConfig {
  filePath: string;
  downloadFilename: string;
  title: string;
  sectionHeading: string;
  badgeLabel: string;
  subtitle: string;
  description: string;
  metaText: string;
}
