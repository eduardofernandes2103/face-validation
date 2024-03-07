type ButtonType = 'button' | 'submit';

export interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  isBorder?: boolean;
  isBorderless?: boolean;
  isDefault?: boolean;
  children: string;
}
