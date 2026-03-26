'use client';
import FirstApiDoc from '@/app/docs/get-started/make-first-api-call.mdx';
import { DocsFooter, PrevNextNavigation } from '@/ui/components';

export default function page() {
  return (
    <div className="get-started-content">
      <div className="typography">
        <FirstApiDoc />

        <PrevNextNavigation
          prevSlag={{
            slug: '/get-started/generate-csr-certificate',
            title: 'Generate Certificate',
          }}
          nextSlag={{
            slug: '/api',
            title: 'API  Introduction',
          }}
        />
      </div>
      <DocsFooter />
    </div>
  )
}
