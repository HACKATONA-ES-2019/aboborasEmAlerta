import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as Styles from './styles';
import { requestNotificationPermission } from '../../helpers';
import { Form, Icon, Input, Button, Typography, Spin, message } from 'antd';
import { withUser } from '../../containers';
import { messaging, firestore, auth } from '../../lib/firebase';
const { Title } = Typography;

const startWatchPosition = userUid => {
  navigator.geolocation.watchPosition(
    position => {
      updateUserLocalization(userUid, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      console.log('Localização do usuário atualizada');
    },
    error => {
      console.log(error);
    }
  );
};

const updateUserLocalization = async (userUid, { latitude, longitude }) => {
  firestore
    .collection('users')
    .doc(userUid)
    .set(
      {
        latitude,
        longitude,
      },
      { merge: true }
    );
};

const LoginScreen = ({ userData, updateUserData, history }) => {
  const [name, setName] = useState(undefined);
  const [cpf, setCpf] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    messaging.onMessage(msg => {
      alert(`Mensagem Recebida: ${msg}`);
    });
  }, []);

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      history.push('/usuario');
    }
  }, [userData]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const token = await requestNotificationPermission();
      if (token) {
        auth
          .signInWithEmailAndPassword(`${cpf}@aboborasemalerta.com`, password)
          .then(data => {
            updateNotificationToken(data.user.uid, token);
            updateUserData({ userUid: data.user.uid });
            startWatchPosition(data.user.uid);
            setLoading(false);
          })
          .catch(err => {
            if (err.code === 'auth/wrong-password') {
              alert('Senha inválida');
            } else {
              registerUser(token);
            }
          });
      }
    } catch (error) {
      message.error(error.message)
      setLoading(false)
    }
  };

  const registerUser = async token => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        `${cpf}@aboborasemalerta.com`,
        password
      );
      updateNotificationToken(response.user.uid, token);
      updateUserData({ userUid: response.user.uid });
      startWatchPosition(response.user.uid);
      setLoading(false);
    } catch (error) {
      message.error(error.message)
      setLoading(false)
    }
  };

  const updateNotificationToken = async (userUid, token) => {
    firestore
      .collection('users')
      .doc(userUid)
      .set(
        {
          notificationToken: token,
          cpf: cpf,
          name: name,
        },
        { merge: true }
      );
  };

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <Styles.Wrapper>
      <Title>Cadastre-se</Title>

      <Form layout="vertical">
        <Form.Item label="Nome">
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Nome"
            onChange={event => setName(event.target.value)}
          />
        </Form.Item>
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
        {loading ? (
          <div style={{textAlign: 'center'}}><Spin indicator={antIcon} /></div>
        ) : (
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                onClick={handleClick}
              >
                Cadastre-se
              </Button>
            </div>
          </Form.Item>
        )}
      </Form>
    </Styles.Wrapper>
  );
};

export default withRouter(withUser(LoginScreen));
