export interface ToastProps {
  shouldOpenToast?: boolean;
  shouldCloseToast?: () => void;
  type?: string;
  dark?: boolean;
  toastTitle: string;
  children: string;
}
  