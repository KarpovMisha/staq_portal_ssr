import { apiClient } from "@/auth/api-client";

export type Application = {
  id: string;
  appId: string;
  name: string;
  scopes: string[];
  status: string;
  type: string;
  createdDate: string;
};

export type ApplicationResponse = {
  data: Application[];
};

export function getApplications() {
  return apiClient<ApplicationResponse>('/api/v1/app/list');
}
