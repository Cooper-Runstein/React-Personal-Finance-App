import React from 'react';
import PropTypes from 'prop-types';


const ConfirmButton = (props) => props.instance.isEditing ? <button onClick={props.onClick}>Confirm</button> : false;
    

ConfirmButton.propTypes = {
   
}

export default ConfirmButton;
