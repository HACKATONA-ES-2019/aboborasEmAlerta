import React from 'react';
import * as Styles from './styles';

const DisasterItem = props => {
  return (
    <Styles.Wrapper>
      <div style={{display: 'flex'}}>
        <h4>{props.title}</h4>
        <p>Categoria: {props.category}</p>
        <p>{props.description}</p>
        <p>{props.date}</p>
      </div>
    </Styles.Wrapper>
  );
};

export default DisasterItem;
