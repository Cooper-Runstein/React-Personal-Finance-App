import React from 'react';
import PropTypes from 'prop-types';

export default class Counter extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        currentNetColor: "green",
        netWorth: 5000,

    }
    }
    netWorthColor = ()=>{
        let color;
        if (this.props.netWorth > 0){
            color = "green"
        }
        else if (this.props.netWorth === 0){
            color = "yellow"
        }
        else if (this.props.netWorth < 0){
            color = "red"
        }
        return {'color': color}
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
        <div id="counter" className="counter-container">
            <span>Savings: ${this.props.savings}</span>
            <span>Debt: ${this.props.debt}</span>
            <span style={this.netWorthColor()}>Net Worth: ${this.props.netWorth}</span>
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
