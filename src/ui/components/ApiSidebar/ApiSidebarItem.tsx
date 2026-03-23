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
      return <a style={{ color: '#A9A9AF'}} href={hash}>{name}</a>;
    }
    return <Link style={{ color: '#A9A9AF'}} href={`${path}${hash ?? ''}`}>{name}</Link>;
  }

  return (
    <div className={styles.api_group}>
      <div
        className={cn(styles.api_group__name, {
          [styles['api_group__name--open']]: isSamePage,
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
            <div
              key={api.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                alignItems: 'center',
              }}
            >
              <div>
                {isGet && <GetIcon />}
                {isPost && <PostIcon />}
              </div>
              <a href={api.hash}>{api.name}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
