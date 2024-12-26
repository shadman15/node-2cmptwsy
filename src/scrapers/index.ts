import { IndeedScraper } from './indeed';
import { LinkedInScraper } from './linkedin';
import { Job, JobCategory } from '../types/job';

const scraperConfigs = [
  {
    name: 'Indeed-Tech',
    baseUrl: 'https://www.indeed.com/jobs?q=software+developer',
    category: 'Tech' as JobCategory
  },
  {
    name: 'Indeed-Construction',
    baseUrl: 'https://www.indeed.com/jobs?q=construction',
    category: 'Construction' as JobCategory
  },
  {
    name: 'LinkedIn-Graduate',
    baseUrl: 'https://www.linkedin.com/jobs/search?keywords=new+graduate',
    category: 'Graduate' as JobCategory
  }
];

export async function scrapeJobs(): Promise<Job[]> {
  const scrapers = [
    ...scraperConfigs.filter(config => config.name.includes('Indeed')).map(config => new IndeedScraper(config)),
    ...scraperConfigs.filter(config => config.name.includes('LinkedIn')).map(config => new LinkedInScraper(config))
  ];

  const jobPromises = scrapers.map(scraper => scraper.scrape());
  const jobArrays = await Promise.all(jobPromises);
  return jobArrays.flat();
}