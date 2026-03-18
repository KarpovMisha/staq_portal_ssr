import { Button } from 'elements/index';
import { FormInput } from 'elements/Form';
import styles from './CompanyName.module.scss';

type CompanyName = {
  nextStep: () => void;
  isValid: boolean;
};

export default function CompanyName({ nextStep, isValid }: CompanyName) {
  return (
    <div className={styles.company_name__instruction}>
      <div className={styles.company_name__title}>Welcome to Staq</div>
      <div className={styles.company_name__description}>
        Answer a few questions about your business to customise your setup. You can always change
        these later.
      </div>
      <div className={styles.company_name__input}>
        <FormInput
          name="business_name"
          label="Business name"
          // inputType="secondary"
          placeholder="Enter your business name"
        />
      </div>
      <div className={styles.company_name__input}>
        <FormInput
          name="business_email"
          // inputType="secondary"
          label={
            <div>
              Business website <span>Optional</span>
            </div>
          }
          placeholder="Enter your business website"
        />
      </div>
      <div className={styles.company_name__btn}>
        <Button
          name="Continue"
          variant="gradient_primary"
          type="button"
          disabled={isValid}
          onClick={nextStep}
        />
      </div>
    </div>
  );
}
