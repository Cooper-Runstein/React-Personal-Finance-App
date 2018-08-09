import React from 'react';
import PropTypes from 'prop-types';
const StartGrowthForm = (props)=>{
  return (
    <div className="start-growth-container">
    <p>Enter Annual Increase/Decrease, stagnant growth is 0</p>
      {props.pre}<input
          placeholder = {props.growth}
          value = {props.pendingGrowth}
          id = {`growth-${props.type}-${props.instanceIndex}`}
          onChange = {props.onChange}
      />%
    </div>
)
}

StartGrowthForm.propTypes = {
    growth: PropTypes.string.isRequired,
    pendingGrowth: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

}

export default StartGrowthForm;
