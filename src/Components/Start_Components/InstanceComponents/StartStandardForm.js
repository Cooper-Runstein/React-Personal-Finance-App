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
        {
            !(props.active === 'off')
            //Active is only off in a durational component with retirement box checked.
            //This is because duration is set by checkbox, so text input box is turned off

            ?

            //This is the standard input form
            <span>{props.pre}<input
              placeholder = {props.category}
              value = {props.pendingCategory}
              id = {props.id}
              onChange = {props.onChange}
            />{props.post}</span>

          :

          //This only applies when props.category is duration and active is off.
          (
          <span><input
            placeholder = {props.category}
            value = {props.pendingCategory}
            id = {props.id}
            onChange = {props.onChange}
            disabled
          />{props.post}</span>
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
