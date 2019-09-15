import React, { useEffect, useState } from 'react';
import * as Styles from './styles';
import { requestNotificationPermission } from '../../helpers';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { messaging, firestore, auth } from '../../lib/firebase';
const { Title } = Typography;

export const LoginScreen = () => {
  const [cpf, setCpf] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  useEffect(() => {
    messaging.onMessage(msg => {
      alert(`Mensagem Recebida: ${msg}`);
    });
  }, []);

  const handleClick = async () => {
    const token = await requestNotificationPermission();

    if (token) {
      auth
        .signInWithEmailAndPassword(`${cpf}@aboborasemalerta.com`, password)
        .then(data => {
          updateNotificationToken(data.user.uid, token);
        })
        .catch(err => {
          if (err.code === 'auth/wrong-password') {
            alert('Senha inválida');
          } else {
            registerUser(token);
          }
        });
    }
  };

  const registerUser = async token => {
    try {
      const response = auth.createUserWithEmailAndPassword(
        `${cpf}@aboborasemalerta.com`,
        password
      );
      updateNotificationToken(response.user.uid, token);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNotificationToken = async (userUid, token) => {
    firestore
      .collection('users')
      .doc(userUid)
      .set({
        notificationToken: token,
      }, { merge: true });
  };

  return (
    <Styles.Wrapper>
      <Title>Entre</Title>
      <Form layout="vertical">
        <Form.Item label="CPF">
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="CPF"
            onChange={event => setCpf(event.target.value)}
          />
        </Form.Item>
        <Form.Item label="Senha">
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Senha"
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleClick}>
            Entrare
          </Button>
        </Form.Item>
      </Form>
    </Styles.Wrapper>
  );
};
