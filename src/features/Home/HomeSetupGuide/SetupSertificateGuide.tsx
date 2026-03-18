import cn from 'classnames';
import { Link } from 'react-router';

import CertificateIcon from 'styles/icon/dashboard/certificates.svg?react';
import ArrowDownIcon from 'styles/icon/icon_check.svg?react';
import ArrowIcon from 'styles/icon/arrowRight.svg?react';
import { list } from '../../../redux/reducers/apps';
import { useAppSelector } from 'hooks/useRedux';
import { certificatesList } from '../../../redux/reducers/certificates';
import styles from './SetupAuthorizedGuide.module.scss';

export default function SetupSertificateGuide() {
  const appList = useAppSelector(list) || [];
  const certificates = useAppSelector(certificatesList);

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
        <Link to="/dashboard/certificates">
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
