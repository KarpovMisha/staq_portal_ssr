import cn from 'classnames';
import Link from 'next/link';

import { useApplicationsQuery } from '@/hooks/useApplicationQuery';
import { useCertificatesQuery } from '@/hooks/useCertificatesQuery';
import ArrowIcon from '@/ui/icons/arrowRight.svg';
import ArrowDownIcon from '@/ui/icons/icon_check.svg';
import CertificateIcon from '@/ui/icons/certificates.svg';
import styles from './SetupAuthorizedGuide.module.scss';

export default function SetupSertificateGuide() {
  const { data: appList = [] } = useApplicationsQuery();
  const { data: certificates = [] } = useCertificatesQuery();
  return (
    <div
      className={cn(styles.setup_guide__item, {
        [styles['setup_guide__item--multiple']]: !!appList.length && !certificates.length,
        [styles['setup_guide__item--pending']]: !appList.length && !certificates.length,
      })}
    >
      <div>
        <div
          className={cn(styles.setup_guide__subItem, {
            [styles['setup_guide__subItem--disabled']]: !appList.length || !!certificates.length,
          })}
        >
          <CertificateIcon />
          <h5>Generate Certificate</h5>
        </div>
        {!!certificates.length ? (
          <div className={styles.setup_guide__complete}>
            <span className={styles.setup_guide__complete_icon}>
              <ArrowDownIcon />
            </span>{' '}
            Complete
          </div>
        ) : (
          <div
            className={cn(styles.setup_guide__item_arrow, {
              [styles['setup_guide__item_arrow--active']]: !!appList.length && !certificates.length,
            })}
          >
            <ArrowIcon />
          </div>
        )}
      </div>
      {!!appList.length && !certificates.length && (
        <Link href="/dashboard/certificates">
          <div className={styles.setup_guide__options}>
            <div className={styles.setup_guide__circle} />
            <span>Create and upload certificate</span>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </Link>
      )}
      {!!appList.length && !certificates.length && (
        <div>
          <div className={styles.setup_guide__options}>
            <div className={styles.setup_guide__circle} />
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
