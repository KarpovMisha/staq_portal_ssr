import Link from 'next/link';

import styles from './ApiGuides.module.scss';
import { Icon } from '../../elements';

export default function ApiGuides() {
  return (
    <section>
      <h2 className={styles.api_guides__header}>Tools</h2>
      <div className={styles.api_guides}>
        <div className={styles.api_guides__item}>
          <h5 className={styles.api_guides__title}>
            <div>
              <Icon name="Postman" />
              <span>Postman collection</span>
            </div>
          </h5>
          <div className={styles.api_guides__description}>
            Postman lets you explore and test our APIs in a ready-made workspace, no setup required.
          </div>
          <Link href="/" className={styles.api_guides__link}>
            <div>
              Get started <Icon name="ArrowRight" />
            </div>
          </Link>
        </div>
        <div className={styles.api_guides__item}>
          <h5 className={styles.api_guides__title}>
            <div>
              <Icon name="Webhooks" />
              <span>Webhooks</span>
            </div>
          </h5>
          <div className={styles.api_guides__description}>
            Webhooks let your app receive real-time updates from our platform as soon as events
            happen.
          </div>
          <Link href="/" className={styles.api_guides__link}>
            <div>
              Get started <Icon name="ArrowRight" />
            </div>
          </Link>
        </div>
        <div className={styles.api_guides__item}>
          <h5 className={styles.api_guides__title}>
            <div>
              <Icon name="Sdk" />
              <span>SDKs</span>
            </div>
          </h5>
          <div className={styles.api_guides__description}>
            Ready-to-use code libraries so you can integrate with our APIs faster and with fewer
            errors.
          </div>
          <Link href="/" className={styles.api_guides__link}>
            <div>
              Get started <Icon name="ArrowRight" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
