
import cn from 'classnames';

import styles from './PrevNextNavigation.module.scss';
import Link from 'next/link';
import { Icon } from '../../elements';

export default function PrevNextNavigation({
  prevSlag,
  nextSlag,
}: {
  prevSlag?: { slug: string; title: string } | null;
  nextSlag?: { slug: string; title: string } | null;
}) {
  const hasBoth = Boolean(prevSlag && nextSlag);

  return (
    <div
      className={styles.page_navigation}
      style={
        {
          '--page-nav-cols': hasBoth ? '1fr 1fr' : '1fr',
        } as React.CSSProperties
      }
    >
      {prevSlag?.title && (
        <Link
          href={prevSlag.slug}
          className={cn(styles.page_navigation__button, styles['page_navigation__button--prev'])}
        >
          <div><Icon name="ArrowDown" /> Previous</div>
          <span>{prevSlag.title}</span>
        </Link>
      )}
      {nextSlag?.title && (
        <Link
          href={nextSlag.slug}
          className={cn(styles.page_navigation__button, styles['page_navigation__button--next'])}
        >
          <div>Next <Icon name="ArrowDown" /></div>
          <span>{nextSlag.title}</span>
        </Link>
      )}
    </div>
  );
}
