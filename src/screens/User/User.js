import React from 'react';
import * as Styles from './styles';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { Row, Col } from 'antd';
const { Title, Paragraph, Text } = Typography;

class User extends React.Component{
    render() {
        return (
            <Row>
                <Col span={24}>
                    <Styles.TextTitle>
                        Descrição do Ocorrido
                    </Styles.TextTitle>
                </Col>

                <Form layout="vertical">
                        <Col span={12}>
                            <Styles.ButtonFull type="danger">
                                PRECISO DE AJUDA!
                            </Styles.ButtonFull>
                        </Col>
                        <Col span={12}>
                            <Styles.ButtonFull type="primary">
                                ESTOU BEM!
                            </Styles.ButtonFull>
                        </Col>
                        <Col span={24}>
                            <Styles.Buttonfinal>
                                NÃO ESTOU ENVOLVIDO!
                            </Styles.Buttonfinal>
                        </Col>


                </Form>
            </Row>
        );
    }
}

export default User;

