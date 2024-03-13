import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../components/button'; 
import Input from '../../components/input';
import styles from './styles.module.scss';
import { agentLoginPayload } from '@/server/model/agents/agents.model';
import agentsController from '@/server/controller/agents/agents-controller';
import Toast from '@/components/toast';
import { CircularProgress } from '@mui/material';

export default function Login() {
  const router = useRouter();

  const [shouldOpenToastError, setShouldOpenToastError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = yup.object().shape({
    email: yup.string().email().required('Campo obrigatório'),
    password: yup.string().min(8).required('Campo obrigatório')
  })

  const { register, handleSubmit, formState: { errors } } = useForm<any>({resolver: yupResolver(formSchema)});

  const onSubmitFunction = async (data: agentLoginPayload) => {
    setIsLoading(true);
    agentsController.takeAuth(data)
    .then((res) => {
      localStorage.setItem('token', res!.response);
      router.push('/agent-dashboard')
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setShouldOpenToastError(true);
      setIsLoading(false);
    })
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <span>Preencha seus dados para entrar na aplicação</span>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input {...register('email')} placeholder="Digite seu email" />

        <input {...register('password')} type='password' placeholder="Digite sua senha"/>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <button type="submit">Entrar</button>
        )}
      </form>
      <Toast shouldOpenToast={shouldOpenToastError}
        shouldCloseToast={() => setShouldOpenToastError(false)} 
        toastTitle="Algo deu errado">
        Confira se seu email ou senha estão corretos.
      </Toast>
    </div>
  );
}

