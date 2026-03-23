'use client';
import { useEffect, useMemo } from 'react';
import { useApiReferencesQuery } from '@/hooks/useApiReferencesQuery';
import { usePathname } from 'next/navigation';
import { ApiReferencesResponse } from '@/services/apiReferences';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { apiReferencesActions, selectCurrentUrlSpecification } from '@/store/slices/apiReferences';

export default function ApiReferenesDocumentaton() {
  const { data: apisList = [] } = useApiReferencesQuery();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const currentUrlSpecification = useAppSelector(selectCurrentUrlSpecification);

  const currentApi = useMemo(() => {
    return (apisList as ApiReferencesResponse[])
      .flatMap((group) => group.childs)
      .find((child) => child.path === pathname) ?? null;
  }, [apisList, pathname]);

 useEffect(() => {
    dispatch(apiReferencesActions.setCurrentApi(currentApi));
  }, [currentApi, dispatch]);

  if (!currentUrlSpecification) return null;

  return (
    <div key={currentUrlSpecification}>
      <ApiReferenceReact
        configuration={{
          showSidebar: false,
          defaultOpenAllTags: true,
          hideDarkModeToggle: true,
          url: currentUrlSpecification
        }}
      />
    </div>
  );
}
