import Styled from 'styled-components';
import { Form, Icon, Input, Button, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

export const Wrapper = Styled.div`
    display: flex;
    background: #fff;
    align-self: center;
    justify-content: center;
    align-items: center;
    height: 100rem;
    flex-direction: column;
`;

export const ButtonFull = Styled(Button)`
  display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 40vh !important;
`;

export const Buttonfinal = Styled(Button)`
    width:100%;
    height: 10vh !important;
`;

export const TextTitle = Styled(Title)`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 5vh
`;