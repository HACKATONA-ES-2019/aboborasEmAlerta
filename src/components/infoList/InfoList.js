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
  state = {
    tags: {
      ...Object.entries(Constants.situations).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: false }),
        {}
      ),
      hit: true,
    },
  };

  onChangeTag = (key, checked) => {
    this.setState(state => ({ tags: { ...state.tags, [key]: checked } }));
  };

  render() {
    console.log(this.state.tags);
    const people = this.state.tags.hit
      ? this.props.disaster.people || []
      : (this.props.disaster.people || []).filter(
          p => this.state.tags[p.situation]
        );
    return (
      <InfiniteScroll pageStart={0} useWindow={false}>
        <List
          header={
            <div
              style={{
                display: 'flex',
                overflowX: 'auto',
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: '10px',
              }}
              className="situations-header"
            >
              {Object.entries(Constants.situations).map(([key, value]) => (
                <CustomTag
                  style={{
                    fontSize: 14,
                    marginLeft: '1vh',
                    marginRight: '1vh',
                  }}
                  checked={this.state.tags[key]}
                  handleChange={checked => this.onChangeTag(key, checked)}
                >
                  {value} ({this.props.disaster.situations[key]})
                </CustomTag>
              ))}
            </div>
          }
          dataSource={people.sort((a, b) => a.name.localeCompare(b.name))}
          renderItem={item => (
            <List.Item key={item.name}>
              <List.Item.Meta
                title={
                  <span style={{ margin: 0, padding: 0, paddingLeft: 10 }}>
                    {item.name}
                  </span>
                }
              />
              <div>
                {
                  <p style={{ margin: 0, padding: 0, paddingRight: 10, fontWeight: 500 }}>
                    {
                      <span
                        style={
                          item.situation in Constants.colors
                            ? { color: Constants.colors[item.situation] }
                            : {}
                        }
                      >
                        {Constants.situations[item.situation]}
                      </span>
                    }
                  </p>
                }
              </div>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    );
  }
}

export default InfoList;
