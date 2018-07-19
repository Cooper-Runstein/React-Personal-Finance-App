import React from 'react';
import PropTypes from 'prop-types';


import Title from './Title';
import Value from './Value';
import ConfirmButton from './ConfirmButton';


const Instance = (props) =>{
    return(
        <div>
            <Title 
                title = {props.instance.title}
                isEditing = {props.instance.isEditing}
                pendingTitle = {props.instance.pendingTitle}
                onChange = {props.onChangeTitle}
                location = {props.location}
            /> 
            <Value 
                interest = {props.instance.interest}
                yearIndex = {props.yearIndex}
                value = {props.instance.value}
                isEditing = {props.instance.isEditing}
                pendingValue = {props.instance.pendingValue}
                onChangeVal = {props.onChangeValue}
                onChangeInt = {props.onChangeInterest}
                location = {props.location}
    
            />
            <ConfirmButton 
                instance={props.instance}
                onClick={()=> props.onConfirm(props.location)}
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
