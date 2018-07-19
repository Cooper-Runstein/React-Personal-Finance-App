import React from 'react';
import PropTypes from 'prop-types';

const Interest = (props) =>{
    return (
        <input 
                placeholder={props.interest}
                onChange={props.onChange}
            />
    )
}


Interest.propTypes = {
    Interest: PropTypes.node
}

export default Interest;
