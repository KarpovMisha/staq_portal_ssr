import cn from 'classnames';

import ArrowDownIcon from '@/ui/icons/icon_check.svg';
import AccountIcon from '@/ui/icons/account.svg';
import SetupApplicationGuide from './SetupApplicationGuide';
import SetupSertificateGuide from './SetupSertificateGuide';
import SetupApiGuide from './SetupApiGuide';
import styles from './SetupAuthorizedGuide.module.scss';

export default function AuthorizedSetupGuide() {
  return (
    <section className={styles.auth_guide}>
      <div className={styles.auth_guide__header}>
        <h3 className={cn(styles['auth_guide__header--title'])}>Setup Guide</h3>
        <div className={cn(styles['auth_guide__header--description'])}>
          Follow the steps below to unlock full sandbox access in minutes.
        </div>
      </div>
      <div className={styles.auth_guide__body}>
        <div className={styles.auth_guide__item}>
          <div>
            <div
              className={cn(styles.auth_guide__subItem, {
                [styles['auth_guide__subItem--disabled']]: true,
              })}
            >
              <AccountIcon />
              <h5>Create Staq Account</h5>
            </div>
            <div className={styles.auth_guide__complete}>
              <span className={styles.auth_guide__complete_icon}>
                <ArrowDownIcon />
              </span>{' '}
              Complete
            </div>
          </div>
        </div>

        <SetupApplicationGuide />
        <SetupSertificateGuide />
        <SetupApiGuide />
      </div>
    </section>
  );
}
