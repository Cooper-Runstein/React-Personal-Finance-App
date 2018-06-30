import React from 'react';
import PropTypes from 'prop-types';

const Year = (props) =>{
   
    
    return(
        <div id="Year">
            <h2>{props.year}</h2>
        </div>
    )
}

Year.propTypes = {
    year: PropTypes.number.isRequired
}
export default Year;