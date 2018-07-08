import React from 'react';
import PropTypes from 'prop-types';

const Value = (props) =>{
    return (
        props.isEditing ? 
        <input 
            placeholder={props.value} /> 
        
        :

        <span> Amount:{props.value}</span>
    )
}

Value.propTypes = {
    
}

export default Value;
