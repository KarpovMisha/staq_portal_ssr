'use client';
import cn from 'classnames';
import styles from './Notifications.module.scss';
import TypeNotifications from './TypeNotifications';

export default function Notifications() {
  return (
    <div className={styles.notifications}>
      <h4>Notifications settings</h4>
      <TypeNotifications />
      <div className={styles.notifications__billing}>
        <div className={cn([styles['notifications__billing--header']])}>
          <span>Billing</span>
          <div className={cn([styles['notifications__billing--right']])}>
            <div>Inbox</div>
            <div>Email</div>
            <div>SMS</div>
          </div>
        </div>
        <div className={cn([styles['notifications__billing--body']])}>
          <span>List item name</span>
          <div className={cn([styles['notifications__billing--right']])}>
            <div className="checkbox">
              <input type="checkbox" onChange={() => {}} />
            </div>
            <div className="checkbox">
              <input type="checkbox" onChange={() => {}} />
            </div>
            <div className="checkbox">
              <input type="checkbox" onChange={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
