import React from 'react';
import { Typography } from 'antd';

import {connect} from 'react-redux';
import DisasterItem from './DisasterItem';
const { Title } = Typography;

class Disasters extends React.Component {
  render() {
    console.log(this.props.disasters)
    return (
      <div style={{display: 'flex'}}>
        <Title level={2}>Desastres</Title>
        {/* {this.state.disasters.map(d => <DisasterItem {...d} />)} */}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  disasters: state.disasters
})

export default connect(mapStateToProps)(Disasters)