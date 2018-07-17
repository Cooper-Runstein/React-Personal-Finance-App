import React from 'react';
import PropTypes from 'prop-types';

const Value = (props) =>{
    return (
        props.isEditing ? 
        <input 
            placeholder={props.value}
            onChange={props.onChange} /> 
        

        :

        <span> Amount:{props.value * (props.interest ** props.yearIndex)}</span>
    )
}

Value.propTypes = {
    value: PropTypes.node
}

export default Value;
