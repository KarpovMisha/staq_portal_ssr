'use client';

import { toast, type ToastOptions } from 'react-toastify';
import ErrorToast from './ErrorToast';
import SuccessToast from './SuccessToast';
import toastStyle from './Toasts.module.scss';

export const showError = (
  message = '',
  options: ToastOptions & { onRetry?: () => void } = {
    autoClose: 5000,
    position: 'bottom-center',
    onRetry: undefined,
  },
) =>
  toast(<ErrorToast message={message} onRetry={options?.onRetry} />, {
    className: toastStyle['custom-error-toast'],
    hideProgressBar: true,
    ...options,
  });

export const showSuccess = (
  message = '',
  options: ToastOptions = { autoClose: 3000, position: 'bottom-center' },
) =>
  toast(<SuccessToast message={message} />, {
    className: toastStyle['custom-light-mode-toast'],
    hideProgressBar: true,
    ...options,
  });
