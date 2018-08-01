import React from 'react';
import PropTypes from 'prop-types';

const Interest = (props) =>{
    return (
        <div>
           {props.isEditing ? <input placeholder={props.interest}/> : <span>{props.interest}</span>}

        </div>
    )
}


Interest.propTypes = {
    Interest: PropTypes.node
}

export default Interest;
