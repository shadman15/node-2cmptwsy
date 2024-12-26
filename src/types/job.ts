export type JobCategory = 'Tech' | 'Construction' | 'Graduate' | 'Other';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  requirements: string[];
  salary: string;
  postedDate: string;
  featured: boolean;
  category: JobCategory;
  sourceUrl: string;
  source: string;
}