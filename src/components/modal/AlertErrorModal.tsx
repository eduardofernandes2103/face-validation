import React from 'react';
import styles from './styles.module.scss';
import { AlertModalProps } from '@/assets/types/alertModalProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


const AlertErrorModal: React.FC<AlertModalProps> = ({onCloseModal}) => {
  return (
    <div className={styles.alerModalContainer}>
      <button onClick={onCloseModal}>X</button>
      <FontAwesomeIcon icon={faCircleXmark} className={styles.errorIcon} size={'5x'} />
      <h5>Negado</h5>
    </div>
  );
};

export default AlertErrorModal;