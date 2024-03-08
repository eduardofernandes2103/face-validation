import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button'; 
import Input from '../../components/input';

export default function Login() {
  const { register, handleSubmit } = useForm();

  return (
    <div style={styles.container}>
      <h1 className="logoLogin">Login</h1>
      <form>
        <Input name="username" register={register} placeholder="Nome de usuário" label='Usuario' />

        <Input name="password" register={register} type="password" placeholder="Senha" label="Senha" />

        <Button isDefault={true} type="submit">Entrar</Button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    heighr: '300px',
    padding: '25px',
    margin: 'auto',
    marginTop: '100px',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.30)'
  },
  input: {
    height: '40px',
  },
  logoFont: {
    margin: '0',
    padding: '0',
  }
};

