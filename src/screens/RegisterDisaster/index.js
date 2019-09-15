import React, { useState } from 'react';
import * as Styles from './styles';
import GoogleMaps from '../../components/Map';

import { Select, InputNumber, Row, Button, Input } from 'antd';

export const RegisterDisaster = props => {
  const { Option } = Select;
  const { TextArea } = Input;

  const [inputValue, setInputValue] = useState(0);

  const onChange = value => {
    console.log(`selected ${value}`);
  };

  const onChangeSliderValue = value => {
    setInputValue(value);
  };
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <div>
          <h2>Categoria</h2>
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
        <div>
          <h2>Localidade</h2>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Endereço"
            optionFilterProp="disaster"
            onChange={onChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="pucrs">PUCRS</Option>
          </Select>
        </div>
        <div>
          <h2> Raio </h2>
          <Row>
            <InputNumber
              min={1}
              max={1000}
              value={inputValue}
              onChange={value => onChangeSliderValue(value)}
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
        <div>
          <h2>Descrição do Ocorrido:</h2>
          <TextArea style={{ width: 300 }} rows={4} />
        </div>
        <div>
          <Row>
            <Button type="danger">Cancelar</Button>
            <Button style={{ marginLeft: 16 }} type="default">
              Confirmar
            </Button>
          </Row>
        </div>
      </div>
      <div style={{display: 'flex', flex: 1}}>
        <GoogleMaps />
      </div>
    </div>
  );
};

export default RegisterDisaster;
