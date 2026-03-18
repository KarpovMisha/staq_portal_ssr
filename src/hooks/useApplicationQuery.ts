import { useQuery } from '@tanstack/react-query';
import { getApplications } from '@/services/applications';

export function useApplicationsQuery() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const res = await getApplications();
      return res.data;
    },
  });
}
