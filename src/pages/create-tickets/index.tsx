import { CreateFreeTicketsPayload } from "@/server/model/tickets/tickets.model";
import { useEffect, useRef, useState } from "react"
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ticketsService from "@/server/service/tickets/tickets-service";
import styles from './styles.module.scss';
import Button from "@/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobilePhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/toast";
import { CircularProgress } from '@mui/material';

export default function CreateTickets(){

  const [token, setToken] = useState<string | undefined>();
  const [shouldOpenToastError, setShouldOpenToastError] = useState<boolean>(false);
  const [shouldOpenToastSuccess, setShouldOpenToastSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = yup.object().shape({
    client_name: yup.string().required('Campo obrigatório'),
    client_email: yup.string().required('Campo obrigatório'),
    client_phone_number: yup.string()
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({resolver: yupResolver(formSchema)});

  const onSubmitFunction = (data: CreateFreeTicketsPayload) => {
    setIsLoading(true);
    if(token){
      ticketsService.createFreeTickets(token, data).then((res) => {
        setShouldOpenToastSuccess(true);
        setIsLoading(false);
        reset();
      }).catch((err) => {
        console.error(err);
        setShouldOpenToastError(true);
        setIsLoading(false);
      });
    }
  }

  useEffect(() => {
    const userToken = localStorage.getItem('token')
    setToken(`${userToken}`);
  }, [])

  return(
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Gerar cortesia</h2>
        <span>Preencha os dados para gerar uma nova cortesia</span>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <label>Nome</label>
          <div className={styles.inputWrapper}>
            <input {...register('client_name')}  type="text" placeholder="Digite o nome completo" />
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </div>
          <label>Email</label>
          <div className={styles.inputWrapper}>
            <input {...register('client_email')}  type="text" placeholder="Digite o email"/>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          </div>
          <label>Telefone</label>
          <div className={styles.inputWrapper}>
            <input {...register('client_phone_number')}  type="text" placeholder="Digite o número de telefone"/>
            <FontAwesomeIcon icon={faMobilePhone} className={styles.icon} />
          </div>
          <div className={styles.buttonWrapper}>
            {isLoading ? (
            <CircularProgress />
            ) : (
              <Button isDefault type="submit">Gerar cortesia</Button>
            )}
          </div>
        </form>
        <Toast shouldOpenToast={shouldOpenToastError}
          shouldCloseToast={() => setShouldOpenToastError(false)} 
          toastTitle="Algo deu errado" type="error" dark>
          Não foi possível gerar uma nova cortesia
        </Toast>
        <Toast shouldOpenToast={shouldOpenToastSuccess}
          shouldCloseToast={() => setShouldOpenToastSuccess(false)} 
          toastTitle="Cortesia gerada" type="success" dark>
          Cortesia gerada com sucesso
        </Toast>
      </div>
    </div>
  )
}