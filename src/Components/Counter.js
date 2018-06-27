import React from 'react';

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
    
    return(
        <div id="counter">
            <span>Savings: ${props.savings}  </span>
            <span>Debt: ${props.debt}  </span>
            <span style={netWorthColor(props)}>Net Worth: ${props.savings - props.debt}</span>
        </div>
    )
}

export default Counter;

