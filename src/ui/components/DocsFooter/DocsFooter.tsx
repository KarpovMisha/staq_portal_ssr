import styles from './DocsFooter.module.scss';
import { Button, Icon } from '@/ui/elements';

function HelpfulFeedback() {
  return (
    <div className={styles.helpful_feedback}>
      <span>Was this page helpful?</span>
      <Button
        onClick={() => {}}
      >
        Yes <Icon name="Thumb" />
      </Button>
      <Button
        onClick={() => {}}
      >
        No <Icon name="Thumb" />
      </Button>
    </div>
  );
}

function NewsletterSignup() {
  return (
    <div className={styles.newsletter_signup}>
      <div className={styles.newsletter_signup__label}>Sign up for developer updates</div>
      <div className={styles.newsletter_signup__field}>
        <input
          type="email"
          placeholder="name@work.com"
          className={styles.newsletter_signup__input}
          autoComplete="email"
        />
        <button type="submit" className={styles.newsletter_signup__btn}>
          Sign up
        </button>
      </div>
    </div>
  );
}

function SupportLinks() {
  return (
    <div className={styles.support}>
      <div><Icon name="Help" /> Contact support</div>
      <div><Icon name="Chang" /> See the changelog</div>
    </div>
);
}

export default function DocsFooter() {
  return (
    <div className={styles.docs_footer}>
      <HelpfulFeedback />
      <div className={styles.docs_footer__bottom}>
        <SupportLinks />
        <NewsletterSignup />
      </div>
    </div>
  );
}
