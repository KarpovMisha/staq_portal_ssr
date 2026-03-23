'use client';
import { usePathname } from 'next/navigation';
import HomeSidebar from './HomeSidebar/HomeSidebar';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import ProdCertificateSidebar from './ProdCertificateSidebar/ProdCertificateSidebar';
import ApiSidebar from '../ApiSidebar/ApiSidebar';


export default function Sidebar() {
  const pathname = usePathname();
  const isApiReferencePage = pathname.startsWith('/api-references');
  const isHomePages = !pathname.startsWith('/dashboard') && !isApiReferencePage;
  const isProductionCertificatePage = pathname.startsWith(
    '/dashboard/certificates/business-information',
  );;
  const isDashboardPages = pathname.startsWith(
    '/dashboard',
  ) && !isProductionCertificatePage;

  if (isHomePages) {
    return <HomeSidebar />
  }

  if (isApiReferencePage) {
    return <ApiSidebar />;
  }

  if (isDashboardPages) {
    return <DashboardSidebar />;
  }

  if (isProductionCertificatePage) {
    return <ProdCertificateSidebar />
  }
  return null;
}
