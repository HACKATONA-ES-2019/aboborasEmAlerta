import React from 'react';
import * as Styles from './styles';
import { Typography, Result } from 'antd';
const { Title } = Typography;

const SecureScreen = (props) => {
  let title = 'Você está seguro.'
  if (props && props.location && props.location.state && props.location.state.msg)
    title = props.location.state.msg
  
  return (
    <Result
      status="success"
      title={title}
    />
  );
};

export default SecureScreen;
