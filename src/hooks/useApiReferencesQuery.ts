import { useQuery } from '@tanstack/react-query';
import { getApiReferences } from '@/services/apiReferences';

export function useApiReferencesQuery() {
  return useQuery({
    queryKey: ['api-references'],
    queryFn: getApiReferences,
  });
}
