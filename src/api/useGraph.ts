import { useQuery } from '@tanstack/react-query';
import type { GraphData } from '../types';

export const useGraph = (appId: string | null) => {
  return useQuery<GraphData>({
    queryKey: ['graph', appId],
    queryFn: async () => {
      if (!appId) throw new Error('App ID is required');
      const response = await fetch(`/api/apps/${appId}/graph`);
      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }
      return response.json();
    },
    enabled: !!appId,
    retry: 1, // Minimize retry attempts so failures are responsive
  });
};
