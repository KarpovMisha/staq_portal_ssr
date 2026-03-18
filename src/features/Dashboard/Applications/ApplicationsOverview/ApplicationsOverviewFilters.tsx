'use client';
import cn from 'classnames';

import { Button } from '@/ui/elements';
import SearchIcon from '@/ui/icons/search.svg';
import SortingIcon from '@/ui/icons/sorting.svg';
import GridIcon from '@/ui/icons/grid_view.svg';
import ListIcon from '@/ui/icons/list_view.svg';
import styles from './ApplicationsOverviewFilters.module.scss';

type AppFiltersProps = {
  callback?: () => void;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  viewMode: 'grid' | 'list';
  toggleSort: () => void;
  sortDir: 'asc' | 'desc' | 'none';
};

export default function ApplicationsOverviewFilters({
  callback,
  setSearchKey,
  setViewMode,
  viewMode,
  toggleSort,
  sortDir
}: AppFiltersProps) {

  return (
    <div className={styles.app_filters}>
      <div className={styles.app_filters__search}>
        <span className={styles.app_filters__search_icon}>
          <SearchIcon />
        </span>
        <input
          onChange={(e) => setSearchKey(e.target.value)}
          className={styles.app_filters__input}
          placeholder="Search"
          // value={serchKey}
          autoFocus
        />
      </div>
      <div className={styles.app_filters__grids}>
        <div
          className={cn([styles['app_filters__sorting']], {
            [styles['app_filters__sorting--asc']]: sortDir === 'asc',
            [styles['app_filters__sorting--desc']]: sortDir === 'desc',
          })}
          onClick={toggleSort}
        >
          <SortingIcon />
        </div>
        <div className={styles.app_filters__toggle}>
          <div
            className={cn(styles.app_filters__view, {
              [styles['app_filters__view--active']]: viewMode === 'grid',
            })}
            onClick={() => setViewMode('grid')}
          >
            <GridIcon />
          </div>
          <div
            className={cn(styles.app_filters__view, {
              [styles['app_filters__view--active']]: viewMode === 'list',
            })}
            onClick={() => setViewMode('list')}
          >
            <ListIcon />
          </div>
        </div>
      </div>
      <div className={styles.app_filters__button}>
        <Button onClick={callback} name="New app +" variant="gradient_primary" type="button" />
      </div>
    </div>
  );
}
