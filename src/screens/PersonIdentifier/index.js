import React, {useState} from 'react';
import * as Styles from './styles';
import { Input, Button, s, Radio, Row} from 'antd';



export const PersonIdentifier = (props) => {

    const [value, setValue] =  useState(1)

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value)
      };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const buttonStyle = {
        width: 90,
    }

  return (
      <Styles.Div>

          <h1>Identificar Vítima</h1>
          <Styles.space>
            <h3>Nome</h3>
            <Input placeholder="Digite aqui..."/>
          </Styles.space>

          <Styles.space>
            <h3>CPF</h3>
            <Input placeholder="Digite aqui..."/>
          </Styles.space>

          <Styles.space>
            <Button style={{width: 200, height: 70}} type="default" icon="camera">
                Reconhecimento Facial
            </Button>
          </Styles.space>

          <Styles.space>
            <h3>Estado da Vítima</h3>
            <Radio.Group onChange={(e) => onChange(e)} value={value}>
                <Radio style={radioStyle} value={1}>
                    Ferido
                </Radio>
                <Radio style={radioStyle} value={2}>
                    Fora de Risco
                </Radio>
                <Radio style={radioStyle} value={3}>
                    Óbito
                </Radio>
            </Radio.Group>
          </Styles.space>

          <Styles.space>
            <Row> 
                <Button stlye={{width: 100}} type="danger">Cancelar</Button>
                <Button style={{marginLeft: 30, width: 100, justifyContent: "center"}} type="default">Confirmar</Button>
            </Row>
        </Styles.space>

      </Styles.Div>
  );
};
