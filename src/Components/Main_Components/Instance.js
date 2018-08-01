import React from 'react';
import PropTypes from 'prop-types';

import AddInstanceButton from './AddInstanceButton';
import Title from "./Title";
import Value from "./Value";
import Interest from "./Interest";


const Instance = (props) =>{
    //const totalValue = ()=>props.category.instances.reduce((sum, entry)=>{ return sum + parseFloat(entry.value)}, 0)
    console.log(props.title  + props.interest)
    return(

            <div>
                <Title
                  title = {props.title}
                  yearIndex = {props.yearIndex}
                  type = {props.type}
                  instanceIndex = {props.instanceIndex}

                  isEditing = {props.isEditing}
                  pendingTitle = {props.pendingTitle}
                  onChange = {props.onChange}
                  // location = {props.location}
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
                  //onChangeVal = {props.onChangeValue}
                  //onChangeInt = {props.onChangeInterest}
                  //location = {props.location}

                />
                {
                  (props.type === 'debt' || props.type === 'savings')

                  ?

                  <Interest
                  isEditing = {props.isEditing}
                  interest = {parseFloat(props.interest)}
                    //onChange = {(e)=> {props.onChangeInt(e, props.location)}}
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
    title: PropTypes.string.isRequired
}
export default Instance;
