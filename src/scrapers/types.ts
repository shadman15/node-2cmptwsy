import { Job, JobCategory } from '../types/job';

export interface ScraperConfig {
  name: string;
  baseUrl: string;
  category: JobCategory;
}

export interface Scraper {
  config: ScraperConfig;
  scrape(): Promise<Job[]>;
}