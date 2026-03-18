'use client';
import cn from 'classnames';
import Link from 'next/link';

import styles from './HomeResources.module.scss';
import Icon from '@/ui/elements/Icon/Icon';

type GuideCard = {
  title: string;
  description: string;
  link: string;
  icon: "Change" | "Activity";
};

const data: GuideCard[] = [
  {
    title: 'Changelog',
    description: 'Stay up to date with the latest changes to Staq',
    link: '/api-references/api-overview',
    icon: "Change",
  },
  {
    title: 'Systems Operational',
    description: 'Check for incidents and sign up for alerts',
    link: '/api-references/api-overview',
    icon: "Activity",
  },
];
export default function HomeResources() {
  return (
    <section className={styles.resources}>
      <h2>Resources</h2>
      <div className={styles.resources__list}>
        {data.map((item, index) => {
          return (
            <Link className={styles.resources__link} key={index} href={item.link}>
              <div>
                <h5 className={cn([styles['resources__link--title']])}>
                  <Icon name={item.icon} /> {item.title}
                </h5>
                <div className={cn([styles['resources__link--description']])}>{item.description}</div>
              </div>
              <div className={cn([styles['resources__link--arrow']])}>
                <Icon name="ArrowRight" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
