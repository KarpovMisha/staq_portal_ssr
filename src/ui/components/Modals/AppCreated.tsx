import { useRouter } from 'next/navigation';

import { Button, ModalBackdrop } from '@/ui/elements';
import CheckIcon from '@/ui/icons/icon_check.svg';
import styles from './AppCreated.module.scss';

interface IModal {
  closeModal: (v?: object) => any;
}

export default function AppCreated({ closeModal }: IModal) {
  const router = useRouter();
  return (
    <ModalBackdrop onClose={closeModal}>
      <div className={styles.app_created}>
        <div className={styles.app_created__info}>
          <div className={styles.app_created__icon}>
            <CheckIcon />
          </div>
          <div className={styles.app_created__title}>App created successfully</div>
          <div className={styles.app_created__description}>
            Your app is ready, but you'll need a Sandbox certificate before you can start making API
            calls
          </div>
        </div>
        <div className={styles.app_created__btns}>
          <Button
            name="Not now"
            variant="cancel"
            secondaryClassName="popup_secondary"
            type="button"
            onClick={() => {
              router.push('/dashboard/apps');
              closeModal({});
            }}
          />
          <Button
            type="submit"
            variant="gradient_primary"
            onClick={() => {
              router.push('/dashboard/certificates');
              closeModal({});
            }}
          >
            Generate certificate
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
}
