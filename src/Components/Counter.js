import React from 'react';

const Counter = (props) =>{
    return(
        <div id="counter"><span>Savings: ${props.savings}</span><span>Debt: ${props.debt}</span></div>
    )
}

export default Counter;

