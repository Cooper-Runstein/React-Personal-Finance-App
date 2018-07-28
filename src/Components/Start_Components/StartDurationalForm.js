import React from 'react';
import PropTypes from 'prop-types';

const StartDurationalForm = (props)=>{
  return (
    <div className="start-growth-container">
    <p>Enter Annual Increase/Decrease, stagnant growth is 0</p>
    <p>Annual Value Growth: </p>
      <input
          placeholder = {props.growth}
          value = {props.pendingGrowth}
          id = {`growth-${props.type}-${props.instanceIndex}`}
      />
    </div>
)
}

StartDurationalForm.propTypes = {
    growth: PropTypes.number.isRequired,
    pendingGrowth: PropTypes.string.isRequired
}

export default StartDurationalForm;
