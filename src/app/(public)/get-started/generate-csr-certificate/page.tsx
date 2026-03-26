'use client';

import CertificateDoc from '@/app/docs/get-started/generate-csr-certificate.mdx';
import { DocsFooter, PrevNextNavigation } from '@/ui/components';

export default function GenerateCSR() {
  return (
    <div className="get-started-content">
      <div className="typography">
        <CertificateDoc />
        <PrevNextNavigation
          prevSlag={{ slug: '/get-started/create-application', title: 'Create application' }}
          nextSlag={{
            slug: '/get-started/make-first-api-call',
            title: 'Make your first API call',
          }}
        />
      </div>
      <DocsFooter />
    </div>
  );
}
