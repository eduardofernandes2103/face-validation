import styles from './styles.module.scss';
import Image from 'next/image';
import LogoSphere from '../../assets/images/sphere_simbolo_branco.svg';
import useStepper from '@/hooks/useStepper';

const UserStepOne = () => {
  const { nextStep } = useStepper(1);

  return(
    <div className={styles.overlay} onClick={nextStep}>
      <div className={styles.firstLayer}>
        <Image src={LogoSphere} alt='sphere-logo'/>
        <h3>Para validar sua cortesia clique aqui</h3>
      </div>
    </div>
  )
}

export default UserStepOne;