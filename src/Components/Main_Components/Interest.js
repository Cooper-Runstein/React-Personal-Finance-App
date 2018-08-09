import React from 'react';
import PropTypes from 'prop-types';

const Interest = (props) =>{
    return (
        <div>
           {props.isEditing ? <span>interest: <input placeholder={props.interest}/></span> : null}

        </div>
    )
}


Interest.propTypes = {
    Interest: PropTypes.node
}

export default Interest;
