import ApiIcon from '@/ui/icons/api_reference.svg';
import { apiClient } from "@/auth/api-client";

// export type ApiReferencesResponse = {
//   data: {
//     availability: string;
//     id: string;
//     types: string[];
//     defaultVersion: string;
//     versions: {
//       urlSpecification: string;
//       version: number;
//     }[];
//   };
// };

export type ApiVersion = {
  version: number;
  urlSpecification: string;
};

export type ApiChild = {
  name: string;
  description: string;
  path: string;
  hash?: string;
  defaultVersion: number;
  versions: ApiVersion[];
  children?: {
      name: string;
      description?: string;
      hash?: string;
    }[];
};

export type ApiReferencesResponse = {
  groupName: string;
  icon: React.ComponentType | string;
  childs: ApiChild[];
}

export function getApiReferences() {
  return apisList;
  // return apiClient<ApiReferencesResponse>('/api/v1/scope/information');
}


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
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/tppa/open-api/api-docs.yaml',
          }
        ],
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
        defaultVersion: 2,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/kyc/open-api/api-docs.yaml',
          },
          {
            version: 2,
            urlSpecification: 'https://qa-api.staq.tech/api/v2/partner/kyc/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'Verification',
        description: `API to initiate and manage enrollment process for a new Individual Customers.`,
        path: '/api-references/verification',
        hash: '#description/introduction',
        defaultVersion: 2,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/kyc/open-api/api-docs.yaml',
          },
          {
            version: 2,
            urlSpecification: 'https://qa-api.staq.tech/api/v2/partner/kyc/open-api/api-docs.yaml',
          }
        ],
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
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'Virtual IBAN',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/accounts',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
  {
    groupName: 'Payments',
    icon: ApiIcon,
    childs: [
      {
        name: 'Transfers',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/payments',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'Remittances',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/payments',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'CliQ Payments',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/payments',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
  {
    groupName: 'Cards & Disputes',
    icon: ApiIcon,
    childs: [
      {
        name: 'Cards',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/disputes',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'Disputes',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/disputes',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
  {
    groupName: 'Lending',
    icon: ApiIcon,
    childs: [
      {
        name: 'BNPL',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/lending',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'Loans',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/lending',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'Scoring',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/lending',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
  {
    groupName: 'Developer tools',
    icon: ApiIcon,
    childs: [
      {
        name: 'Data',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/tools',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'Events',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/tools',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
      {
        name: 'Dictionaries',
        description: `API allows managing Bank accounts for a third-party partner application`,
        path: '/api-references/tools',
        hash: '#description/introduction',
        defaultVersion: 1,
        versions: [
          {
            version: 1,
            urlSpecification: 'https://qa-api.staq.tech/api/v1/partner/accounts/open-api/api-docs.yaml',
          }
        ],
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
