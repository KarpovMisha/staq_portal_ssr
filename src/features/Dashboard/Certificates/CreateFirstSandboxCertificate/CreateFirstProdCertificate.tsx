import { useRouter } from 'next/navigation';

import CertificateIcon from '@/ui/icons/certificates.svg';
import { Button } from '@/ui/elements';
import styles from './CreateFirstCertificate.module.scss';

export default function CreateFirstProdCertificate() {
  const router = useRouter();
  return (
    <div>
      <div className={styles.first_certificate__header}>Production certificate</div>
      <div className={styles.first_certificate__desc}>This certificate is used for production environments. </div>
      <div className={styles.first_certificate__banner}>
        <div className={styles.first_certificate__icon}>
          <CertificateIcon />
        </div>
        <div className={styles.first_certificate__title}>Get your production certificate</div>
        <div className={styles.first_certificate__description}>
          We use client certificates (mTLS) for Sandbox access. You’ll need a Certificate Signing
          Request (CSR).
        </div>
        <div className={styles.first_certificate__button}>
          <Button
            name="Get production access"
            variant="gradient_primary"
            type="button"
            onClick={() => router.push('/dashboard/certificates/production-access')}
          />
        </div>
      </div>
    </div>
  );
}
