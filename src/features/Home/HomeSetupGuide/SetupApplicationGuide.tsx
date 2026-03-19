import cn from 'classnames';
import Link from 'next/link';

import AddIcon from '@/ui/icons/add_square.svg';
import ArrowDownIcon from '@/ui/icons/icon_check.svg';
import ArrowIcon from '@/ui/icons/arrowRight.svg';
import styles from './SetupAuthorizedGuide.module.scss';
import { useApplicationsQuery } from '@/hooks/useApplicationQuery';

export default function SetupApplicationGuide() {
  const { data: appList = [] } = useApplicationsQuery();
  return (
    <div
      className={cn(styles.auth_guide__item, {
        [styles['auth_guide__item--multiple']]: !appList.length,
      })}
    >
      <div>
        <div
          className={cn(styles.auth_guide__subItem, {
            [styles['auth_guide__subItem--disabled']]: !!appList.length,
          })}
        >
          <AddIcon />
          <h5>Create New Application</h5>
        </div>
        {!!appList.length ? (
          <div className={styles.auth_guide__complete}>
            <span className={styles.auth_guide__complete_icon}>
              <ArrowDownIcon />
            </span>{' '}
            Complete
          </div>
        ) : (
          <div
            className={cn(styles.auth_guide__item_arrow, {
              [styles['auth_guide__item_arrow--active']]: !appList.length,
            })}
          >
            <ArrowIcon />
          </div>
        )}
      </div>
      {!appList.length && (
        <Link href="/dashboard/apps">
          <div className={styles.auth_guide__options}>
            <div className={styles.auth_guide__circle} />
            <h5>Create New Application</h5>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </Link>
      )}
      {!appList.length && (
        <div>
          <div className={styles.auth_guide__options}>
            <div className={styles.auth_guide__circle} />
            <span>Configure Application</span>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </div>
      )}
      {/* <div>
            <div className={styles.auth_guide__options}>
              <div className={styles.auth_guide__circle} />
              <span>Select API Access</span>
            </div>
            <div>
              <ArrowIcon />
            </div>
          </div>
          <div>
            <div className={styles.auth_guide__options}>
              <div className={styles.auth_guide__circle} />
              <span>Select app type</span>
            </div>
            <div>
              <ArrowIcon />
            </div>
          </div> */}
    </div>
  );
}
