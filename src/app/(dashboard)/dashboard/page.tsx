import { ApiGuides, ProductGuides } from '@/features/Common';
import { ApplicationsManager, AuthorizedSetupGuide, DashboardIntro } from '@/features/Dashboard';

export default function page() {
  return (
    <>
      <DashboardIntro/>
      <AuthorizedSetupGuide />
      <ApplicationsManager />
      <ProductGuides />
      <ApiGuides />
    </>
  )
}
