import React from 'react';
import PropTypes from 'prop-types'

const StartingForm = (props) =>{
    const formInfo = [
        
        {
        title: "How much money have you saved?",
        forms: [
            {
                name: "Set 401k Savings",
                description: "If you have a 401k or similar account, enter it here",
                placeholder: "Enter 401k savings",
                value: props.startingValues.pendingSavings,
                onChange: props.updatePendingSavings,
                onClick: props.savePendingSavings
            }

        ]
       
    },
    {   
        title: "How much money do you owe?",
        forms: [
            {
                name: "Set Debt",
                placeholder: "Enter Starting Debt",
                value: props.startingValues.pendingDebt,
                onChange: props.updatePendingDebt,
                onClick: props.savePendingDebt
            }

        ]
        
    },
    {   
        title: "When do you plan to retire?",
        forms:[
            {
                name: "Set Retirment Year",
                placeholder: "Enter Retirment Year",
                value: props.startingValues.pendingRetirment,
                onChange: props.updatePendingRetirment,
                onClick: props.savePendingRetirment
            }
        ]
        
    }]
   
    return(
        <div>
            <form id="starting-form">
            <h3>{formInfo[props.startingValues.startFormStatus].title}</h3>
                <input
                    placeholder= {formInfo[props.startingValues.startFormStatus].forms[0].placeholder}
                    value= {formInfo[props.startingValues.startFormStatus].forms[0].value}
                    onChange = {formInfo[props.startingValues.startFormStatus].forms[0].onChange}
                >
                </input>
                <button
                onClick= {formInfo[props.startingValues.startFormStatus].forms[0].onClick}
                >{formInfo[props.startingValues.startFormStatus].forms[0].name}
                </button>
            </form>
        </div>
    )
}

StartingForm.propTypes = {
    updatePendingSavings: PropTypes.func.isRequired,
    startingValues: PropTypes.object.isRequired
}
export default StartingForm;

