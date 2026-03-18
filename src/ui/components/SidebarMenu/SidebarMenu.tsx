'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import React, { useState, SVGProps, FC } from 'react';
import ArrowDownIcon from '@/ui/icons/downArrow.svg';
import { useIsLinkActive } from '../../../hooks/useIsLinkActive';
import styles from './SidebarMenu.module.scss';

interface SubLink {
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: React.ReactNode;
  path: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  children?: SubLink[];
}

interface SidebarMenuProps {
  items: MenuItem[];
}

export default function SidebarMenu({ items }: SidebarMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (item: MenuItem) => {
    if (openItem === item.id) {
      router.push(item.path);
    } else {
      setOpenItem(item.id);
      router.push(item.path);
    }
  };

  return (
    <nav className={styles.sidebar_menu}>
      {items.map((item) => {
        const isOpen = useIsLinkActive(item.path, { exact: false });
        const Icon = item.icon;
        return (
          <div key={item.id} className={styles.sidebar_menu__menuItem}>
            <button
              onClick={() => handleToggle(item)}
              className={cn(styles.sidebar_menu__trigger, {
                [styles.open]: isOpen,
              })}
            >
              <div>
                {Icon && <Icon />}
                <span>{item.label}</span>
              </div>
              <ArrowDownIcon />
            </button>

            {item.children && (
              <div
                className={cn(styles.sidebar_menu__submenu, {
                  [styles.expanded]: isOpen,
                })}
              >
                {item.children.map((sub) => {
                  return (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      className={cn(styles.sidebar_menu__link, {
                        [styles.active]: useIsLinkActive(sub.path),
                      })}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
