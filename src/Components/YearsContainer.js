import React from 'react';
import PropTypes from 'prop-types';
import Year from './Year';

const YearsContainer = (props) =>{
    
    return(
        <div id="years-container">
            <h1>Years Container</h1>
            <div>
                {props.years.map((year, i)=>{
                    <Year 
                        key={i}
                        year = {year.year}
                    />
                })}
            </div>
        </div>
    )
}

YearsContainer.propTypes = {
    debt: PropTypes.number.isRequired
}
export default YearsContainer;