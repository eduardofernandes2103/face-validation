import React from 'react';
import styles from './styles.module.scss';
import { ButtonProps } from '@/assets/types/buttonProps';
import ButtonBorderless from './ButtonBorderless';
import ButtonDefault from './ButtonDefault';
import ButtonBorder from './ButtonBorder';

const Button: React.FC<ButtonProps> = ({
  isBorder,
  isBorderless,
  isDefault,
  onClick,
  type,
  children
}) => {
  return (
    <div className={styles.container}>
      {isBorderless && (
        <ButtonBorderless onClick={onClick} type={type}>
          {children}
        </ButtonBorderless>
      )}
      {isBorder && (
        <ButtonBorder onClick={onClick} type={type}>
          {children}
        </ButtonBorder>
      )}
      {isDefault && (
        <ButtonDefault onClick={onClick} type={type}>
          {children}
        </ButtonDefault>
      )}
    </div>
  );
};

export default Button;
