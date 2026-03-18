'use client';
import Link from 'next/link';

import AccountIcon from '@/ui/icons/account_gradient.svg';
import BankIcon from '@/ui/icons/bank_gradient.svg';
import CardIcon from '@/ui/icons/card_gradient.svg';
import PaymentIcon from '@/ui/icons/payments_gradient.svg';
import LoanIcon from '@/ui/icons/loans_gradient.svg';
import AuthIcon from '@/ui/icons/auth_gradient.svg';
import styles from './PopularGuides.module.scss';

const data = [
  {
    title: 'Quickstart Guide',
    description: 'The quickest way to get up and running with the Staq platform',
    icon: AccountIcon,
    guideLink: '/get-started/create-application',
    apiLink: '#',
  },
  {
    title: 'API Reference Library',
    description: 'Explore server-side API libraries and integrate with API endpoints',
    icon: BankIcon,
    guideLink: '/get-started/create-application',
    apiLink: '#',
  },
  {
    title: 'Create a KYC program ',
    description: 'Onboard and verify customers identities',
    icon: CardIcon,
    guideLink: '/get-started/create-application',
    apiLink: '#',
  },
  {
    title: 'Create a customer account',
    description: 'Onboard and verify customers',
    icon: PaymentIcon,
    guideLink: '/get-started/create-application',
    apiLink: '#',
  }
];

export default function PopularGuides() {
  return (
    <section>
      <h2 className={styles.popular_guides__header}>Popular Guides</h2>
      <div className={styles.popular_guides__cards}>
        {data.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={styles.popular_guides__card}>
              <div>
                <Icon />
              </div>
              <h5 className={styles.popular_guides__title}>{card.title}</h5>
              <div className={styles.popular_guides__description}>{card.description}</div>
              <div className={styles.popular_guides__links}>
                <Link href="/">Read guide</Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
