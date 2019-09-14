import React, {useState} from 'react';
import * as Styles from './styles';
import {Map, GoogleApiWrapper} from 'google-maps-react'
import config from '../../lib/config'

import { Select, InputNumber, Row, Button, Input} from 'antd';

export const RegisterDisaster = (props) => {
    const { Option } = Select;
    const { TextArea } = Input;

    const [inputValue, setInputValue] = useState(0)
    
    const onChange = (value) => {
        console.log(`selected ${value}`);
    }
    
    const onChangeSliderValue = (value) => {
        setInputValue(value)
    };
  return (
      <Styles.leftDiv>
        <Styles.space>
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
        </Styles.space>
        <Styles.space>
            <h2>Localidade</h2>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Endereço"
                optionFilterProp="disaster"
                onChange={onChange}
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="pucrs">PUCRS</Option>
            </Select>        
        </Styles.space>
        <Styles.space>
            <h2> Raio </h2>
                <Row>
                <InputNumber
                    min={1}
                    max={1000}
                    value={inputValue}
                    onChange={(value) => onChangeSliderValue(value)}
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
        </Styles.space>
        <Styles.space>
            <h2>Descrição do Ocorrido:</h2>
            <TextArea style={{width: 300}} rows={4}/>
        </Styles.space>
        <Styles.space>
            <Row> 
                <Button type="danger">Cancelar</Button>
                <Button style={{marginLeft: 16}} type="default">Confirmar</Button>
            </Row>
        </Styles.space>
        <Styles.space>
        <Map
                google={props.google}
                zoom={8}
                style={{width: 500, height: 500}}
                initialCenter={{lat: 47.49855629475769, lng: -122.14184416996333}}
        />
        </Styles.space>
    </Styles.leftDiv>
  );
};

export default GoogleApiWrapper({
    apiKey: config.firebase.apiKey
    })(RegisterDisaster);