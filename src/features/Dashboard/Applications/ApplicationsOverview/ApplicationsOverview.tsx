'use client';
import { useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import cn from 'classnames';

import { Button } from '@/ui/elements';
import { ActionsDropdown } from '@/ui/components';

import CalendarIcon from '@/ui/icons/calendar.svg';
import DotsIcon from '@/ui/icons/three_dots.svg';
import StaqIcon from '@/ui/icons/staq_app_logo.svg';
import FavouriteIcon from '@/ui/icons/favourite.svg';
import ScopeIcon from '@/ui/icons/account.svg';
import styles from './ApplicationsOverview.module.scss';
import ApplicationsOverviewFilters from './ApplicationsOverviewFilters';
import autocomplete from '@/app/lib/helpers';

type AppProps = {
  apps: {
    id?: string;
    appId?: string;
    name?: string;
    scopes?: string[];
    description?: string;
    createdDate?: string;
    favourite?: boolean;
  }[];
  callback?: () => void;
};

export default function ApplicationsOverview({ apps, callback }: AppProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | 'none'>('none');
  const [searchKey, setSearchKey] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const toggleSort = () => {
    setSortDir((prev) => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  };

  const results = useMemo(() => autocomplete(apps, searchKey, 'name'), [searchKey]);

  const sortedItems = useMemo(() => {
    if (sortDir === 'none') return results;

    return [...results].sort((a, b) => {
      return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  }, [results, sortDir]);

  return (
    <div className={styles.applications_overview}>
      <h2 className={styles.applications_overview__header}>Applications</h2>
      {pathname !== '/dashboard' && (
        <ApplicationsOverviewFilters
          callback={callback}
          setSearchKey={setSearchKey}
          setViewMode={setViewMode}
          viewMode={viewMode}
          toggleSort={toggleSort}
          sortDir={sortDir}
        />
      )}
      {viewMode === 'grid' && (
        <div className={styles.applications_overview__grid}>
          {sortedItems?.map((app) => (
            <div
              key={app.appId}
              className={styles.applications_overview__item}
              onClick={() => {
                router.push(`/dashboard/apps/${app.id}/keys`);
              }}
            >
              <div className={styles.applications_overview__app_header}>
                <StaqIcon />
                <ActionsDropdown
                  trigger={
                    <div className={styles.applications_overview__trigger}>
                      <DotsIcon />
                    </div>
                  }
                  content={
                    <div className={styles.applications_overview__dropdown}>
                      <div>
                        Favourite <FavouriteIcon />
                      </div>
                      <div
                        onClick={(e) => {
                          router.push(`/dashboard/apps/${app.id}/keys`);
                        }}
                      >
                        App Keys
                      </div>
                      <div
                        onClick={() => {
                          router.push(`/dashboard/apps/${app.id}/settings`);
                        }}
                      >
                        Settings
                      </div>
                      <div>Delete app</div>
                    </div>
                  }
                />
              </div>
              <div className={styles.applications_overview__item_title}>{app.name}</div>
              {/* <div className={styles.applications_overview__item_description}>{app.description}</div> */}
              <div className={styles.applications_overview__item_scopes}>
                <div className={cn([styles['applications_overview__item_scopes--item']])}>
                  <ScopeIcon />
                </div>
                <div className={cn([styles['applications_overview__item_scopes--item']])}>
                  <ScopeIcon />
                </div>
                <div className={cn([styles['applications_overview__item_scopes--item']])}>
                  <ScopeIcon />
                </div>
              </div>
              <div className={styles.applications_overview__item_date}>
                <CalendarIcon /> Created on {new Date(app.createdDate).toLocaleDateString()}
              </div>
            </div>
          ))}
          <div className={styles.applications_overview__new_item}>
            <div className={cn([styles['applications_overview__new_item--wrapper']])}>
              <div className={cn([styles['applications_overview__new_item--logo']])}>
                <StaqIcon />
              </div>
              <div className={cn([styles['applications_overview__new_item--title']])}>
                New Application
              </div>
            </div>
            <Button variant="cancel" type="button" onClick={callback}>
              Create application
            </Button>
          </div>
        </div>
      )}
      {viewMode === 'list' && (
        <div className={styles.applications_overview__list}>
          {sortedItems?.map((app) => (
            <div
              key={app.appId}
              className={cn([styles['applications_overview__list--item']])}
              onClick={() => {
                router.push(`/dashboard/apps/${app.id}/keys`);
              }}
            >
              <div className={cn([styles['applications_overview__list--name']])}>{app.name}</div>
              <div className={styles.applications_overview__item_scopes}>
                <div
                  className={cn(
                    [styles['applications_overview__item_scopes--item']],
                    [styles['applications_overview__item_scopes--list-view']]
                  )}
                >
                  <ScopeIcon />
                </div>
                <div
                  className={cn(
                    [styles['applications_overview__item_scopes--item']],
                    [styles['applications_overview__item_scopes--list-view']]
                  )}
                >
                  <ScopeIcon />
                </div>
                <div
                  className={cn(
                    [styles['applications_overview__item_scopes--item']],
                    [styles['applications_overview__item_scopes--list-view']]
                  )}
                >
                  <ScopeIcon />
                </div>
              </div>
              <div>
                <CalendarIcon /> Created on {new Date(app.createdDate).toLocaleDateString()}
              </div>
              <div className={cn([styles['applications_overview__list--menu']])}>
                <ActionsDropdown
                  trigger={
                    <div className={styles.applications_overview__trigger}>
                      <DotsIcon />
                    </div>
                  }
                  content={
                    <div className={styles.applications_overview__dropdown}>
                      <div>
                        Favourite <FavouriteIcon />
                      </div>
                      <div
                        onClick={(e) => {
                          router.push(`/dashboard/apps/${app.id}/keys`);
                        }}
                      >
                        App Keys
                      </div>
                      <div
                        onClick={() => {
                          router.push(`/dashboard/apps/${app.id}/settings`);
                        }}
                      >
                        Settings
                      </div>
                      <div>Delete app</div>
                    </div>
                  }
                />
              </div>
            </div>
          ))}
          <div className={cn([styles['applications_overview__list--last']])} onClick={callback}>
            Create application
          </div>
        </div>
      )}
    </div>
  );
}
