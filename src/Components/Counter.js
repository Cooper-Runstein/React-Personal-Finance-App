import React from 'react';
import PropTypes from 'prop-types';

export default class Counter extends React.Component {
    constructor(props){
    super(props)
    this.state = {

    }
    }
    netWorthColor = (props)=>{
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

    getYearsToRetirment = (props) =>{
        let currentYear = parseFloat(new Date().getFullYear());
        let yearsToRetirement = props.retirment - currentYear;
        if (yearsToRetirement > 0){
            return "Years To Retirment:" + yearsToRetirement;
        }
    }
    render(){
    return(
        <div id="counter">
            <span>Savings: ${this.props.savings}</span>
            <span>Debt: ${this.props.debt}</span>
            <span style={this.netWorthColor(this.props)}>Net Worth: ${this.props.savings - this.props.debt}</span>
            <span>{this.getYearsToRetirment(this.props)}</span>
            <span> income: {this.props.income} </span>
            <span> expense: {this.props.expense} </span>
        </div>
    )
}
}

Counter.propTypes = {
    debt: PropTypes.number.isRequired,
    // getIncome: PropTypes.number,
    // getExpenses: PropTypes.number,
}