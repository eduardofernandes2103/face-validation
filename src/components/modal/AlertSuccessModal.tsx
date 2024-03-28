import React from 'react';
import styles from './styles.module.scss';
import { AlertModalProps } from '@/assets/types/alertModalProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const AlertSuccessModal: React.FC<AlertModalProps> = ({onCloseModal}) => {
  return (
    <div className={styles.alerModalContainer}>
      <button onClick={onCloseModal}>X</button>
      <FontAwesomeIcon icon={faCheckCircle} className={styles.successIcon} size={'5x'} />
      <h5>Liberado</h5>
    </div>
  );
};

export default AlertSuccessModal;