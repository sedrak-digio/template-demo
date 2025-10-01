export interface BaseExperience {
  id: string;
  title: string;
  description: string;
  date: string;
  dateEnd?: string;
  tags: string[];
  featured?: boolean;
}

export interface DevelopmentExperience extends BaseExperience {
  type: 'development';
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  role: string;
  impact?: string;
}

export interface TravelExperience extends BaseExperience {
  type: 'travel';
  location: string;
  country: string;
  duration: string;
  highlights: string[];
  photos?: string[];
  recommendations?: string;
}

export type Experience = DevelopmentExperience | TravelExperience;