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
    disasterId: 'B5QHJCfJ3KfJM1LJbxNY',
  };

  switchInDanger() {
    this.setState({ inDanger: true });
  }

  componentDidMount() {
    auth.onAuthStateChanged(u => {
      if (u && u.uid) {
        this.setState({ uid: u.uid });
      }
    });

    firestore
      .collection('disasters')
      .doc('B5QHJCfJ3KfJM1LJbxNY')
      .onSnapshot(doc => {
        this.setState({ disaster: doc.data() });
      });
  }

  onClickNotAffect = () => {};

  onClickAtRisk = async () => {
    let value = 'atRisk';
    let cpf = '';
    let name = '';
    const disasterId = this.state.disasterId;
    const disasterRef = firestore.collection('/disasters').doc(disasterId);
    const disaster = (await disasterRef.get()).data();
    const people = Object.entries(disaster.people).map(([key, value]) => ({
      ...value,
      id: key,
    }));
    const person = people.find(p => p.cpf === cpf);
    if (person) {
      const newValue = {
        people: {
          ...disaster.people,
          [person.id]: { ...person, situation: value },
        },
      };

      await firestore
        .collection('/disasters')
        .doc(disasterId)
        .set(newValue, { merge: true });
    } else {
      const newValu = {
        people: { ...disaster.people, [cpf]: { cpf, situation: value, name } },
      };

      await firestore
        .collection('/disasters')
        .doc(disasterId)
        .set(newValu, { merge: true });
    }
  };

  onClickSafe = () => {
    this.props.history.push('/seguro')
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
                      borderRadius: 0
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
                    style={{ fontSize: 30, backgroundColor: '#71BF5C', borderWidth: 0, borderRadius: 0 }}
                  >
                    ESTOU BEM!
                  </Styles.ButtonFull>
                </Col>
                <Col span={24}>
                  <Styles.ButtonFull
                    onClick={this.onClickAtRisk}
                    type="danger"
                    icon="warning"
                    style={{ fontSize: 30, backgroundColor: '#C2504D', borderWidth: 0, borderRadius: 0 }}
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
