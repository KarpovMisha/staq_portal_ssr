import cn from 'classnames';

import { Button } from 'elements/index';
import { FormCheckbox } from 'elements/Form';
import styles from './CompanyTypes.module.scss';

type CompanyTypesProps = {
  nextStep: () => void;
  types: string[];
};

export default function CompanyTypes({ nextStep, types = [] }: CompanyTypesProps) {
  console.log('types', types);
  const hasType = ['B2B', 'B2C'].some((type) => types.includes(type));

  return (
    <div className={styles.company_types__instruction}>
      <div className={styles.company_types__title}>
        What type of services does your company provide?
      </div>
      <div className={styles.company_types__description}>
        We’ll tailor the APIs you see based on your business type. Please select one or both options
        if they apply to your business.
      </div>
      <div className={styles.company_types__list}>
        <div
          className={cn(styles.company_types__type, {
            [styles['company_types__type--active']]: types.includes('B2B'),
          })}
        >
          <FormCheckbox
            className="application"
            name="company_types"
            value="B2B"
            label={
              <div className={styles.company_types__type_label}>
                <div>
                  B2B{' '}
                  <span style={{ fontSize: '14px', color: '#a9a9af' }}>(Business to Business)</span>
                </div>
                <div>You provide products or services to other companies.</div>
              </div>
            }
          />
        </div>
        <div
          className={cn(styles.company_types__type, {
            [styles['company_types__type--active']]: types.includes('B2C'),
          })}
        >
          <FormCheckbox
            className="application"
            name="company_types"
            value="B2C"
            label={
              <div className={styles.company_types__type_label}>
                <div>
                  B2C{' '}
                  <span style={{ fontSize: '14px', color: '#a9a9af' }}>(Business to Consumer)</span>
                </div>
                <div>You provide products or services directly to individual customers.</div>
              </div>
            }
          />
        </div>
      </div>
      <div></div>
      <div className={styles.company_types__btn}>
        <Button
          name="Continue"
          variant="gradient_primary"
          type="button"
          disabled={!hasType}
          onClick={nextStep}
        />
      </div>
    </div>
  );
}
