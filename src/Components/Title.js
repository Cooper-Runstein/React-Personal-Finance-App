import React from 'react';
import PropTypes from 'prop-types';

const Title = (props) => {
    return (
        props.isEditing ? 
        <input 
            placeholder= {props.title}
            onChange= {props.onChange}
             /> 

        : 

        <span> {props.title} </span>
    )}
    

Title.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Title;
