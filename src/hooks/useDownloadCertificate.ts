'use client';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { downloadCertificateRequest } from '@/services/certificates';
import { showError, showSuccess } from '@/ui/components/Toasts/Toast';
// import { showSuccess, showError } from '@/shared/toasts';

type DownloadCertificatePayload = {
  id: string | number;
};

export function useDownloadCertificate() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const mutation = useMutation({
    mutationFn: async ({ id }: DownloadCertificatePayload) => {
      const certText = await downloadCertificateRequest({ id: String(id) });

      const blob = new Blob([certText], {
        type: 'application/x-x509-ca-cert',
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `signedCert__${id}.crt`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      return certText;
    },
    onSuccess: () => {
      showSuccess('Certificate downloaded successfully');
    },
    onError: () => {
      showError('Error downloading certificate');
    },
  });

  return {
    ...mutation,
  };
}
