import Styled from 'styled-components';
import { Form, Icon, Input, Button, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

export const Wrapper = Styled.div`
    display: flex;
    background: #fff;
    align-self: center;
    justify-content: center;
    align-items: center;
    height: 500px;
    flex-direction: column;
    flex: 1;
`;

export const ButtonFull = Styled(Button)`
  display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 40vh !important;
    border: none;
    border-radius: 0;
`;

export const Buttonfinal = Styled(Button)`
    width:100%;
    height: 10vh !important;
    border: none;
    border-radius: 0;
`;

export const TextTitle = Styled(Title)`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 5vh
`;