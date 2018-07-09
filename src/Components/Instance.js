import React from 'react';
import PropTypes from 'prop-types';

import Title from './Title';
import Value from './Value';


const Instance = (props) =>{
    return(
        <div id="instance">
            <Title 
                title= {props.instance.title}
                isEditing = {props.instance.isEditing}
                pendingTitle = {props.instance.pendingTitle}
            /> 
            <Value 
                value= {props.instance.value}
                isEditing = {props.instance.isEditing}
                pendingValue = {props.instance.pendingValue}
            />
            <button 
                className="editButton"
                onClick={props.editInstance}
            >
                Edit
            </button>
            <button 
                className="removeButton"
                onClick={props.removeEntry}>
                Remove
            </button>
        </div>
    )
}

Instance.propTypes = {
    instance: PropTypes.object.isRequired,
    editInstance: PropTypes.func.isRequired

}
export default Instance;
