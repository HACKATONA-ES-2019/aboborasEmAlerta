import React from 'react';
import { Button, PageHeader, Table } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import dayjs from 'dayjs';
import Constants from '../../lib/constants'

const columns = [
  {
    title: 'Data',
    dataIndex: 'creationDate',
    render: v => (v ? dayjs(v.toDate()).format('DD-MM-YYYY HH:mm:ss') : null),
  },
  {
    title: 'Categoria',
    render: v => Constants.disasterTypes[v],
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
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {this.props.history.push('desastresInfo', {record})},
              };
            }}
            dataSource={this.props.disasters}
            columns={columns}
          />
          ;
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  disasters: state.disasters.disasters,
});


export default connect(mapStateToProps)(Disasters);
