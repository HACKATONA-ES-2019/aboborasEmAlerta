import React, { useState } from 'react';
import * as Styles from './styles';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { Row, Col } from 'antd';
import { auth, firestore } from '../../lib/firebase';

const { Title } = Typography;

class User extends React.Component {
  state = {
    inDanger: true,
    uid: '',
    disaster: '',
    disasterId: '1TX18yVsuA6Vxs3GpjHB',
    user: {},
  };

  switchInDanger() {
    this.setState({ inDanger: true });
  }

  componentDidMount() {
    auth.onAuthStateChanged(u => {
      if (u && u.uid) {
        this.setState({ uid: u.uid });
        firestore
          .collection('users')
          .doc(u.uid)
          .get()
          .then(u => {
            this.setState({ user: u.data() });
          });
      }
    });
  }

  onClickNotAffect = () => {};

  onClickAtRisk = async () => {
    let value = 'atRisk';

    const disasterId = this.state.disasterId;
    const disasterRef = firestore.collection('/disasters').doc(disasterId);
    const disaster = (await disasterRef.get()).data();

    const newValue = {
      people: {
        ...disaster.people,
        [this.state.uid]: { ...this.state.user, situation: value },
      },
    };

    await firestore
      .collection('/disasters')
      .doc(disasterId)
      .set(newValue, { merge: true });
    
    this.props.history.push('/seguro', {msg: 'A ajuda está a caminho.'})
  };

  onClickSafe = () => {
    this.props.history.push('/seguro', {msg: 'Obrigado por nos informar.'});
  };

  render() {
    return (
      <div>
        {this.state.inDanger && (
          <div>
            <Row style={{ backgroundColor: '#FBFBFB' }}>
              <Col span={24}>
                <Styles.TextTitle style={{ fontSize: 30, marginTop: 20 }}>
                  Incêndio - PUCRS
                </Styles.TextTitle>
              </Col>

              <Form layout="vertical">
                <Col span={24}>
                  <Styles.Buttonfinal
                    onClick={this.onClickNotAffect}
                    type="primary"
                    style={{
                      fontSize: 15,
                      backgroundColor: '#C1C1C1',
                      borderWidth: 0,
                      borderRadius: 0,
                    }}
                  >
                    NÃO ESTOU ENVOLVIDO!
                  </Styles.Buttonfinal>
                </Col>
                <Col span={24}>
                  <Styles.ButtonFull
                    onClick={this.onClickSafe}
                    type="primary"
                    icon="check"
                    style={{
                      fontSize: 30,
                      backgroundColor: '#71BF5C',
                      borderWidth: 0,
                      borderRadius: 0,
                    }}
                  >
                    ESTOU BEM!
                  </Styles.ButtonFull>
                </Col>
                <Col span={24}>
                  <Styles.ButtonFull
                    onClick={this.onClickAtRisk}
                    type="danger"
                    icon="warning"
                    style={{
                      fontSize: 30,
                      backgroundColor: '#C2504D',
                      borderWidth: 0,
                      borderRadius: 0,
                    }}
                  >
                    PRECISO DE AJUDA!
                  </Styles.ButtonFull>
                </Col>
              </Form>
            </Row>
          </div>
        )}
        {!this.state.inDanger && (
          <Styles.Wrapper>
            <Title>Você está seguro.</Title>
          </Styles.Wrapper>
        )}
      </div>
    );
  }
}

export default User;
