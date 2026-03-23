'use client';
import { useEffect } from 'react';
import Link from 'next/link';

import SearchIcon from '@/ui/icons/search.svg';
import ApiIcon from '@/ui/icons/api_reference.svg';
import SupportIcon from '@/ui/icons/support.svg';
import ApiSidebarItem from './ApiSidebarItem';
import { useAppDispatch } from '@/store/hooks';
import { dashboardActions } from '@/store/slices/dashboard';
import styles from './ApiSidebar.module.scss';
import { useApiReferencesQuery } from '@/hooks/useApiReferencesQuery';
import { ApiVersionSwitcher } from '../ApiVersionSwitcher/ApiVersionSwitcher';


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
      <div className={styles.api_sidebar__links}>
        <div
          className={styles.api_sidebar__search}
          style={{ color: 'white' }}
          onClick={() => dispatch(dashboardActions.setActiveModalDetails({ name: 'api search' }))}
        >
          <SearchIcon />
          <div>Quick search...</div>
          <span>⌘K</span>
        </div>
        <ApiVersionSwitcher />
        <div
          className={styles.api_sidebar__link}
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingInlineStart: '12px',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ color: 'white' }}>Overview</div>
          <div>
            <Link style={{ color: '#A9A9AF'}} href="/api-references/api-overview">API Overview</Link>
          </div>
          <div>
            <Link style={{ color: '#A9A9AF'}}href="/api-references/authentication">Authentication</Link>
          </div>
        </div>
        {apisList?.map((c) => {
          return (
            <div
              className={styles.api_sidebar__link}
              key={c.groupName}
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingInlineStart: '12px',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ color: 'white' }}>{c.groupName}</div>
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
            <ApiIcon />
            <span>Docs</span>
          </div>
        </Link>
        <div className={styles.api_sidebar__bottom_link}>
          <SupportIcon /> <span>Support</span>
        </div>
      </div>
    </div>
  );
}
