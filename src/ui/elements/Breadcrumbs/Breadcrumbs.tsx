'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.scss';

function formatSegment(segment: string) {
  return segment.replace(/-/g, ' ');
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname) return null;

  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        return (
          <span key={href} className={styles.crumb}>
            <Link href={href}>{formatSegment(segment)}</Link>
            {index < segments.length - 1 && (
              <span className={styles.sep} aria-hidden="true">
                /
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
