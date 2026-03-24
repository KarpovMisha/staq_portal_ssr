'use client';
import cn from 'classnames';
import Link from 'next/link';

import styles from './HomeSetupGuide.module.scss';
import { Icon } from '@/ui/elements';

export default function HomeSetupGuide() {
  return (
    <section>
      <div className={styles.home_guide__header}>
        <h2 className={cn(styles['home_guide__header--title'])}>Quickstart Guide</h2>
        <div className={cn(styles['home_guide__header--description'])}>
          Follow the steps below to unlock sandbox testing in minutes.
        </div>
      </div>
      <div className={styles.guide_steps}>
        <div className={styles.guide_steps__item}>
          <div className={styles.guide_steps__name}>Step 1</div>
          <div className={styles.guide_steps__title}>
            <div>
              <Icon name='Account'/>
              <span>Create account</span>
            </div>
          </div>
          <div className={styles.guide_steps__description}>
            Sign up to access dashboard and test keys.
          </div>
          <div
            className={styles.guide_steps__link}
            onClick={() => {
              window.location.href = `/api/auth/signup?returnTo=/`;
            }}
          >
            <div>
              Sign up <Icon name="ArrowRight" />
            </div>
          </div>
        </div>
        <div className={styles.guide_steps__item}>
          <div className={styles.guide_steps__name}>Step 2</div>
          <div className={styles.guide_steps__title}>
            <div>
              <Icon name="App" />
              <span>Create application</span>
            </div>
          </div>
          <div className={styles.guide_steps__description}>Set permissions and get credentials</div>
          <Link href="/" className={styles.guide_steps__link}>
            <div>
              Create app <Icon name="ArrowRight" />
            </div>
          </Link>
        </div>
        <div className={styles.guide_steps__item}>
          <div className={styles.guide_steps__name}>Step 3</div>
          <div className={styles.guide_steps__title}>
            <div>
              <Icon name="Certificate" />
              <span>Generate certificate</span>
            </div>
          </div>
          <div className={styles.guide_steps__description}>
            Set up mutual TLS for secure API calls
          </div>
          <Link href="/" className={styles.guide_steps__link}>
            <div>
              Create certificate <Icon name="ArrowRight" />
            </div>
          </Link>
        </div>
        <div className={styles.guide_steps__item}>
          <div className={styles.guide_steps__name}>Step 4</div>
          <div className={styles.guide_steps__title}>
            <div>
              <Icon name="Token" />
              <span>Create access token</span>
            </div>
          </div>
          <div className={styles.guide_steps__description}>Authorize app-level test requests</div>
          <Link href="/" className={styles.guide_steps__link}>
            <div>
              Create token <Icon name="ArrowRight" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
