import {List, message, Avatar, Spin, Row, Col} from 'antd';
import reqwest from 'reqwest';
import './InfoList.css';

import InfiniteScroll from 'react-infinite-scroller';
import * as React from "react";
import {firestore} from "../../lib/firebase";
import Button from "antd/es/button";

class InfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };

        this.filterOutRisk = this.filterOutRisk.bind(this);
    };

    componentDidMount() {
        
    };

    filterOutRisk() {

    };

    render() {
        return (
            <div className="demo-infinite-container">
                <InfiniteScroll
                    pageStart={0}
                    useWindow={false}
                >
                    <List
                        header={
                            <Row>
                                <Col span={4}>
                                    <Button onClick={this.filterOutRisk}>FR</Button>
                                </Col>
                                <Col span={4}>
                                    <Button>ER</Button>
                                </Col>
                                <Col span={4}>
                                    <Button>NI</Button>
                                </Col>
                                <Col span={4}>
                                    <Button>ER</Button>
                                </Col>
                                <Col span={4}>
                                    <Button>OB</Button>
                                </Col>
                            </Row>
                        }
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item key={item.name}>
                                <List.Item.Meta
                                    title={<a href="">{item.name}</a>}
                                />
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}

export default InfoList;