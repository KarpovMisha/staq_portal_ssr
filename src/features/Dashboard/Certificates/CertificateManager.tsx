'use client';
import { useCertificatesQuery } from '@/hooks/useCertificatesQuery';
import CreateFirstSandboxCertificate from './CreateFirstSandboxCertificate/CreateFirstSandboxCertificate';
import SandboxCertificatesTable from './SandboxCertificatesTable/SandboxCertificatesTable';
import { certificatesStrings } from '@/lang/certificate';
import CreateFirstProdCertificate from './CreateFirstSandboxCertificate/CreateFirstProdCertificate';
import styles from './CertificateManager.module.scss';

export default function CertificateManager() {
  const { data: certificates = [] } = useCertificatesQuery();

  return (
    <section className={styles.certificates_manager}>
      <h1>{certificatesStrings.container.title}</h1>
      {!certificates.length && (
        <CreateFirstSandboxCertificate />
      )}

      {!!certificates.length && (
        <SandboxCertificatesTable
          certificates={certificates}
          title="Sandbox certificate"
          description="This certificate is used for testing purposes only."
        />
      )}

      <CreateFirstProdCertificate />
    </section>
  )
}
