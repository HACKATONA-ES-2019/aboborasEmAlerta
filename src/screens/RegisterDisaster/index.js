import React, { useState, useEffect } from 'react';
import * as Styles from './styles';
import GoogleMaps from '../../components/Map';

import { Select, InputNumber, Row, Button, Input, Col } from 'antd';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';
import Firebase, { firestore } from '../../lib/firebase';

const { Option } = Select;
const { TextArea } = Input;

const RegisterDisaster = history => {
  const [radius, setRadius] = useState(5);
  const [disasterType, setDisasterType] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const onSave = () => {
    firestore.collection('disasters').add({
      description: description,
      category: disasterType,
      creationDate: Firebase.firestore.FieldValue.serverTimestamp(),
      coords,
    });
    history.push('/desastres');
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
                    <Option value="incendio">Incendio</Option>
                    <Option value="deslizamento">Deslizamento de Terra</Option>
                    <Option value="enchente">Enchente</Option>
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
                    <Button onClick={onSave} type="primary">
                      Confirmar
                    </Button>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <GoogleMaps style={styleMap} localizationRadius={radius} updateLocalization={setCoords}/>
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
