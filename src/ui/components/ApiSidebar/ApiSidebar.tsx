'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { useApiReferencesQuery } from '@/hooks/useApiReferencesQuery';
import { dashboardActions } from '@/store/slices/dashboard';
import { useAppDispatch } from '@/store/hooks';
import SearchIcon from '@/ui/icons/search.svg';
import ApiIcon from '@/ui/icons/api_reference.svg';
import DocsIcon from '@/ui/icons/docs.svg';
import { ApiVersionSwitcher } from '../ApiVersionSwitcher/ApiVersionSwitcher';
import ApiSidebarItem from './ApiSidebarItem';
import styles from './ApiSidebar.module.scss';


export default function ApiSidebar() {
  const dispatch = useAppDispatch();
  const { data: apisList } = useApiReferencesQuery();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dispatch(dashboardActions.setActiveModalDetails({ name: 'api search' }));
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dispatch]);

  return (
    <div className={styles.api_sidebar}>
      <div className={styles.api_sidebar__container}>
        <div
          className={styles.api_sidebar__search}
          onClick={() => dispatch(dashboardActions.setActiveModalDetails({ name: 'api search' }))}
        >
          <SearchIcon />
          <div>Quick search...</div>
          <span>⌘K</span>
        </div>
        <ApiVersionSwitcher />
        <div className={styles.api_sidebar__section}>
          <div className={cn(styles['api_sidebar__section--title'])}><ApiIcon /> Overview</div>
          <div className={cn(styles['api_sidebar__section--doc'])}>
            <Link href="/api-references/api-overview">API Overview</Link>
          </div>
          <div className={cn(styles['api_sidebar__section--doc'])}>
            <Link href="/api-references/authentication">Authentication</Link>
          </div>
          <div className={cn(styles['api_sidebar__section--doc'])}>
            <Link href="/api-references/api-structure">API structure & conventions</Link>
          </div>
          <div className={cn(styles['api_sidebar__section--doc'])}>
            <Link href="/api-references/environment">Environment</Link>
          </div>
          <div className={cn(styles['api_sidebar__section--doc'])}>
            <Link href="/api-references/rate-limits">Rate limits & pagination</Link>
          </div>
          <div className={cn(styles['api_sidebar__section--doc'])}>
            <Link href="/api-references/errors">Errors & responses</Link>
          </div>
          <div className={cn(styles['api_sidebar__section--doc'])}>
            <Link href="/api-references/postman-collection">Postman collection</Link>
          </div>
          <div className={cn(styles['api_sidebar__section--doc'])}>
            <Link href="/api-references/webhooks">Webhooks</Link>
          </div>
        </div>

        {apisList?.map((c) => {
          const Icon = c.icon;
          return (
            <div
              className={styles.api_sidebar__section}
              key={c.groupName}
            >
              <div className={cn(styles['api_sidebar__section--title'])}><Icon />{c.groupName}</div>
              <div style={{ width: '100%' }}>
                {c.childs?.map((child) => <ApiSidebarItem key={child.name} item={child} />)}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.api_sidebar__actions}>
        <Link href="/">
          <div className={styles.api_sidebar__bottom_link}>
            <DocsIcon />
            <span>Docs</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
