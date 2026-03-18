import Link from 'next/link';
import cn from 'classnames';

import { useApplicationsQuery } from '@/hooks/useApplicationQuery';
import AddIcon from '@/ui/icons/add_square.svg';
import ArrowIcon from '@/ui/icons/arrowRight.svg';
import ArrowDownIcon from '@/ui/icons/icon_check.svg';
import styles from './SetupAuthorizedGuide.module.scss';

export default function SetupApplicationGuide() {
  const { data: appList = [] } = useApplicationsQuery();

  return (
    <div
      className={cn(styles.setup_guide__item, {
        [styles['setup_guide__item--multiple']]: !appList.length,
      })}
    >
      <div>
        <div
          className={cn(styles.setup_guide__subItem, {
            [styles['setup_guide__subItem--disabled']]: !!appList.length,
          })}
        >
          <AddIcon />
          <h5>Create New Application</h5>
        </div>
        {!!appList.length ? (
          <div className={styles.setup_guide__complete}>
            <span className={styles.setup_guide__complete_icon}>
              <ArrowDownIcon />
            </span>{' '}
            Complete
          </div>
        ) : (
          <div
            className={cn(styles.setup_guide__item_arrow, {
              [styles['setup_guide__item_arrow--active']]: !appList.length,
            })}
          >
            <ArrowIcon />
          </div>
        )}
      </div>
      {!appList.length && (
        <Link href="/dashboard/apps">
          <div className={styles.setup_guide__options}>
            <div className={styles.setup_guide__circle} />
            <h5>Create New Application</h5>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </Link>
      )}
      {!appList.length && (
        <div>
          <div className={styles.setup_guide__options}>
            <div className={styles.setup_guide__circle} />
            <span>Configure Application</span>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </div>
      )}
    </div>
  );
}
