'use client';
import { usePathname } from 'next/navigation';

type Options = {
  exact?: boolean;
};

export function useIsLinkActive(href: string, options?: Options) {
  const pathname = usePathname();
  const exact = options?.exact ?? true;

  if (!pathname) return false;

  if (exact) {
    return pathname === href;
  }

  return pathname.startsWith(href);
}
