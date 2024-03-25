import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UseStepper } from '@/providers/stepper';
import { CPFPayload } from '@/assets/types/useStepTwoProps';
import { validateCheckDigitis } from '@/utils/validations';
import { useState } from 'react';
import Toast from '../toast';

const UserStepTwo = () => {
  const { nextStep, setUserDocument } = UseStepper();
  const [shouldOpenToastError, setShouldOpenToastError] = useState<boolean>(true);
  
  const formSchema = yup.object().shape({
    cpf: yup.string().min(11).max(11).required('Campo obrigatório'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<any>({resolver: yupResolver(formSchema)});

  const onSubmitFunction = async (data: CPFPayload) => {
    const cpf = data.cpf
    if(validateCheckDigitis(cpf)){
      setUserDocument(cpf);
      nextStep();
      return
    }
    setShouldOpenToastError(true)
  }  
  
  return(
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconSelfieContainer}>
          <FontAwesomeIcon icon={faIdCard} size={'4x'} className={styles.icon} />
        </div>
        <h6>Confirme Seu CPF</h6>
        <span>Para continuar, digite seu documento de identificação (CPF) com apenas números</span>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <input {...register('cpf')} type='number' placeholder="Digite somente números"/>
          <button type='submit'>
            <FontAwesomeIcon icon={faArrowRight} size={'2x'} />
          </button>
        </form>
      </div>
      <Toast shouldOpenToast={shouldOpenToastError}
        shouldCloseToast={() => setShouldOpenToastError(false)} 
        toastTitle="Algo deu errado">
        O CPF digitado não é válido
      </Toast>
    </div>
  )
}

export default UserStepTwo;