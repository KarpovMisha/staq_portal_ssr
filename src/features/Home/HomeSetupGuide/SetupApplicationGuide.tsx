import cn from 'classnames';
import { Link } from 'react-router';

import AddIcon from 'styles/icon/dashboard/add_square.svg?react';
import ArrowDownIcon from 'styles/icon/icon_check.svg?react';
import ArrowIcon from 'styles/icon/arrowRight.svg?react';
import { list } from '../../../redux/reducers/apps';
import { useAppSelector } from 'hooks/useRedux';
import styles from './SetupAuthorizedGuide.module.scss';

export default function SetupApplicationGuide() {
  const appList = useAppSelector(list) || [];
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
        <Link to="/dashboard/apps">
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
