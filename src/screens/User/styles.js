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
`;

export const ButtonFull = Styled(Button)`
    width:100%;
    height: 510px !important;
`;

export const Buttonfinal = Styled(Button)`
    margin-top:5px !important;
    width:100%;
    height: 50px !important;
    border: 2px solid #000 !important;
`;

export const TextTitle = Styled(Title)`
    text-align: center;
`;