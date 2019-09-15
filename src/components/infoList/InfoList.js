import { List, message, Avatar, Spin, Row, Col } from 'antd';
import reqwest from 'reqwest';
import './InfoList.css';

import InfiniteScroll from 'react-infinite-scroller';
import * as React from 'react';
import { firestore } from '../../lib/firebase';
import Button from 'antd/es/button';
import CustomTag from '../Tag';
import Constants from '../../lib/constants'

class InfoList extends React.Component {
  render() {
      console.log(this.props.disaster)
    return (
      <InfiniteScroll pageStart={0} useWindow={false}>
        <List
          header={
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                {Object.entries(Constants.situations)
                    .map(([key, value]) => <CustomTag>{value} ({this.props.disaster.situations[key]})</CustomTag>)}
              

            </div>
          }
          dataSource={this.props.disaster.peoble || []}
          renderItem={item => (
            <List.Item key={item.name}>
              <List.Item.Meta title={<a href="">{item.name}</a>} />
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    );
  }
}

export default InfoList;
