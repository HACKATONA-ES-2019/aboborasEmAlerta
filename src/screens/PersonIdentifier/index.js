import React, { useState } from 'react';
import * as Styles from './styles';
import { Input, Button, Icon, Radio, Row, message } from 'antd';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { firestore } from '../../lib/firebase';
import Constants from '../../lib/constants';

export const PersonIdentifier = props => {
  console.log(props);
  const [value, setValue] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [didTakePhoto, setDidTakePhoto] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onTakePhoto = () => {
    setDidTakePhoto(true);
    setCpf('12345678901');
    setName('Gabriel Weich');
    setValue('injured');
    setTimeout(() => {
      setShowCamera(false);
    }, 1000);
  };

  const onConfirm = async () => {
    const disasterId = props.location.state.disaster.id;
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
    setCpf('');
    setName('');
    setValue('');
    setDidTakePhoto(false);
    message.success('Vítima registrada com sucesso.');
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const buttonStyle = {
    width: 90,
  };

  return (
    <Styles.Div>
      {showCamera && (
        <Camera
          idealResolution={{ width: '100%', height: '100vh' }}
          isFullscreen={true}
          isMaxResolution={false}
          sizeFactor={1}
          isImageMirror={false}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          onTakePhoto={() => {
            onTakePhoto();
          }}
        />
      )}

      {!showCamera && (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Styles.space>
            <h1>Identificar Vítima</h1>
            <h3>Nome</h3>
            <Input
              onChange={e => setName(e.target.value)}
              placeholder="Digite aqui..."
              value={name}
            />
          </Styles.space>

          <Styles.space>
            <h3>CPF</h3>
            <Input
              onChange={e => setCpf(e.target.value)}
              placeholder="Digite aqui..."
              value={cpf}
            />
          </Styles.space>

          <Styles.space>
            {didTakePhoto ? (
              <Button
                onClick={() => setShowCamera(true)}
                style={{ width: 200, height: 70 }}
                style={{ borderColor: 'green' }}
                type="default"
                icon="check-circle"
              >
                Reconhecimento Facial
              </Button>
            ) : (
              <Button
                onClick={() => setShowCamera(true)}
                style={{ width: 200, height: 70 }}
                type="default"
                icon="camera"
              >
                Reconhecimento Facial
              </Button>
            )}
          </Styles.space>

          <Styles.space>
            <h3>Estado da Vítima</h3>
            <Radio.Group onChange={e => onChange(e)} value={value}>
              <Radio style={radioStyle} value={'injured'}>
                Ferido
              </Radio>
              <Radio style={radioStyle} value={'safe'}>
                Fora de Risco
              </Radio>
              <Radio style={radioStyle} value={'death'}>
                Óbito
              </Radio>
            </Radio.Group>
          </Styles.space>

          <Styles.space>
            <Row>
              <Button
                stlye={{ width: 100 }}
                type="danger"
                onClick={() => props.history.goBack()}
              >
                Cancelar
              </Button>
              <Button
                style={{ marginLeft: 30, width: 100, justifyContent: 'center' }}
                type="primary"
                onClick={onConfirm}
              >
                Confirmar
              </Button>
            </Row>
          </Styles.space>
        </div>
      )}
    </Styles.Div>
  );
};
