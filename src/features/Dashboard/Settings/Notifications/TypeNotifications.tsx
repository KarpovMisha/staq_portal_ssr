'use client';
import { Form } from 'react-final-form';
import cn from 'classnames';

import InboxIcon from '@/ui/icons/inbox.svg';
import LetterIcon from '@/ui/icons/letter.svg';
import PhoneIcon from '@/ui/icons/phone.svg';
import { FormCheckbox } from '@/ui/elements/Form';
import styles from './Notifications.module.scss';

export default function TypeNotifications() {
  const handleChange = (values: { name?: boolean; email?: boolean; phone?: boolean }) => {
    if (typeof values.name === 'boolean') {
      console.log('updateNameNotifications', values.name);
    }

    if (typeof values.email === 'boolean') {
      console.log('updateEmailNotifications', values.email);
    }

    if (typeof values.phone === 'boolean') {
      console.log('updatePhoneNotifications', values.phone);
    }
  };

  return (
    <Form
      onSubmit={() => {}}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.notifications__types}>
            <div className={styles.notifications__type}>
              <div className={cn([styles['notifications__type--logo']])}>
                <InboxIcon />
              </div>
              <div>
                <div>Inbox</div>
                <div>Get notified on your dashboard</div>
              </div>
              <FormCheckbox
                name="name"
                className="toggle"
                onChange={(value) => {
                  console.log('updateNameNotifications', value);
                }}
              />
            </div>
            <div className={styles.notifications__type}>
              <div className={cn([styles['notifications__type--logo']])}>
                <LetterIcon />
              </div>
              <div>
                <div>Inbox</div>
                <div>Get notified on your dashboard</div>
              </div>
              <FormCheckbox
                name="email"
                className="toggle"
                onChange={(value) => {
                  console.log('updateEmailNotifications', value);
                }}
              />
            </div>
            <div className={styles.notifications__type}>
              <div className={cn([styles['notifications__type--logo']])}>
                <PhoneIcon />
              </div>
              <div>
                <div>Inbox</div>
                <div>Get notified on your dashboard</div>
              </div>
              <FormCheckbox
                name="phone"
                className="toggle"
                onChange={(value) => {
                  console.log('updatePhoneNotifications', value);
                }}
              />
            </div>
          </form>
        );
      }}
    />
  );
}
