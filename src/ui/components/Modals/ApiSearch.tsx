'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import cn from 'classnames';

// import { apisList } from 'components/ApiSidebar/ApiSidebar';
import GetIcon from '@/ui/icons/dashboard/get.svg';
import PostIcon from '@/ui/icons/dashboard/post.svg';
import SearchIcon from '@/ui/icons/search.svg';

import styles from './ApiSearch.module.scss';
import autocomplete from '@/app/lib/helpers';
import { apisList } from '../ApiSidebar/ApiSidebar';
import { ModalBackdrop } from '@/ui/elements';

interface IModal {
  closeModal: (v?: object) => any;
}

type ApiItem = {
  name: string;
  description?: string;
  path?: string;
  hash?: string;
  children?: ApiItem[];
};

function flattenApis(list: typeof apisList) {
  return list.flatMap((group) =>
    group.childs.flatMap((parent) => {
      const parentItem = {
        name: parent.name,
        description: parent.description,
        path: parent.path,
        hash: parent.hash,
      };

      const childrenItems =
        parent.children?.map((child) => ({
          ...child,
          path: parent.path, // важно: дети наследуют path родителя
        })) ?? [];

      return [parentItem, ...childrenItems];
    })
  );
}

export default function ApiSearch({ closeModal }: IModal) {
  const [searchKey, setKey] = useState<string>('');
  const router = useRouter();

  const navigateTo = useCallback(
    (to: string) => {
      const [path, hash] = to.split('#');
      if (hash) {
        const start = Date.now();
        const interval = window.setInterval(() => {
          const el = document.getElementById(hash) || document.querySelector(`[name="${hash}"]`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            clearInterval(interval);
          }
          if (Date.now() - start > 3000) clearInterval(interval);
        }, 100);
      }
      router.push(path + (hash ? `#${hash}` : ''));
      closeModal?.();
    },
    [router, closeModal]
  );

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const highlight = (text?: string | null) => {
  if (!text) return '';
  if (!searchKey) return text;

  try {
    const re = new RegExp(`(${escapeRegExp(searchKey)})`, 'i'); // без g
    const parts = text.split(new RegExp(`(${escapeRegExp(searchKey)})`, 'ig')); // split нужен с ig

    return parts.map((part, i) =>
      i % 2 === 1 ? ( // совпадения будут на нечетных индексах
        <u key={i} className={styles.api_search__highlight}>
          {part}
        </u>
      ) : (
        part
      )
    );
  } catch {
    return text;
  }
};


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc' || (e as any).keyCode === 27) {
        closeModal?.();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeModal]);

  const flatApis = flattenApis(apisList);
  const filteredApis = autocomplete(flatApis, searchKey, ['name', 'description']);

  return (
    <ModalBackdrop onClose={closeModal}>
      <div
        className={styles.api_search__dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.api_search__search}>
          <span className={styles.api_search__search_icon}>
            <SearchIcon />
          </span>
          <input
            onChange={(e) => setKey(e.target.value)}
            className={styles.api_search__input}
            placeholder="Search"
            value={searchKey}
            autoFocus
          />
        </div>
        <div className={styles.api_search__results}>
          {filteredApis && filteredApis.length === 0 ? (
            <div className={styles.api_search__no_results}>No results found</div>
          ) : (
            filteredApis?.map((sub) => {
              return (
                <button
                  key={`${sub.name}-${sub.name}`}
                  type="button"
                  onClick={() => navigateTo(`${sub.path || ''}${sub.hash || ''}`)}
                  className={styles.api_search__result}
                >
                  <div className={cn([styles['api_search__result--name']])}>
                    {highlight(sub.name)}
                  </div>
                  <div className={cn([styles['api_search__result--details']])}>
                    {sub.hash.toLowerCase().includes('/get/') && (
                      <div>
                        <GetIcon />
                      </div>
                    )}
                    {sub.hash.toLowerCase().includes('/post/') && (
                      <div>
                        <PostIcon />
                      </div>
                    )}
                    <div>{highlight(`${sub.path || ''}${sub.hash || ''}`)}</div>
                  </div>
                  {sub.description && (
                    <div className={cn([styles['api_search__result--description']])}>
                      {highlight(sub.description)}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </ModalBackdrop>
  );
}
