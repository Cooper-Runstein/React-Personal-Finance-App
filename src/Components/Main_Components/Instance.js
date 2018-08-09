import React from 'react';
import PropTypes from 'prop-types';

import Title from "./Title";
import Value from "./Value";
import Interest from "./Interest";


const Instance = (props) =>{
    return(

            <div className="main-instance">
                <Title
                  title = {props.title}
                  yearIndex = {props.yearIndex}
                  type = {props.type}
                  instanceIndex = {props.instanceIndex}

                  isEditing = {props.isEditing}
                  pendingTitle = {props.pendingTitle}
                  onChange = {props.onChange}
                />

                <Value
                  interest = {props.interest}
                  yearIndex = {props.yearIndex}
                  type = {props.type}
                  instanceIndex = {props.instanceIndex}

                  value = {props.value}
                  isEditing = {props.isEditing}
                  pendingValue = {props.pendingValue}
                  onChange = {props.onChange}
                />

                {
                  (props.type === 'debt' || props.type === 'savings')

                  ?

                  <Interest
                  isEditing = {props.isEditing}
                  interest = {parseFloat(props.interest)}

                  />

                  :

                  null
                }


                {
              !props.isEditing ?

              <button
                onClick = {props.editEntry}>Edit</button>

              :
                  <button
                    onClick = {props.onConfirm}>Confirm</button>
            }
                <button
                  onClick = {props.removeInstance}>Remove</button>
          </div>
    );
}

Instance.propTypes = {
  removeInstance: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired
}
export default Instance;
