import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CertificatesResponse, getCertificates, revokeCertificate } from '@/services/certificates';

export function useCertificatesQuery() {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: getCertificates,
  });
}

export function useRevokeCertificateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => revokeCertificate(id),

    onSuccess: (_, id) => {
      queryClient.setQueryData<CertificatesResponse[]>(['certificates'], (old = []) =>
        old.filter((item) => item.id !== id)
      );
    },
  });
}
