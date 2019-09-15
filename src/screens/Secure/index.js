import React from 'react';
import * as Styles from './styles';
import { Typography } from 'antd';
const { Title } = Typography;

const SecureScreen = () => {
  return (
    <Styles.Wrapper>
      <Title>Você está seguro.</Title>
    </Styles.Wrapper>
  );
};

export default SecureScreen;
