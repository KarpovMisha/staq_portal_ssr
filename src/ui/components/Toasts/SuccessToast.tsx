'use client';

import { Button } from "@/ui/elements";
import CloseIcon from "@/ui/icons/close-btn-menu.svg";
import CheckCircle from "@/ui/icons/check_success.svg";
import toast from "./Toasts.module.scss";

type Props = {
  message: string;
  onRetry?: () => void;
  closeToast?: () => void;
};

const SuccessToast = ({ message, closeToast }: Props) => {
  return (
    <div className={toast.toast_success}>
      <CheckCircle />
      <p className={toast.toast_success__text}>{message}</p>
      <div className={toast.toast_success__button}>
        <Button onClick={closeToast} variant="close"><CloseIcon /></Button>
      </div>
    </div>
  );
};

export default SuccessToast;
