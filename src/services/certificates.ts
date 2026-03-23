import { apiClient } from "@/auth/api-client";

export type CertificatesResponse = {
  id: string;
  creationDate: string;
  status: 'REVOKED' | 'SIGNED';

};

export function getCertificates() {
  return apiClient<CertificatesResponse[]>('/api/v1/certificate/list');
}

export async function revokeCertificate(id: string) {
  return apiClient<CertificatesResponse[]>(`/api/v1/certificate/revoke/${id}`, {
    method: 'POST',
  });
}

type UploadCertificateParams = {
  attachments: {
    file: File;
  };
};

export async function uploadCertificate({ attachments }: UploadCertificateParams) {
  return apiClient<any>(`/api/v1/certificate/upload`, {
    attachments,
    method: 'POST',
  });
}

export async function downloadCertificateRequest({ id }: { id: string }): Promise<string> {
  return apiClient<any>(`/api/v1/certificate/download/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/x-x509-ca-cert,text/plain,*/*',
    },
  });
}
