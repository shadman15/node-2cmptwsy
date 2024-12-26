import { load } from 'cheerio';
import fetch from 'node-fetch';
import { format } from 'date-fns';
import { Scraper, ScraperConfig } from './types';
import { Job } from '../types/job';

export class IndeedScraper implements Scraper {
  constructor(public config: ScraperConfig) {}

  async scrape(): Promise<Job[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}`);
      const html = await response.text();
      const $ = load(html);
      const jobs: Job[] = [];

      $('.job_seen_beacon').each((_, element) => {
        const title = $(element).find('.jobTitle').text().trim();
        const company = $(element).find('.companyName').text().trim();
        const location = $(element).find('.companyLocation').text().trim();
        const salary = $(element).find('.salary-snippet').text().trim() || 'Not specified';
        const description = $(element).find('.job-snippet').text().trim();
        
        const job: Job = {
          id: `${this.config.name}-${Date.now()}-${jobs.length}`,
          title,
          company,
          location,
          type: 'Full-time',
          description,
          requirements: [],
          salary,
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