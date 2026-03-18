'use client';
import Link from 'next/link';

import AccountIcon from '@/ui/icons/account_gradient.svg';
import BankIcon from '@/ui/icons/bank_gradient.svg';
import CardIcon from '@/ui/icons/card_gradient.svg';
import PaymentIcon from '@/ui/icons/payments_gradient.svg';
import LoanIcon from '@/ui/icons/loans_gradient.svg';
import AuthIcon from '@/ui/icons/auth_gradient.svg';
import styles from './ProductGuides.module.scss';

const data = [
  {
    title: 'Identity',
    description: 'Onboard and verify customers',
    icon: AccountIcon,
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Accounts',
    description: 'Create and manage customer accounts',
    icon: BankIcon,
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Cards',
    description: 'Issue prepaid cards for your customers',
    icon: CardIcon,
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Payments',
    description: 'Seamlessly integrate payment solutions',
    icon: PaymentIcon,
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Loans',
    description: 'Drive conversions with integrated credit',
    icon: LoanIcon,
    guideLink: '#',
    apiLink: '#',
  },
  {
    title: 'Authentication',
    description: 'Sensitive document authentication',
    icon: AuthIcon,
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
          const Icon = card.icon;
          return (
            <div key={card.title} className={styles.product_guides__card}>
              <div>
                <Icon />
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
