import Link from 'next/link';

import { Icon } from '@/ui/elements';
import styles from './HomeProductGuides.module.scss';

type IconName =
  | 'Account'
  | 'Bank'
  | 'Card'
  | 'Payment'
  | 'Loan'
  | 'Auth'
  | 'Arrow'
  | 'App'
  | 'Certificate'
  | 'Token';

type GuideCard = {
  title: string;
  description: string;
  icon: IconName;
  guideLink: string;
  apiLink: string;
};

const data: GuideCard[] = [
  {
    title: 'Identity',
    description: 'Onboard and verify customers',
    icon: "Account",
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Accounts',
    description: 'Create and manage customer accounts',
    icon: "Bank",
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Cards',
    description: 'Issue prepaid cards for your customers',
    icon: "Card",
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Payments',
    description: 'Seamlessly integrate payment solutions',
    icon: "Payment",
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Loans',
    description: 'Drive conversions with integrated credit',
    icon: "Loan",
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Authentication',
    description: 'Sensitive document authentication',
    icon: "Auth",
    guideLink: '#',
    apiLink: '#',
  },
];

export default function HomeProductGuides() {
  return (
    <section>
      <h2 className={styles.product_guides__header}>Product Guides</h2>
      <div className={styles.product_guides__cards}>
        {data.map((card) => {
          return (
            <div key={card.title} className={styles.product_guides__card}>
              <div>
                <Icon name={card.icon} />
              </div>
              <h5 className={styles.product_guides__title}>{card.title}</h5>
              <div className={styles.product_guides__description}>{card.description}</div>
              <div className={styles.product_guides__links}>
                <Link href="/get-started">Read guide</Link>
                <Link href="/api-references/api-overview">API reference</Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
