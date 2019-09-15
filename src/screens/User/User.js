import React from 'react';
import * as Styles from './styles';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { Row, Col } from 'antd';
const { Title, Paragraph, Text } = Typography;

class User extends React.Component{

    onClickNotAffect = () => {
        console.log("not affect")
    }

    onClickAtRisk = () => {
        console.log("at risk")
    }

    onClickSafe = () => {
        console.log("safe")
    }

    render() {
        return (
            <Row style={{ backgroundColor:"#FBFBFB"}}>
                <Col span={24}>
                    <Styles.TextTitle style={{fontSize:30, marginTop: 20}}>
                        Incêndio - PUCRS
                    </Styles.TextTitle>
                </Col>

                <Form layout="vertical">
                        <Col span={24}>
                            <Styles.Buttonfinal onClick={this.onClickNotAffect} type="primary" style={{fontSize: 15, backgroundColor:"#C1C1C1", borderWidth:0}}>
                                    NÃO ESTOU ENVOLVIDO!
                            </Styles.Buttonfinal>
                        </Col>
                        <Col span={24}>
                            <Styles.ButtonFull onClick={this.onClickSafe} type="primary" icon="check" style={{fontSize: 30, backgroundColor:"#71BF5C"}}>
                                ESTOU BEM!
                            </Styles.ButtonFull>
                        </Col>
                        <Col span={24}>
                            <Styles.ButtonFull onClick={this.onClickAtRisk} type="danger" icon="warning" style={{fontSize: 30, backgroundColor: "#C2504D"}}>
                                PRECISO DE AJUDA!
                            </Styles.ButtonFull>
                        </Col>


                </Form>
            </Row>
        );
    }
}

export default User;

