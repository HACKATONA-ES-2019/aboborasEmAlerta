import React from 'react';
import { Button, PageHeader, Table } from 'antd';
import DisasterItem from './DisasterItem/DisasterItem';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import dayjs from 'dayjs';

const columns = [
  {
    title: 'Data',
    dataIndex: 'creationDate',
    render: v => v ? dayjs(v.toDate()).format('DD-MM-YYYY HH:mm:ss') : null,
  },
  {
    title: 'Categoria',
    key: 'category',
    dataIndex: 'category',
  },
  {
    title: 'Descrição',
    key: 'description',
    dataIndex: 'description',
  },
];
class Disasters extends React.Component {
  render() {
    console.log(this.props.disasters);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Header
          extra={[
            <Link to="/desastres/criar">
              <Button key="1" type="primary">
                Registrar desastre
              </Button>
            </Link>,
          ]}
        />
        <div style={{ margin: 20 }}>
          <Table dataSource={this.props.disasters} columns={columns} />;
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  disasters: state.disasters.disasters,
});

export default connect(mapStateToProps)(Disasters);
