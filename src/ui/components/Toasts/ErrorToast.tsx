'use client';

import WarningIcon from '@/ui/icons/warning.svg';

import toast from './Toasts.module.scss';
import { Button } from '../../elements';

type Props = {
  message: string;
  onRetry?: () => void;
  closeToast?: () => void;
};

const ErrorToast = ({ message, closeToast, onRetry }: Props) => (
  <div className={toast.toast_error}>
    <WarningIcon />
    <p className={toast.toast__text}>{message}</p>
    <div className={toast.toast__button}>
      <Button name="Dismiss" onClick={closeToast} variant="close" />
    </div>
    {onRetry && (
      <div className={toast.toast_error__retry_button}>
        <Button name="Try again" onClick={onRetry} />
      </div>
    )}
  </div>
);

export default ErrorToast;
