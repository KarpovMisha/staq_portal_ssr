import { useRouter } from 'next/navigation';

import CertificateIcon from '@/ui/icons/certificates.svg';
import { Button } from '@/ui/elements';
import styles from './CreateFirstCertificate.module.scss';

export default function CreateFirstSandboxCertificate() {
  const router = useRouter();
  return (
    <div>
      <div className={styles.first_certificate__banner}>
        <div className={styles.first_certificate__icon}>
          <CertificateIcon />
        </div>
        <div className={styles.first_certificate__title}>Create your sandbox certificate</div>
        <div className={styles.first_certificate__description}>
          We use client certificates (mTLS) for Sandbox access. You’ll need a Certificate Signing
          Request (CSR).
        </div>
        <div className={styles.first_certificate__button}>
          <Button
            name="Create certificate"
            variant="gradient_primary"
            type="button"
            onClick={() => router.push('/dashboard/certificates/create')}
          />
        </div>
      </div>
    </div>
  );
}
