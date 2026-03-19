import { useRouter } from 'next/navigation';

import { Button, ModalBackdrop } from '@/ui/elements';
import CheckIcon from '@/ui/icons/icon_check.svg';
import styles from './CertificateCreated.module.scss';

interface IModal {
  closeModal: (v?: object) => any;
}

export default function CertificateCreated({ closeModal }: IModal) {
  const router = useRouter();
  return (
    <ModalBackdrop onClose={closeModal}>
      <div className={styles.certificate_created}>
        <div className={styles.certificate_created__info}>
          <div className={styles.certificate_created__icon}>
            <CheckIcon />
          </div>
          <div className={styles.certificate_created__title}>Certificate downloaded</div>
          <div className={styles.certificate_created__description}>
            Now you've got your app and signed certificate you can make your first API call and get
            started with the sandbox.
          </div>
        </div>
        <div className={styles.certificate_created__btns}>
          <Button
            name="Not now"
            variant="cancel"
            secondaryClassName="popup_secondary"
            type="submit"
            onClick={() => {
              router.push('/dashboard/certificates');
              closeModal({});
            }}
          />
          <Button
            type="submit"
            variant="gradient_primary"
            onClick={() => {
              router.push('/');
              closeModal({});
            }}
          >
            Make first API call
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
}
