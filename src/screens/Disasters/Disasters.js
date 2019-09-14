import React from 'react';
import { Typography } from 'antd';
import DisasterItem from './DisasterItem';

import { connect } from 'react-redux';
const { Title } = Typography;

class Disasters extends React.Component {
  render() {
    console.log(this.props.disasters);
    return (
      <div style={{ display: 'flex' }}>
        <Title level={2}>Desastres</Title>
        {this.props.disasters.map(d => (
          <DisasterItem {...d} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  disasters: state.disasters.disasters,
});

export default connect(mapStateToProps)(Disasters);
