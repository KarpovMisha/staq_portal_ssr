'use client';
import AuthDoc from '@/app/docs/get-started/create-application.mdx';
import { DocsFooter, PrevNextNavigation } from '@/ui/components';

export default function page() {
  return (
    <div className="get-started-content">
      <div className="typography">
        <AuthDoc />
        <PrevNextNavigation
            prevSlag={{ slug: '/', title: 'Documentation Home' }}
            nextSlag={{
              slug: '/get-started/generate-csr-certificate',
              title: 'Generate CSR certificate',
            }}
          />
      </div>
      <DocsFooter />
    </div>
  )
}
