import { List, message, Avatar, Spin, Row, Col } from 'antd';
import reqwest from 'reqwest';
import './InfoList.css';

import InfiniteScroll from 'react-infinite-scroller';
import * as React from 'react';
import { firestore } from '../../lib/firebase';
import Button from 'antd/es/button';
import CustomTag from '../Tag';

class InfoList extends React.Component {
  render() {
    return (
      <InfiniteScroll pageStart={0} useWindow={false}>
        <List
          header={
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              <CustomTag>Atingidos</CustomTag>

              <CustomTag>Em risco</CustomTag>

              <CustomTag>Feridos</CustomTag>

              <CustomTag>Fora de risco</CustomTag>

              <CustomTag>Óbitos</CustomTag>
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
