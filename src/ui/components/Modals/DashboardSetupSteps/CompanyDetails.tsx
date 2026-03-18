import cn from 'classnames';

import { apisList } from './data';
import CheckIcon from 'styles/icon/dashboard/checkmark_circle.svg?react';
import StaqIcon from 'styles/icon/dashboard/staq_app_logo.svg?react';
import styles from './CompanyDetails.module.scss';
import { generateCompanyLogo } from 'utils/helpers';

type CompanyFetailsProps = {
  step: string;
  data: {
    business_name: string;
    business_email: string;
    company_types: string[];
    company_apis: string[];
  };
};

export default function CompanyDetails({ step, data }: CompanyFetailsProps) {
  const { business_name = '', business_email, company_types = [], company_apis = [] } = data;
  const companyLogo = generateCompanyLogo(business_name);
  const isB2B = company_types?.includes('B2B');
  const isB2C = company_types?.includes('B2C');

  return (
    <div className={styles.company_details__result}>
      <div className={cn(styles.company_details__details, styles[step])}>
        <div className={styles.company_details__top}>
          <div className={styles.company_details__name}>
            <div className={styles.company_details__avatar}>{companyLogo}</div>
            {business_name ? business_name : 'Busines Name'}
          </div>
          <div className={styles.company_details__email}>
            {business_email ? business_email : 'https://wayneenterprises.com'}
          </div>
        </div>

        <div className={styles.company_details__products}>
          <p>Products</p>
          {}
          <ul>
            {!!company_apis.length && apisList.map((api) => {
              const Icon = api.icon;
              return (
                <li
                  key={api.title}
                  className={cn(styles.company_details__api, {
                    [styles['company_details__api--active']]: company_apis.includes(api.title)
                  })}
                >
                  <Icon />
                  {api.title}
                  {company_apis.includes(api.title) && <span><CheckIcon /></span>}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.company_details__bottom}>
          {isB2B && <div>B2B</div>}
          {isB2C && <div>B2C</div>}
          <StaqIcon />
        </div>
      </div>
    </div>
  );
}
