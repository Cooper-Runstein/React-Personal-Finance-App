import React from 'react';
import PropTypes from 'prop-types';


import Title from './Title';
import Value from './Value';

const ConfirmButton = props => props.instance.isEditing ? <button onClick={props.onClick}>Confirm</button> : false;

const Instance = (props) =>{
    return(
        <div>
            <Title 
                title= {props.instance.title}
                isEditing = {props.instance.isEditing}
                pendingTitle = {props.instance.pendingTitle}
                onChange= {props.onChangeTitle}
            /> 
            <Value 
                value= {props.instance.value}
                isEditing = {props.instance.isEditing}
                pendingValue = {props.instance.pendingValue}
                onChange= {props.onChangeValue}
            />
            <ConfirmButton 
                instance={props.instance}
                onClick={props.onConfirm}
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
    editInstance: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    removeEntry: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
}

export default Instance;
