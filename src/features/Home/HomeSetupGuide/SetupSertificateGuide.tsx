import cn from 'classnames';
import Link from 'next/link';

import CertificateIcon from '@/ui/icons/certificates.svg';
import ArrowDownIcon from '@/ui/icons/icon_check.svg';
import ArrowIcon from '@/ui/icons/arrowRight.svg';
import styles from './SetupAuthorizedGuide.module.scss';
import { useCertificatesQuery } from '@/hooks/useCertificatesQuery';
import { useApplicationsQuery } from '@/hooks/useApplicationQuery';

export default function SetupSertificateGuide() {
  const { data: appList = [] } = useApplicationsQuery();
  const { data: certificates = [] } = useCertificatesQuery();

  return (
    <div
      className={cn(styles.auth_guide__item, {
        [styles['auth_guide__item--multiple']]: !!appList.length && !certificates.length,
        [styles['auth_guide__item--pending']]: !appList.length && !certificates.length,
      })}
    >
      <div>
        <div
          className={cn(styles.auth_guide__subItem, {
            [styles['auth_guide__subItem--disabled']]: !appList.length || !!certificates.length,
          })}
        >
          <CertificateIcon />
          <h5>Generate Certificate</h5>
        </div>
        {!!certificates.length ? (
          <div className={styles.auth_guide__complete}>
            <span className={styles.auth_guide__complete_icon}>
              <ArrowDownIcon />
            </span>{' '}
            Complete
          </div>
        ) : (
          <div
            className={cn(styles.auth_guide__item_arrow, {
              [styles['auth_guide__item_arrow--active']]: !!appList.length && !certificates.length,
            })}
          >
            <ArrowIcon />
          </div>
        )}
      </div>
      {!!appList.length && !certificates.length && (
        <Link href="/dashboard/certificates">
          <div className={styles.auth_guide__options}>
            <div className={styles.auth_guide__circle} />
            <span>Create and upload certificate</span>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </Link>
      )}
      {!!appList.length && !certificates.length && (
        <div>
          <div className={styles.auth_guide__options}>
            <div className={styles.auth_guide__circle} />
            <span>Download signed certificate</span>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </div>
      )}
    </div>
  );
}
