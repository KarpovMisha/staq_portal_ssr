import { useNavigate } from 'react-router';

import { Button, ModalBackdrop } from 'elements/index';
import CheckIcon from 'styles/icon/icon_check.svg?react';
import styles from './CertificateCreated.module.scss';

interface IModal {
  closeModal: (v?: object) => any;
}

export default function CertificateCreated({ closeModal }: IModal) {
  const navigate = useNavigate();
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
              navigate('/dashboard/certificates');
              closeModal({});
            }}
          />
          <Button
            type="submit"
            variant="gradient_primary"
            onClick={() => {
              navigate('/');
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
