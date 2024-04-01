import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import LogoPrincipal from '../../assets/images/sphere_branco_principal_logo.svg'
import Image from 'next/image';
import { StepProps } from '@/assets/types/stepperProps';

const UserStepFive: React.FC<StepProps> = ({shouldRender}) => {
  return(
    shouldRender && (
      <div className={styles.container}>
        <div className={styles.lastStepContent}>
          <div className={styles.lastStepCard}>
            <FontAwesomeIcon icon={faCircleCheck} size={'5x'} className={styles.icon} />
            <h4>Tudo certo</h4>
            <p>Você preencheu todos os passos corretamente e sua cortesia será validada em até <b>24 horas</b></p>
          </div>
          <Image src={LogoPrincipal} alt='logo-sphere-cyber-solutions' />
        </div>
      </div>
    )
  )
}

export default UserStepFive;