import React from 'react';
import PropTypes from 'prop-types';

const Year = (props) =>{
    return(
        <div className="Year">
            <h2>{props.year.year}</h2>
        </div>
    )
}

Year.propTypes = {
    year: PropTypes.object.isRequired
}
export default Year;