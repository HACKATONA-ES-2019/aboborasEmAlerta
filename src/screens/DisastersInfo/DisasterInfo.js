import React from 'react';
import config from '../../lib/config';
import { Row, Col, Typography, List, Button } from 'antd';
import * as Styles from './styles';
import InfoList from '../../components/infoList/InfoList';
import Header from '../../components/Header';
import Constants from '../../lib/constants';
import { firestore } from '../../lib/firebase';
import GoogleMaps from '../../components/MapInfo';

const { Title } = Typography;

const mountDisaster = disaster => {
  const situations = Object.keys(Constants.situations).reduce(
    (acc, curr) => ({ ...acc, [curr]: 0 }),
    {}
  );
  const people = disaster.people || {};
  const peopleList = []
  Object.entries(people).forEach(([key, p]) => {
    peopleList.push({...p, id: key})
    situations[p.situation] = situations[p.situation] + 1;
  });
  console.log(peopleList)
  return { ...disaster, situations: { ...situations, hit: peopleList.length }, people: peopleList };
};
class DisasterInfo extends React.Component {
  state = {
    disaster: mountDisaster(this.props.location.state.record),
  };
  componentDidMount() {
    firestore
      .collection('disasters')
      .doc(this.props.location.state.record.id)
      .onSnapshot(doc => {
        this.setState({ disaster: mountDisaster({...doc.data(), id: doc.id}) });
      });
  }

  render() {
    return (
    <Styles.outerDiv>
      <Row>
        <Col lg={12} sm={24}>
        <Header
          title={
            Constants.disasterTypes[this.props.location.state.record.category]
          }
          onBack={() => this.props.history.push('/desastres')}
        />
        <InfoList disaster={this.state.disaster} />
        <div style={{display: 'flex', flex: 1, alignItems: 'flex-end'}}>
          <Button type="primary" style={{width:"100%", height: "5vh"}} 
           onClick={() => this.props.history.push('/identificar-pessoa', {
            disaster: this.state.disaster,
          })}
          >Identificar pessoa</Button>
        </div>
        </Col>
        <div className="my-map">
          <Col span={12}>
          <GoogleMaps style={{height: '100vh', width: '100%'}} initialCenter={{lat: -30.0612243, lng: -51.1736529}}></GoogleMaps>
          </Col>
        </div>
        
      </Row>
    </Styles.outerDiv> 
    );
  }
}

export default DisasterInfo;
