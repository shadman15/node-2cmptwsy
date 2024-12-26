import { Job } from '../types/job';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'We are looking for a Senior Frontend Developer to join our team...',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern frontend tools',
    ],
    salary: '$120,000 - $160,000',
    postedDate: '2024-03-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Remote',
    type: 'Remote',
    description: 'Join our distributed team building scalable backend systems...',
    requirements: [
      'Experience with Node.js',
      'Knowledge of database systems',
      'Strong problem-solving skills',
    ],
    salary: '$100,000 - $140,000',
    postedDate: '2024-03-14',
    featured: true,
  },
];