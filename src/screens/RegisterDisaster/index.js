import React, { useState, useEffect } from 'react';
import * as Styles from './styles';
import GoogleMaps from '../../components/Map';

import { Select, InputNumber, Row, Button, Input, Col } from 'antd';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';
import Firebase, { firestore } from '../../lib/firebase';
import { getDistanceFromLatLonInKm } from '../../helpers';
import config from '../../lib/config';

const { Option } = Select;
const { TextArea } = Input;

const RegisterDisaster = ({ history }) => {
  const [radius, setRadius] = useState(5);
  const [disasterType, setDisasterType] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const notifyUser = (userData, disaster) => {
    console.log(userData);
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization:
          'Key=AAAAXv5wc9o:APA91bH82rMQ9b3VQfuw9zBE4ROs6WuUxwXbV6QSzsCkMGwqDP5pFvSzvH3leDMrfFEobAe7C3gMiDF195QV-DTp_HWs0m2g4CMb0qZEZCL3w3MawG1WkY6k-VSgfaYGpVdeNSH4y5Dc',
      }),
      body: JSON.stringify({
        to: userData.notificationToken,
        collapse_key: 'type_a',
        notification: {
          title: 'Alerta de desastre em sua área!',
          body: description,
        },
        data: {
          userData,
          disaster,
        },
      }),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  const addUserToDisaster = async (disasterId, userData) => {
    const disaster = await (await firestore
      .collection('disasters')
      .doc(disasterId)
      .get()).data();

    const test = {
      [userData.id]: {
        cpf: userData.cpf,
        name: userData.name,
        situation: 'hit',
      },
    };
    console.log(test);

    await firestore
      .collection('disasters')
      .doc(disasterId)
      .set(
        {
          people: {
            ...disaster.people,
            [userData.id]: {
              cpf: userData.cpf,
              name: userData.name,
              situation: 'hit',
            },
          },
        },
        { merge: true }
      );
  };

  const onSave = async () => {
    const disaster = await firestore.collection('disasters').add({
      description: description,
      category: disasterType,
      creationDate: Firebase.firestore.FieldValue.serverTimestamp(),
      coords: {
        ...coords,
        radius,
      },
    });

    firestore
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async user => {
          const userData = user.data();
          if (
            userData.latitude &&
            userData.longitude &&
            userData.name &&
            userData.cpf
          ) {
            const distanceFromDisaster = getDistanceFromLatLonInKm(
              userData.latitude,
              userData.longitude,
              coords.latitude,
              coords.longitude
            );

            if (distanceFromDisaster <= radius) {
              console.log(
                `Usuário a ${distanceFromDisaster}km de distancia, sendo notificado`
              );
              await addUserToDisaster(disaster.id, {
                ...userData,
                id: user.id,
              });
              notifyUser(
                {
                  ...userData,
                  id: user.id,
                },
                {
                  id: disaster.id,
                  description,
                  disasterType,
                  coords: {
                    ...coords,
                    radius,
                  },
                }
              );
            }
          }
        });
      });

    // history.push('/desastres');
  };

  return (
    <div style={{ height: '100vh' }}>
      <Row>
        <Col span={24}>
          <Header
            onBack={() => history.push('/desastres')}
            title="Registrar novo desastre"
          />
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', flex: 1 }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              <div>
                <div style={styles.field}>
                  <h3>Categoria</h3>
                  <Select
                    style={{ width: 200 }}
                    placeholder="Tipo Desastre"
                    optionFilterProp="disaster"
                    onChange={value => {
                      setDisasterType(value);
                    }}
                  >
                    <Option value="fire">Incendio</Option>
                    <Option value="landslide">Deslizamento de Terra</Option>
                    <Option value="inundation">Enchente</Option>
                  </Select>
                </div>
                <div style={styles.field}>
                  <h3>Raio </h3>
                  <Row>
                    <InputNumber
                      min={1}
                      max={1000}
                      value={radius}
                      onChange={value => {
                        setRadius(value);
                      }}
                    />
                    <Select
                      defaultValue="km"
                      style={{ width: 80, marginLeft: 16 }}
                      placeholder="ud"
                      optionFilterProp="disaster"
                    >
                      <Option value="km">Km</Option>
                      <Option value="m">m</Option>
                    </Select>
                  </Row>
                </div>
                <div style={styles.field}>
                  <h3>Descrição do Ocorrido:</h3>
                  <TextArea
                    style={{ width: 300 }}
                    rows={4}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                <div style={styles.field}>
                  <Row>
                    <Button
                      onClick={onSave}
                      disabled={!coords.longitude && !coords.latitude}
                      type="primary"
                    >
                      Confirmar
                    </Button>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <GoogleMaps
            style={styleMap}
            localizationRadius={radius}
            updateLocalization={setCoords}
          />
        </Col>
      </Row>
    </div>
  );
};

const styleMap = {
  height: '80vh',
  width: '100%',
};

const styles = {
  field: {
    marginTop: 15,
  },
};

export default withRouter(RegisterDisaster);
