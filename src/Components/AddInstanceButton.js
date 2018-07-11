import React from 'react';
import PropTypes from 'prop-types';


const AddInstanceButton = (props) => <button onClick = {props.onClick}>Add</button>
    

AddInstanceButton.propTypes = {
   onClick: PropTypes.func.isRequired
}

export default AddInstanceButton;
