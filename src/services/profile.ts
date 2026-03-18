import { apiClient } from "@/auth/api-client";

export type ProfileResponse = {
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export function getProfile() {
  return apiClient<ProfileResponse>('/api/v1/user/profile');
}
