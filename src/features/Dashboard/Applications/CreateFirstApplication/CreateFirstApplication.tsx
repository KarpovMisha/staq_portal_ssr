
import ApplicationIcon from '@/ui/icons/applications.svg';
import { Button } from '@/ui/elements';
import styles from './CreateFirstApplication.module.scss';

export default function CreateFirstApplication({ callback }: { callback: () => void }) {
  return (
    <div className={styles.first_application}>
      <h1 className={styles.first_application__header}>Applications</h1>
      <div className={styles.first_application__banner}>
        <div className={styles.first_application__icon}>
          <ApplicationIcon />
        </div>
        <h2 className={styles.first_application__title}>Create your first App</h2>
        <div className={styles.first_application__description}>
          Get started by creating your first application
        </div>
        <div className={styles.first_application__button}>
          <Button
            name="Create app"
            variant="gradient_primary"
            type="button"
            onClick={callback}
          />
        </div>
      </div>
    </div>
  );
}
