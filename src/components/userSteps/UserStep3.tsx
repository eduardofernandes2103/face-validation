import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '../button';
import { UseStepper } from '@/providers/stepper';
import { StepProps } from '@/assets/types/stepperProps';

const UserStepThree: React.FC<StepProps> = ({shouldRender}) => {
  const {nextStep} = UseStepper();

  return(
    shouldRender && (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconSelfieContainer}>
            <FontAwesomeIcon icon={faCamera} size={'4x'} className={styles.icon} />
          </div>
          <h6>Validação facial</h6>
          <span>Para continuar, precisamos que você tire uma selfie seguindo estas diretrizes simples:</span>
          <ul>
            <li>Certifique-se de estar em um ambiente bem iluminado</li>
            <li>Mantenha a câmera estável</li>
            <li>Evite expressões faciais exageradas</li>
            <li>Por favor, remova os óculos de sol e bonés</li>
            <li>Posicione seu rosto no centro da câmera, com o rosto completamente visível.</li>
          </ul>
          <Button isDefault onClick={() => nextStep()}>Tirar selfie</Button>
        </div>
      </div>
    )
  )
}

export default UserStepThree;