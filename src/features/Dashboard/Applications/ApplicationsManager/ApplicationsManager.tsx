'use client';
import { useRouter } from 'next/navigation';

import { useApplicationsQuery } from '@/hooks/useApplicationQuery';
import CreateFirstApplication from '../CreateFirstApplication/CreateFirstApplication';
import ApplicationsOverview from '../ApplicationsOverview/ApplicationsOverview';


export default function ApplicationsManager() {
  // const appList = useAppSelector(list) || [];
  const { data: appList = [] } = useApplicationsQuery();
  const router = useRouter();

  return (
    <section>
      {!appList.length && (
        <CreateFirstApplication
          callback={() => {
            router.push('/dashboard/apps/create');
          }}
        />
      )}
      {!!appList.length && (
        <ApplicationsOverview
          apps={appList}
          callback={() => {
            router.push('/dashboard/apps/create');
          }}
        />
      )}
    </section>
  );
}
