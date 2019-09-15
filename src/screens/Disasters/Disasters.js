import React from 'react';
import { Button, PageHeader } from 'antd';
import DisasterItem from './DisasterItem/DisasterItem';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Disasters extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader
          style={{ boxShadow: '0 2px 8px #f0f1f2' }}
          extra={[
            <Link to="/desastres/criar">
              <Button key="1" type="primary">
                Registrar desastre
              </Button>
            </Link>,
          ]}
          title="Desastres"
        />

        <div style={{ display: 'block' }}>
          {this.props.disasters.map(d => (
            <DisasterItem {...d} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  disasters: state.disasters.disasters,
});

export default connect(mapStateToProps)(Disasters);
