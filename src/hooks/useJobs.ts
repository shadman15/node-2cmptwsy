import { useState, useEffect } from 'react';
import { Job, JobCategory } from '../types/job';
import { JobsStore } from '../utils/jobsStore';

export function useJobs(category?: JobCategory) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const jobsStore = JobsStore.getInstance();
    
    async function loadJobs() {
      try {
        setLoading(true);
        await jobsStore.refreshJobs();
        setJobs(jobsStore.getJobs(category));
        setError(null);
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, [category]);

  return { jobs, loading, error };
}