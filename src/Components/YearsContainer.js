import React from 'react';
import PropTypes from 'prop-types';

const YearsContainer = (props) =>{

    const yearsToGenerate = (props) =>{
        console.log('Generating Rows')
        let currentYear = props.date;
        console.log(currentYear)
        let retirmentYear = parseFloat(props.retirmentYear);
        console.log(retirmentYear)
        let yearsToRetirement = retirmentYear - currentYear;
        console.log(yearsToRetirement)
        let html = '';
        for (let i = 0; i < yearsToRetirement; i++){
            <Year />
        }
        return html;
    }
    
    return(
        <div id="years-container">
            <h1>Years Container</h1>
            <div>
                {yearsToGenerate(props)}
            </div>
        </div>
    )
}

YearsContainer.propTypes = {
    debt: PropTypes.number.isRequired
}
export default YearsContainer;