'use client';
import React, { useEffect } from 'react';
import styles from './ModalBackdrop.module.scss';

type ModalBackdropProps = {
  onClose?: () => void;
  children: React.ReactNode;
};

export default function ModalBackdrop({ onClose, children }: ModalBackdropProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'Esc' || (e as any).keyCode === 27) {
        onClose?.();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={() => onClose?.()}>
      <div className={styles.backdrop__container}>
        <div className={styles.backdrop__body} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}
