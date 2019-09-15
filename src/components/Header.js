import React from 'react';
import { Button, PageHeader } from 'antd';

export default class Header extends React.Component {
  render() {
    return (
      <PageHeader
        style={{ boxShadow: '0 2px 8px #f0f1f2', zIndex: 20 }}
        title="Desastres"
        {...this.props}
      />
    );
  }
}
