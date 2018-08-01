import React from 'react';
import PropTypes from 'prop-types';

const StartStandardForm = (props)=>{
  const greyedDiv = {
    color: 'grey'
  }
  const fullDiv = {
    color: 'inherit'
  }
  return (
      <div className={`start-${props.name}-container`} style={props.active ? fullDiv : greyedDiv }>
        <p>{props.description}</p>
        {props.name}:<input
              placeholder = {props.category}
              value = {props.pendingCategory}
              id = {props.id}
              onChange = {props.onChange}
        />
    </div>
)
}

StartStandardForm.propTypes = {
    growth: PropTypes.number,
    pendingGrowth: PropTypes.string
}

export default StartStandardForm;
