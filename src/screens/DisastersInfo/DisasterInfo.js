import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import config from "../../lib/config";
import {Row, Col, Typography, List, Button} from "antd";
import * as Styles from './styles';
import InfoList from "../../components/infoList/InfoList";


const { Title } = Typography;

const props = {
    description: 'É INCENDIO BAGUAL'
};

class DisasterInfo extends React.Component {

    render() {
        return (
            <Row>

                <Col span={12}>
                    <Styles.leftDiv>
                        <Row>
                            <Title>
                                {props.description}
                            </Title>
                        </Row>
                        <Row>

                            <div>
                                <InfoList/>
                            </div>

                        </Row>
                        <Row>
                            <Button>
                                NOVO MALUCO
                            </Button>
                        </Row>
                    </Styles.leftDiv>
                </Col>

                <Col span={12}>
                    <Styles.rigthDiv>
                        MAPA
                    </Styles.rigthDiv>
                </Col>

            </Row>

        );
    }
}

export default GoogleApiWrapper({apiKey: config.firebase.apiKey})(DisasterInfo);
