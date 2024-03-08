import styles from './styles.module.scss';
import { ToastProps } from '@/assets/types/toastProps';

const Toast: React.FC<ToastProps> = ({
  shouldOpenToast,
  shouldCloseToast,
  toastTitle,
  children
}) => {
  const handleRender = () => {
    if (shouldOpenToast) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <h4>{toastTitle}</h4>
            <p>{children}</p>
          </div>
          <button onClick={shouldCloseToast}>X</button>
        </div>
      );
    }
  };

  return handleRender();
};

export default Toast;
