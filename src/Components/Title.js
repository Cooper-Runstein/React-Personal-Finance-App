import React from 'react';
import PropTypes from 'prop-types';

const Title = (props) => {
    return (props.isEditing ? 
        <input 
            placeholder={props.title}
             /> 

        : 

        <span> {props.title} </span>
    )}
    


Title.propTypes = {
    
}

export default Title;
