import React from 'react';
import config from '../../lib/config';
import { Row, Col, Typography, List, Button } from 'antd';
import * as Styles from './styles';
import InfoList from '../../components/infoList/InfoList';
import Header from '../../components/Header';
import Constants from '../../lib/constants';
import { firestore } from '../../lib/firebase';
import Constants from '../../lib/constants'

const { Title } = Typography;
class DisasterInfo extends React.Component {
  state = {
    disaster: this.props.location.state.record,
  };
  componentDidMount() {
    firestore
      .collection('disasters')
      .doc(this.props.location.state.record.id)
      .onSnapshot(doc => {
        this.setState({ disaster: mountDisaster(doc.data()) });
      });
  }

  mountDisaster = (disaster) => {
    disaster.map(d => {
        const situations = Object.keys(Constants.situations).reduce((acc, curr) => ({...acc, [curr]: 0}), {})
        d.peoble.forEach(p => {
            situations[p.situation] = situations[p.situation] + 1
        })
        return {...d, situations}
    })
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header
          title={
            Constants.disasterTypes[this.props.location.state.record.category]
          }
          onBack={() => this.props.history.push('/desastres')}
        />
        <InfoList disaster={this.state.disaster} />
      </div>
    );
  }
}

export default DisasterInfo;
