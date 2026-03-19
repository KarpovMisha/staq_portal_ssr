
import { useEffect } from 'react';
import Link from 'next/link';

import SearchIcon from '@/ui/icons/search.svg';
import ApiIcon from '@/ui/icons/dashboard/api_reference.svg';
import SupportIcon from '@/ui/icons/dashboard/support.svg';
import ApiSidebarItem from './ApiSidebarItem';
import { useAppDispatch } from '@/store/hooks';
import { dashboardActions } from '@/store/slices/dashboard';
import styles from './ApiSidebar.module.scss';

export const apisList = [
  {
    groupName: 'Identity & Verification',
    icon: ApiIcon,
    childs: [
      {
        name: 'Identity',
        description: `This API allows to partner's application to manage users and their identity`,
        path: '/api-references/identity',
        hash: '#description/introduction',
        children: [
          {
            name: 'Get certificate',
            description: `Retrieves the public certificate that can be used to validate access tokens`,
            hash: '#api-1/tag/authentication/GET/certificates/{clientId}',
          },
          {
            name: 'Get RSA public key',
            description: `This API allows to partner's application to manage users and their identity`,
            hash: '#api-1/tag/rsa/GET/rsa/key',
          },
        ],
      },
      {
        name: 'KYC',
        description: `API to initiate and manage enrollment process for a new Individual Customers.`,
        path: '/api-references/kyc',
        hash: '#description/introduction',
        children: [
          {
            name: 'Get all KYCs',
            description: 'Retrieves KYCs initiated by the application and associated customers',
            hash: '#api-1/tag/customers/GET/partner/kyc/customers',
          },
          {
            name: 'Create a KYC',
            description: `Creates a new KYC. Payload should application/json. The payload content should be formed according to the metadata descriprion retirned by /meta/steps method.`,
            hash: '#api-1/tag/customers/POST/partner/kyc/customers',
          },
        ],
      },
    ],
  },
  {
    groupName: 'Accounts',
    icon: ApiIcon,
    childs: [
      {
        name: 'Accounts',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/accounts',
        hash: '#description/introduction',
        children: [
          {
            name: 'List all customers',
            description: `Returns all available for the partner customers and their accounts`,
            hash: '#api-1/tag/customers/GET/customers',
          },
          {
            name: 'Create an account',
            description: `Opens a new account for the customer`,
            hash: '#tag/accounts/get/customers/{customerId}/accounts',
          },
        ],
      },
    ],
  },
];

export default function ApiSidebar() {
  const dispatch = useAppDispatch();

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
            <Link href="/api-references/api-overview">API Overview</Link>
          </div>
          <div>
            <Link href="/api-references/authentication">Authentication</Link>
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
