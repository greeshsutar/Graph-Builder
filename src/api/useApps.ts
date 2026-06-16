import { useQuery } from '@tanstack/react-query';
import type { App } from '../types';

export const useApps = () => {
  return useQuery<App[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      const response = await fetch('/api/apps');
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
