import React, { useState } from 'react';
import * as Styles from './styles';
import GoogleMaps from '../../components/Map';

import { Select, InputNumber, Row, Button, Input } from 'antd';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';
import Firebase, { firestore } from  '../../lib/firebase'

const { Option } = Select;
const { TextArea } = Input;

class RegisterDisaster extends React.Component {
  onSave = () => {
    firestore.collection('disasters').add({
        description: 'Figo',
        category: 'fire',
        creationDate: Firebase.firestore.FieldValue.serverTimestamp(),
    });
    this.props.history.push('/desastres')
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header
          onBack={() => this.props.history.push('/desastres')}
          title="Registrar novo desastre"
        />
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
                >
                  <Option value="incendio">Incendio</Option>
                  <Option value="deslizamento">Deslizamento de Terra</Option>
                  <Option value="enchente">Enchente</Option>
                </Select>
              </div>
              <div style={styles.field}>
                <h3>Localidade</h3>
                <Select
                  
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Endereço"
                  optionFilterProp="disaster"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="pucrs">PUCRS</Option>
                </Select>
              </div>
              <div style={styles.field}>
                <h3>Raio </h3>
                <Row>
                  <InputNumber min={1} max={1000} onChange={value => true} />
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
                <TextArea style={{ width: 300 }} rows={4} />
              </div>
              <div style={styles.field}>
                <Row>
                  <Button onClick={this.onSave} type="primary">Confirmar</Button>
                </Row>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1 }}>
            <GoogleMaps />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  field: {
    marginTop: 15,
  },
};
export default withRouter(RegisterDisaster);
