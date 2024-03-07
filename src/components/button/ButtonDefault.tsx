import React from 'react';
import styles from './styles.module.scss';
import { ButtonProps } from '@/assets/types/buttonProps';

const ButtonDefault: React.FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <button className={styles.default} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default ButtonDefault;
