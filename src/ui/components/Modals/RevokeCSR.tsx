import { useRevokeCertificateMutation } from '@/hooks/useCertificatesQuery';
import { showError, showSuccess } from '../Toasts/Toast';
import { certificatesStrings } from '@/lang/certificate';
import { Button, ModalBackdrop } from '@/ui/elements';
import AlertIcon from '@/ui/icons/alert-triangle.svg';
import styles from './RevokeCSR.module.scss';
import { sharedStrings } from '@/lang/shared';

interface IModal {
  closeModal: (v?: object) => any;
  data: Record<string, any>;
}

export default function RevokeCSR({ closeModal, data }: IModal) {
  const { mutateAsync: revokeCertificate } = useRevokeCertificateMutation();

  async function revokeFile() {
    try {
      await revokeCertificate(data.certId);
      showSuccess(certificatesStrings.toasts.successRevoke);
    } catch (error) {
      showError(certificatesStrings.toasts.revokingException);
    } finally {
      closeModal({});
    }
  }

  return (
    <ModalBackdrop onClose={closeModal}>
      <div className={styles.revoke_csr}>
        <div className={styles.revoke_csr__info}>
          <div className={styles.revoke_csr__icon}>
            <AlertIcon />
          </div>
          <div className={styles.revoke_csr__title}>
            {certificatesStrings.modal.title}
          </div>
          <div className={styles.revoke_csr__description}>
            {certificatesStrings.modal.description(data.certCreationDate)}
          </div>
        </div>
        <div className={styles.revoke_csr__btns}>
          <Button name={sharedStrings.buttons.cancel} type="button" onClick={closeModal} />
          <Button name={sharedStrings.buttons.revoke} type="submit" onClick={revokeFile} />
        </div>
      </div>
    </ModalBackdrop>
  );
}
