import React from 'react';
import { Input, Button } from 'antd';

import { Link } from 'react-router-dom';
import { Container, FormContainer } from './styles';
import LogoMonitoria from '../../assets/Logo-Monitoria.svg';

const Login: React.FC = () => {
  return (
    <Container>
      <FormContainer>
        <img src={LogoMonitoria} alt='logo' />
        <span>Usuário:</span>
        <Input />
        <span>Senha:</span>
        <Input />
        <Link to='/projects'>
          <Button type='primary'>Entrar</Button>
        </Link>
      </FormContainer>
    </Container>
  );
};

export default Login;