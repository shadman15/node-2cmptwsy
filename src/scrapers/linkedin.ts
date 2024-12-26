import { load } from 'cheerio';
import fetch from 'node-fetch';
import { format } from 'date-fns';
import { Scraper, ScraperConfig } from './types';
import { Job } from '../types/job';

export class LinkedInScraper implements Scraper {
  constructor(public config: ScraperConfig) {}

  async scrape(): Promise<Job[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}`);
      const html = await response.text();
      const $ = load(html);
      const jobs: Job[] = [];

      $('.job-card-container').each((_, element) => {
        const title = $(element).find('.job-card-list__title').text().trim();
        const company = $(element).find('.job-card-container__company-name').text().trim();
        const location = $(element).find('.job-card-container__metadata-item').first().text().trim();
        
        const job: Job = {
          id: `${this.config.name}-${Date.now()}-${jobs.length}`,
          title,
          company,
          location,
          type: 'Full-time',
          description: '',
          requirements: [],
          salary: 'Not specified',
          postedDate: format(new Date(), 'yyyy-MM-dd'),
          featured: false,
          category: this.config.category,
          sourceUrl: this.config.baseUrl,
          source: this.config.name
        };

        jobs.push(job);
      });

      return jobs;
    } catch (error) {
      console.error(`Error scraping ${this.config.name}:`, error);
      return [];
    }
  }
}