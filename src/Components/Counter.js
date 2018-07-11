import React from 'react';
import PropTypes from 'prop-types';

const Counter = (props) =>{
   
    let netWorthColor = (props)=>{
        let color;
        if (props.savings > props.debt){
            color = "green"
        }
        else if (props.savings === props.debt){
            color = "yellow"
        }
        else if (props.savings < props.debt){
            color = "red"
        }
        return {color: color}
    }

    let getYearsToRetirment = (props) =>{
        let currentYear = parseFloat(new Date().getFullYear());
        let yearsToRetirement = props.retirment - currentYear;
        if (yearsToRetirement > 0){
            return "Years To Retirment:" + yearsToRetirement;
        }
    }
    
    return(
        <div id="counter">
            <span>Savings: ${props.savings}</span>
            <span>Debt: ${props.debt}</span>
            <span style={netWorthColor(props)}>Net Worth: ${props.savings - props.debt}</span>
            <span>{getYearsToRetirment(props)}</span>
            <span> income: {props.income} </span>
            <span>expense: {props.expense}</span>
        </div>
    )
}

Counter.propTypes = {
    debt: PropTypes.number.isRequired,
    // getIncome: PropTypes.number,
    // getExpenses: PropTypes.number,
}
export default Counter;