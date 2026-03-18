import { Button, ModalBackdrop } from 'elements/index';
import AlertIcon from 'styles/icon/dashboard/alert-triangle.svg?react';
import styles from './UnsavedChanges.module.scss';
import { callModalCallback } from 'utils/ModalService';

interface IModal {
  closeModal: (v?: object) => any;
}

export default function UnsavedChanges({ closeModal }: IModal) {
  return (
    <ModalBackdrop onClose={closeModal}>
      <div className={styles.unsaved_changes}>
        <div className={styles.unsaved_changes__info}>
          <div className={styles.unsaved_changes__icon}>
            <AlertIcon />
          </div>
          <div className={styles.unsaved_changes__title}>Unsaved changes</div>
          <div className={styles.unsaved_changes__description}>
            You have unsaved changes. If you leave now, your changes will be lost.
          </div>
        </div>
        <div className={styles.unsaved_changes__btns}>
          <Button
            name="Discard changes"
            variant="cancel"
            secondaryClassName="popup_secondary"
            type="button"
            onClick={() => callModalCallback('unsaved changes', 'discard')}
          />
          <Button
            type="submit"
            variant="gradient_primary"
            onClick={() => callModalCallback('unsaved changes', 'save')}
          >
            Save changes
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
}
