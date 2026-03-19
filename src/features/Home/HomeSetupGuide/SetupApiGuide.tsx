import cn from 'classnames';
import Link from 'next/link';

import ApplicationIcon from '@/ui/icons/applications.svg';
import ArrowIcon from '@/ui/icons/arrowRight.svg';
import { useCertificatesQuery } from '@/hooks/useCertificatesQuery';
import styles from './SetupAuthorizedGuide.module.scss';

export default function SetupApiGuide() {
  const { data: certificates = [] } = useCertificatesQuery();
  return (
    <div
      className={cn(styles.auth_guide__item, {
        [styles['auth_guide__item--multiple']]: !!certificates.length,
        [styles['auth_guide__item--pending']]: !certificates.length,
      })}
    >
      <div>
        <div
          className={cn(styles.auth_guide__subItem, {
            [styles['auth_guide__subItem--disabled']]: !certificates.length,
          })}
        >
          <ApplicationIcon />
          <h5>Make First API Call</h5>
        </div>
        <div
          className={cn(styles.auth_guide__item_arrow, {
            [styles['auth_guide__item_arrow--active']]: !!certificates.length,
          })}
        >
          <ArrowIcon />
        </div>
      </div>
      {!!certificates.length && (
        <Link href="get-started/make-first-api-call">
          <div className={styles.auth_guide__options}>
            <div className={styles.auth_guide__circle} />
            <h5>Make first API call</h5>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </Link>
      )}
    </div>
  );
}
