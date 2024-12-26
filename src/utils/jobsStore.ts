import { Job } from '../types/job';
import { scrapeJobs } from '../scrapers';

class JobsStore {
  private jobs: Job[] = [];
  private lastUpdate: Date | null = null;
  private static instance: JobsStore;

  private constructor() {}

  static getInstance(): JobsStore {
    if (!JobsStore.instance) {
      JobsStore.instance = new JobsStore();
    }
    return JobsStore.instance;
  }

  async refreshJobs(): Promise<void> {
    try {
      const newJobs = await scrapeJobs();
      this.jobs = newJobs;
      this.lastUpdate = new Date();
    } catch (error) {
      console.error('Error refreshing jobs:', error);
    }
  }

  getJobs(category?: string): Job[] {
    if (category) {
      return this.jobs.filter(job => job.category === category);
    }
    return this.jobs;
  }

  getLastUpdate(): Date | null {
    return this.lastUpdate;
  }
}