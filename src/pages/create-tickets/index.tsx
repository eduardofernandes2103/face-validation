import { CreateFreeTicketsPayload } from "@/server/model/tickets/tickets.model";
import { useEffect, useState } from "react"
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ticketsService from "@/server/service/tickets/tickets-service";
import styles from './styles.module.scss';
import Button from "@/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobilePhone, faUser } from "@fortawesome/free-solid-svg-icons";

export default function CreateTickets(){

  const [token, setToken] = useState<string | undefined>();

  const formSchema = yup.object().shape({
    client_name: yup.string().required('Campo obrigatório'),
    client_email: yup.string().required('Campo obrigatório'),
    client_phone_number: yup.string().required('Campo obrigatório')
  })

  const { register, handleSubmit, formState: { errors } } = useForm<any>({resolver: yupResolver(formSchema)});

  const onSubmitFunction = (data: CreateFreeTicketsPayload) => {
    if(token){
      ticketsService.createFreeTickets(token, data).then((res) => {
        console.log('res -----', res);
      }).catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    const userToken = localStorage.getItem('token')
    setToken(`${userToken}`);
    console.log('token', token);
  }, [])

  return(
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Gerar cortesia</h2>
        <span>Preencha os dados para gerar uma nova cortesia</span>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <label>Nome</label>
          <div className={styles.inputWrapper}>
            <input {...register('client_name')} type="text" placeholder="Digite o nome completo" />
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </div>
          <label>Email</label>
          <div className={styles.inputWrapper}>
            <input {...register('client_email')} type="text" placeholder="Digite o email"/>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          </div>
          <label>Telefone</label>
          <div className={styles.inputWrapper}>
            <input {...register('client_phone_number')} type="text" placeholder="Digite o número de telefone"/>
            <FontAwesomeIcon icon={faMobilePhone} className={styles.icon} />
          </div>
          <Button isDefault type="submit">Gerar cortesia</Button>
        </form>
      </div>
    </div>
  )
}