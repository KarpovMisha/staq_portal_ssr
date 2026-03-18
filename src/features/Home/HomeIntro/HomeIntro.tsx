
import { Button } from '@/ui/elements';
import styles from './HomeIntro.module.scss';

export default function HomeIntro() {

  return (
    <section className={styles.home_intro}>
      <h1>Start building with Staq</h1>
      <div className={styles.home_intro__description}>
        Explore guides, API references, and integration tools designed to help you get set up
        quickly and start building powerful financial experiences.
      </div>
      <div className={styles.home_intro__btns}>
        <Button
          name="Get started"
          // onClick={() => keycloak.register()}
        />
        <Button
          name="API reference"
          // onClick={() => keycloak.login()}
        />
      </div>
    </section>
  );
}
