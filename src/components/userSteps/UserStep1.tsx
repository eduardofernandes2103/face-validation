import styles from './styles.module.scss';
import Image from 'next/image';
import LogoSphere from '../../assets/images/sphere_simbolo_branco.svg';
import { UseStepper } from '@/providers/stepper';
import { StepProps } from '@/assets/types/stepperProps';

const UserStepOne: React.FC<StepProps> = ({shouldRender}) => {
  const {nextStep} = UseStepper();
  return(
    shouldRender && (
      <div className={styles.overlay} onClick={() => nextStep()}>
        <div className={styles.firstLayer}>
          <Image src={LogoSphere} alt='sphere-logo'/>
          <h3>Para validar sua cortesia clique aqui</h3>
        </div>
      </div>
    ) 
  )
}

export default UserStepOne;