'use client';
import { useEffect, useState } from 'react';
import { useProfileQuery } from '@/hooks/useProfile';

import styles from './DashboardIntro.module.scss';

export default function DashboardIntro() {
  const { data: profile } = useProfileQuery();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (profile) {
      const { firstName } = profile.data;
      setUserName(firstName);
    }
  }, [profile?.data]);

  return (
    <section className={styles.dashboard_intro}>
      <h1>Hi {userName}, welcome to Staq</h1>
      <div className={styles.dashboard_intro__description}>
        This is your dashboard, we're currently in a sandbox, Here you can
        safely and easily test out Staq's products before moving to a live
        environment.
      </div>
    </section>
  );
}
