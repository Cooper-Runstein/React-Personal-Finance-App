import React from 'react';
import PropTypes from 'prop-types';
import Year from './Year';

const YearsContainer = (props) =>{
    
    return(
        <div id="years-container">
            <h1>Years Container</h1>
            <table>
                <tbody>
                    {props.years.map((y, i)=>{
                        return <Year 
                                key={i}
                                year= {y}
                                editEntry = {props.editEntry}
                            />
                    })}
                </tbody>
            </table>
        </div>
    )
}

YearsContainer.propTypes = {
    startingDebt: PropTypes.number.isRequired,
    startingSavings: PropTypes.number.isRequired,
    years: PropTypes.array.isRequired
}
export default YearsContainer;