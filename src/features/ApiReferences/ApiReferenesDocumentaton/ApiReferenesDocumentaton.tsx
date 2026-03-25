'use client';
import { useEffect, useMemo } from 'react';
import { useApiReferencesQuery } from '@/hooks/useApiReferencesQuery';
import { usePathname } from 'next/navigation';
import { ApiReferencesResponse } from '@/services/apiReferences';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { apiReferencesActions, selectCurrentUrlSpecification } from '@/store/slices/apiReferences';
import { selectIsDarkMode } from '@/store/slices/switcher';

export default function ApiReferenesDocumentaton() {
  const { data: apisList = [] } = useApiReferencesQuery();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const currentUrlSpecification = useAppSelector(selectCurrentUrlSpecification);
  const isSwitcherOpen = useAppSelector(selectIsDarkMode);

  const currentApi = useMemo(() => {
    return (apisList as ApiReferencesResponse[])
      .flatMap((group) => group.childs)
      .find((child) => child.path === pathname) ?? null;
  }, [apisList, pathname]);

 useEffect(() => {
    dispatch(apiReferencesActions.setCurrentApi(currentApi));
  }, [currentApi, dispatch]);

  // useEffect(() => {
  //   const body = document.body;

  //   // синхронизируем body с твоей темой
  //   body.classList.remove('dark-mode');
  //   body.classList.remove('light-mode');

  //   return () => {
  //     // при уходе со страницы всегда чистим
  //     body.classList.remove('dark-mode');
  //     body.classList.remove('light-mode');
  //   };
  // }, [isSwitcherOpen]);

  if (!currentUrlSpecification) return null;

  return (
    <div key={currentUrlSpecification + `${isSwitcherOpen ? '-dark' : '-light'}`}>
      <ApiReferenceReact
        configuration={{
          showSidebar: false,
          defaultOpenAllTags: true,
          hideDarkModeToggle: true,
          forceDarkModeState: isSwitcherOpen ? 'dark' : 'light',
          url: currentUrlSpecification,
        }}
      />
    </div>
  );
}
