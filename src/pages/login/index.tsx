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
import LogoSphere from '../../assets/images/sphere_simbolo_branco.svg';
import LogoPrincipal from '../../assets/images/sphere_branco_principal_logo.svg';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();

  const [shouldOpenToastError, setShouldOpenToastError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const formSchema = yup.object().shape({
    email: yup.string().email().required('Campo obrigatório'),
    password: yup.string().min(8).required('Campo obrigatório')
  })

  const { register, handleSubmit, formState: { errors } } = useForm<any>({resolver: yupResolver(formSchema)});

  const handleShowLogin = () => {
    setShowLogin(true);
  }

  const onSubmitFunction = async (data: agentLoginPayload) => {
    setIsLoading(true);
    agentsController.takeAuth(data)
    .then((res) => {
      localStorage.setItem('token', res!.response);
      router.push('/producer-tickets')
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setShouldOpenToastError(true);
      setIsLoading(false);
    })
  }

  return (
    <div className={styles.overlay} onClick={handleShowLogin}>
      <div className={styles.container}>
        <div className={styles.innerContainer} style={{ top: showLogin ? '200px' : '-300px' }}>
          <h2>Face Validation</h2>
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
          <div className={`${styles.footer} ${showLogin ? styles.visible : ''}`}>
            <Image src={LogoPrincipal} alt='logo-sphere-cyber-solutions' />
          </div>
          <Toast shouldOpenToast={shouldOpenToastError}
            shouldCloseToast={() => setShouldOpenToastError(false)} 
            toastTitle="Algo deu errado" type='error'>
            Confira se seu email ou senha estão corretos.
          </Toast>
        </div>
        <div className={styles.firstLayer} style={{ opacity: showLogin ? '0' : '1' }}>
          <Image src={LogoSphere} alt='sphere-logo'/>
          <h3>Clique para fazer login</h3>
        </div>
      </div>
    </div>
  );
}

