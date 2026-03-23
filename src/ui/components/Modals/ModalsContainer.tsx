
'use client';
import { dashboardActions, modalState } from '@/store/slices/dashboard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ApiSearch from './ApiSearch';
import AppCreated from './AppCreated';
import DashboardSetup from './DashboardSetup';
import CertificateCreated from './CertificateCreated';
import UnsavedChanges from './UnsavedChanges';
import DocsSearch from './DocsSearch';
import RevokeCSR from './RevokeCSR';

function ModalsContainer() {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(modalState);

  function renderModal() {
    switch (activeModal.name) {
      case 'dashboard setup':
        return <DashboardSetup />;
      case 'app created':
        return 'AppCreated';
        // return (
        //   <AppCreated
        //     closeModal={() => dispatch(dashboardActions.setActiveModalDetails({ name: '' }))}
        //   />
        // );
      case 'certificate created':
        return 'CertificateCreated';
        // return (
        //   <CertificateCreated
        //     closeModal={() => dispatch(dashboardActions.setActiveModalDetails({ name: '' }))}
        //   />
        // );
      case 'api search':
        return (
          <ApiSearch
            closeModal={() => dispatch(dashboardActions.setActiveModalDetails({ name: '' }))}
          />
        );
      case 'unsaved changes':
        return 'UnsavedChanges';
        // return (
        //   <UnsavedChanges
        //     closeModal={() => dispatch(dashboardActions.setActiveModalDetails({ name: '' }))}
        //   />
        // );
      case 'docs search':
        return (
          <DocsSearch
            closeModal={() => dispatch(dashboardActions.setActiveModalDetails({ name: '' }))}
          />
        );
      case 'revoke CSR file':
        return (
          <RevokeCSR
            data={activeModal}
            closeModal={() => dispatch(dashboardActions.setActiveModalDetails({ name: '' }))}
          />
        );
      default:
        return null;
    }
  }

  return renderModal();
}

export default ModalsContainer;
