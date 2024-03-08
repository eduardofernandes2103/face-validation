import { InputProps } from '@/assets/types/inputProps';
import styles from './styles.module.scss';
import InputMask from 'react-input-mask';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const Input: React.FC<InputProps> = ({
  register,
  label,
  placeholder,
  name,
  error,
  mask,
  type,
  maskPlaceholder,
  alwaysShowMask,
  value
}) => {
  const [showPassword, setShowPassword] = useState<boolean>();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={
        error ? `${styles.container} ${styles.error}` : styles.container
      }
    >
      <label className={error ? styles.error : styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <InputMask
          placeholder={placeholder}
          name={name}
          type={showPassword ? 'text' : type}
          mask={mask ? mask : ''}
          maskPlaceholder={maskPlaceholder}
          alwaysShowMask={alwaysShowMask}
          value={value}
          // @ts-ignore
          {...register(name)}
        />
        {type === 'password' && (
          <button
            type="button"
            className={styles.showPasswordButton}
            onClick={() => handleShowPassword()}
          >
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                size={'lg'}
                className={styles.showPasswordIcon}
              />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} size={'lg'} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
