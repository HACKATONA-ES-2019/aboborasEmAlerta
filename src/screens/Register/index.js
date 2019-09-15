import React, { useEffect, useState } from 'react';
import * as Styles from './styles';
import { requestNotificationPermission } from '../../helpers';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { messaging, firestore } from '../../lib/firebase';
const { Title } = Typography;

export const RegisterScreen = () => {
  const [ cpf, setCpf ] = useState(undefined);
  
  useEffect(() => {

  }, []);

  const handleRegister = () => {
      
  }

  return (
    <Styles.Wrapper>
      <Title>Entre</Title>
      <Form layout="vertical">
        <Form.Item label="CPF">
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="CPF"
            onChange={(event) => setCpf(event.target.value)}
          />
        </Form.Item>
        <Form.Item label="Senha">
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleRegister}>
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </Styles.Wrapper>
  );
};
