import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;


class CustomTag extends React.Component {
  state = { checked: false };

  handleChange = checked => {
    this.props.handleChange(checked)
  };

  render() {
    return (
      <CheckableTag {...this.props} checked={this.props.checked} onChange={this.handleChange} />
    );
  }
}

export default CustomTag;