import React from 'react';
import PropTypes from 'prop-types'

const Main = (props) =>{
    const formInfo = [{
        name: "Set Savings",
        placeholder: "Enter Starting Savings",
        value: props.startingValues.pendingSavings,
        onChange: props.updatePendingSavings,
        onClick: props.savePendingSavings
    },
    {
        name: "Set Debt",
        placeholder: "Enter Starting Debt",
        value: props.startingValues.initalDebt,
        onChange: props.updatePendingDebt,
        onClick: props.savePendingDebt
    },
    {
        name: "Set Retirment Year",
        placeholder: "Enter Retirment Year",
        value: props.startingValues.pendingRetirment,
        onChange: props.updatePendingRetirment,
        onClick: props.savePendingRetirment
    }]
   
    return(
        <div id="Main">
            <div>
                <form id="starting-form">
                    <input
                        placeholder= {formInfo[props.startingValues.startFormStatus].placeholder}
                        onChange = {formInfo[props.startingValues.startFormStatus].onChange}
                    >
                    </input>
                    <button
                    onClick= {formInfo[props.startingValues.startFormStatus].onClick}
                    >{formInfo[props.startingValues.startFormStatus].name}
                    </button>
                </form>
            </div>
        </div>
    )
}

Main.propTypes = {
    updateInitialSavings: PropTypes.func.isRequired,
    initialSavings: PropTypes.number.isRequired
}
export default Main;

