import React from 'react';


const DisasterItem = (props) => {
  return (
    <div style={{padding: 15, border: '1px solid grey'}}>
      <h4>{props.title}</h4>
      <p>Categoria: {props.category}</p>      
      <p>{props.description}</p>
      <p>{props.date}</p>
    </div>
  )
}



export default DisasterItem;