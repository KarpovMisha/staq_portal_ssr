import type { Metadata } from 'next';

import { getMetadataByKey } from '@/app/lib/seo/getMetadataByKey';
import {
  HomeIntro,
  HomeProductGuides,
  HomeResources,
  HomeSetupGuide,
  PopularGuides,
} from '@/features/Home';
import { PageContainer } from '@/ui/elements';
import { ApiGuides } from '@/ui/components';

export const metadata: Metadata = getMetadataByKey('home');
const Home = () => {
  return (
    <PageContainer>
      <HomeIntro />
      <HomeSetupGuide />
      <HomeProductGuides />
      <PopularGuides />
      <ApiGuides />
      <HomeResources />
    </PageContainer>
  );
};

export default Home;
