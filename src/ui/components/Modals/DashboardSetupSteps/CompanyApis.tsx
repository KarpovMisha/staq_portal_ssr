import cn from 'classnames';

import { Button } from '@/ui/elements';
import { FormCheckbox } from '@/ui/elements/Form';
import { apisList } from './data';
import styles from './CompanyApis.module.scss';

type CompanyApisProps = {
  nextStep: () => void;
  apis: string[];
};


export default function CompanyApis({ nextStep, apis = [] }: CompanyApisProps) {
  return (
    <div className={styles.company_apis__instruction}>
      <div className={styles.company_apis__title}>
        Which of Staqs API's do you think you'll want to use?
      </div>
      <div className={styles.company_apis__description}>
        This step is optional. You can always add products later.
      </div>
      <div className={styles.company_apis__list}>
        {apisList.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={cn(styles.company_apis__product, {
                [styles['company_apis__product--active']]: apis.includes(card.title)
              })}
            >
              <FormCheckbox
                className="application"
                name="company_apis"
                value={card.title}
                // disabled={!!card.disabled}
                label={
                  <div className={styles.company_apis__label}>
                    <Icon /> <span>{card.title}</span>
                    {card.title === 'Identity' && (
                      <span style={{ fontSize: '14px', color: '#a9a9af' }}>Required</span>
                    )}
                  </div>
                }
              />
            </div>
          );
        })}
      </div>
      <div className={styles.company_apis__btn}>
        <Button
          name="Go to dashboard"
          variant="gradient_primary"
          type="submit"
          // disabled={isValid}
          onClick={nextStep}
        />
      </div>
    </div>
  );
}
