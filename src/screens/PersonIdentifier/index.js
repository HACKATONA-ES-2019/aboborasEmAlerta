import React, {useState} from 'react';
import * as Styles from './styles';
import { Input, Button, Icon, Radio, Row} from 'antd';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


export const PersonIdentifier = (props) => {

    const [value, setValue] =  useState(1)
    const [showCamera, setShowCamera] =  useState(false)
    const [didTakePhoto, setDidTakePhoto] =  useState(false)
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value)
      };


    const onTakePhoto =  () => {
        console.log('takePhoto');
        setDidTakePhoto(true)
        setTimeout( () => {
            setShowCamera(false)
        }, 2000);
    } 

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

         { showCamera && 
            <Camera
                idealResolution = {{width: "100%", height: "100vh"}}
                isFullscreen = {true}
                isMaxResolution = {false}
                sizeFactor = {1}
                isImageMirror = {false}
                idealFacingMode = {FACING_MODES.ENVIRONMENT}
                onTakePhoto = { () => { onTakePhoto(); } }
            />
         }

         { !showCamera && 
            <div>
            <Styles.space>
            <h1>Identificar Vítima</h1>
                <h3>Nome</h3>
                <Input onChange={(e) => (setName(e.target.value))} placeholder="Digite aqui..." value={didTakePhoto ? ("Gabriel Weich") : (name)}/>
            </Styles.space>

            <Styles.space>
                <h3>CPF</h3>
                <Input onChange={(e) => (setCpf(e.target.value))} placeholder="Digite aqui..." value={didTakePhoto ? ("12345678900") : (cpf)}/>
            </Styles.space>

            <Styles.space>
                {
                    didTakePhoto ? (
                        <Button onClick={() => setShowCamera(true)} style={{width: 200, height: 70}} style={{borderColor:"green"}} type="default" icon="check-circle">
                        Reconhecimento Facial
                    </Button>
                    ) : (
                        <Button onClick={() => setShowCamera(true)} style={{width: 200, height: 70}} type="default" icon="camera">
                        Reconhecimento Facial
                        </Button>
                    )
                }

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
            </div>
         }

      </Styles.Div>
  );
};
