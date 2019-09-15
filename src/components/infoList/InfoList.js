import { List, message, Avatar, Spin, Row, Col } from 'antd';
import reqwest from 'reqwest';
import './InfoList.css';

import InfiniteScroll from 'react-infinite-scroller';
import * as React from 'react';
import { firestore } from '../../lib/firebase';
import Button from 'antd/es/button';
import CustomTag from '../Tag';
import Constants from '../../lib/constants';

class InfoList extends React.Component {
  render() {
    console.log(this.props.disaster);
    return (
      <InfiniteScroll pageStart={0} useWindow={false}>
        <List
          header={
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {Object.entries(Constants.situations).map(([key, value]) => (
                <CustomTag>
                  {value} ({this.props.disaster.situations[key]})
                </CustomTag>
              ))}
            </div>
          }
          dataSource={this.props.disaster.people || []}
          renderItem={item => (
            <List.Item key={item.name}>
              <List.Item.Meta
                title={
                  <span style={{ margin: 0, padding: 0, paddingLeft: 10 }}>
                    {item.name}
                  </span>
                }
              />
              <div>{<p style={{margin: 0, padding: 0, paddingRight: 10}}>{Constants.situations[item.situation]}</p>}</div>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    );
  }
}

export default InfoList;
