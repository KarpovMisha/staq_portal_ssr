import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import GetIcon from '@/ui/icons/get.svg';
import PostIcon from '@/ui/icons/post.svg';
import ArrowDownIcon from '@/ui/icons/downArrow.svg';
import styles from './ApiSidebarItem.module.scss';

type ApiSidebarItemProps = {
  item: {
    path: string;
    hash?: string;
    name: string;
    children?: { name: string; hash: string }[];
  };
};

export default function ApiSidebarItem({ item }: ApiSidebarItemProps) {
  const { path, hash, name } = item;

  const pathname = usePathname();
  const isSamePage = location.pathname === item.path;

  function ApiNavItem() {
    if (isSamePage && hash) {
      return <a href={hash}>{name}</a>;
    }
    return <Link href={`${path}${hash ?? ''}`}>{name}</Link>;
  }

  return (
    <div className={styles.api_group}>
      <div
        className={cn(styles.api_group__doc, {
          [styles['api_group__doc--open']]: isSamePage,
        })}
      >
        <ApiNavItem />
        <ArrowDownIcon />
      </div>
      <div
        className={cn(styles.api_group__children, {
          [styles['api_group__children--open']]: isSamePage,
        })}
      >
        {item.children?.map((api) => {
          const isGet = api.hash.toLowerCase().includes('/get/');
          const isPost = api.hash.toLowerCase().includes('/post/');
          return (
            <a key={api.name} href={api.hash}>
              <span>
                {isGet && <GetIcon />}
                {isPost && <PostIcon />}
              </span>
              {api.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
