import React from 'react';
import PropTypes from 'prop-types';

const StartStandardForm = (props)=>{
  const greyedDiv = {
    color: 'gray'
  }
  const fullDiv = {
    color: 'black'
  }

  return (
      <div className={`start-${props.name}-container`} style={props.active === 'off' ? greyedDiv : fullDiv}>
        <p>{props.description}</p>
        {props.name}:
        {
            !(props.active === 'off')

            ?

            <input
                placeholder = {props.category}
                value = {props.pendingCategory}
                id = {props.id}
                onChange = {props.onChange}
            />

          :

          (
          <input
          placeholder = {props.category}
                value = {props.pendingCategory}
                id = {props.id}
                onChange = {props.onChange}
                disabled
          />
          )

        }

    </div>
)
}

StartStandardForm.propTypes = {
    growth: PropTypes.number,
    pendingGrowth: PropTypes.string
}

export default StartStandardForm;
