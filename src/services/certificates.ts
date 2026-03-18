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
  return apiClient<CertificatesResponse[]>(`certificate/revoke/${id}`, {
    method: 'POST',
  });
}
