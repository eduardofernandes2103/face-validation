import React from 'react';
import styles from './styles.module.scss';
import { ButtonProps } from '@/assets/types/buttonProps';

const ButtonBorder: React.FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <button className={styles.borderButton} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default ButtonBorder;
