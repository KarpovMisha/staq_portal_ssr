import {
  HomeIntro,
  HomeProductGuides,
  HomeResources,
  HomeSetupGuide,
  PopularGuides,
} from '@/features/Home';
import { PageContainer } from '@/ui/elements';
import { ApiGuides } from '@/ui/components';

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
