import styles from './styles.module.scss';
import { ToastProps } from '@/assets/types/toastProps';

const Toast: React.FC<ToastProps> = ({
  shouldOpenToast,
  shouldCloseToast,
  toastTitle,
  type,
  dark,
  children
}) => {
  const typeStyles = type === 'success' ? styles.sucess : type === 'error' ? styles.error : '';
  const darkStyle = dark ? styles.dark : ''

  const handleRender = () => {
    if (shouldOpenToast) {
      return (
        <div className={`${styles.container} ${typeStyles} ${darkStyle}`}>
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
