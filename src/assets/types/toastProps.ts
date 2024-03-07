export interface ToastProps {
  shouldOpenToast?: boolean;
  shouldCloseToast?: () => void;
  toastTitle: string;
  children: string;
}
  