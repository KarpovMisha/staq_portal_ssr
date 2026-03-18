'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import { ModalBackdrop } from '../../elements';

import SearchIcon from '@/ui/icons/search.svg';
import styles from './DocsSearch.module.scss';
import docs from "@/app/search/docsIndex.generated.json";
import autocomplete from '@/app/lib/helpers';

export default function DocsSearch({ closeModal }: { closeModal: () => void }) {
  const [searchKey, setSearchKey] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const results = useMemo(() => autocomplete(docs, searchKey, 'text'), [searchKey]);

  return (
    <ModalBackdrop onClose={closeModal}>
      <div
        className={styles.docs_search__dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.docs_search__search}>
          <span className={styles.docs_search__search_icon}>
            <SearchIcon />
          </span>
          <input
            className={styles.docs_search__input}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            autoFocus
          />
        </div>
        <div className={styles.docs_search__results}>
          {results.length === 0 && searchKey === '' && (
            <div className={styles.docs_search__no_results}>Type to search</div>
          )}
          {results.length === 0 && searchKey !== '' && (
            <div className={styles.docs_search__no_results}>No results found</div>
          )}
          {results.map((r, index) => (
            <button
              key={index}
              onClick={() => {
                closeModal();

                // normalize route to absolute path
                const targetPath = r.route && r.route.startsWith('/') ? r.route : `/${r.route}`;
                const targetHash = `#${r.sectionId}`;

                // if already on the same page, just scroll to the section
                if (pathname === targetPath) {
                  const el = document.getElementById(r.sectionId);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                  }

                  // if element not found, force hash change to trigger any hash listeners
                  if (window.location.hash === targetHash) {
                    // clear then set to force a change
                    window.location.hash = '';
                  }
                  window.location.hash = r.sectionId;
                  return;
                }

                // otherwise navigate to page + hash
                router.push(`${targetPath}${targetHash}`);
              }}
              className={styles.docs_search__result}
            >
              <div className={cn([styles['docs_search__result--name']])}>{r.sectionTitle}</div>
              <div className={cn([styles['docs_search__result--details']])}>
                <div>Page: {r.route}</div>
              </div>
              <div className={cn([styles['docs_search__result--description']])}>
                Section: {r.sectionTitle}
              </div>
            </button>
          ))}
        </div>
      </div>
    </ModalBackdrop>
  );
}
