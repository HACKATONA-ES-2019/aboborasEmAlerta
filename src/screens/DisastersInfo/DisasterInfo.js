import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import config from '../../lib/config';
import { Row, Col, Typography, List, Button } from 'antd';
import * as Styles from './styles';
import InfoList from '../../components/infoList/InfoList';
import Header from '../../components/Header';
import Constants from '../../lib/constants'

const { Title } = Typography;
class DisasterInfo extends React.Component {
    componentDidMount(){
        console.log(this.props)
    }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <Header title={Constants.disasterTypes[this.props.location.state.record.category]} onBack={() => this.props.history.push('/desastres')}/>
        <InfoList />
      </div>
    );
  }
}

export default DisasterInfo