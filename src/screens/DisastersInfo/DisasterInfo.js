import React from 'react';
import config from '../../lib/config';
import { Row, Col, Typography, List, Button } from 'antd';
import * as Styles from './styles';
import InfoList from '../../components/infoList/InfoList';
import Header from '../../components/Header';
import Constants from '../../lib/constants';
import { firestore } from '../../lib/firebase';

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
        this.setState({ disaster: mountDisaster(doc.data()) });
      });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
        <Header
          title={
            Constants.disasterTypes[this.props.location.state.record.category]
          }
          onBack={() => this.props.history.push('/desastres')}
        />
        <InfoList disaster={this.state.disaster} />
        <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginBottom: 20}}>
          <Button type="primary">Identificar pessoa</Button>
        </div>
      </div>
    );
  }
}

export default DisasterInfo;
