import React from 'react';
import PropTypes from 'prop-types';

const EditButton = (props) => {
    return (
        props.isEditing ? 
        <button 
            className="revertButton"
            onClick={props.editInstance}
        >
            Revert
        </button>

        : 

        <button 
            className="editButton"
            onClick={props.editInstance}
        >
        Edit
    </button>
       
    )
}

EditButton.propTypes = {
    editInstance: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired
}

export default EditButton;
