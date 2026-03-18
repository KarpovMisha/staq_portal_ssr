import 'server-only';
import { cookies } from 'next/headers';

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('kc_access_token')?.value ?? null;
}
