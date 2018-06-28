import React from 'react';
import PropTypes from 'prop-types'

const Main = (props) =>{
    const formInfo = [{
        name: "Set Savings",
        placeholder: "Enter Starting Savings",
        value: props.initalSavings,
        onChange: props.updateInitialSavings,
        onClick: props.saveInitialSavings
    },
    {
        name: "Set Debt",
        placeholder: "Enter Starting Debt",
        value: props.initalDebt,
        onChange: props.updateInitialDebt,
        onClick: props.saveInitialDebt
    },
    {}]
    console.log(props.startFormStatus)
    return(
        <div id="Main">
        <div>
            <form id="starting-form">
                <input
                    placeholder= {formInfo[props.startFormStatus].placeholder}
                    value = {formInfo[props.startFormStatus].value}
                    onChange = {formInfo[props.startFormStatus].onChange}
                >
                </input>
                <button
                onClick= {formInfo[props.startFormStatus].onClick}
                >{formInfo[props.startFormStatus].name}
                </button>
            </form>
        </div>
        {/* <div id="initial_debt">
            <form>
                <input
                    placeholder="Enter Starting Debt"
                    value = {props.initalDebt}
                    onChange = {props.updateInitialDebt}
                >
                </input>
                <button
                onClick= {props.saveInitialDebt}
                >Set Initial Debt
                </button>
            </form>
        </div>
        <div id="create_table">
            <form>
                <input
                    placeholder="Enter Year of Retirment"
                    value = {props.retirmentYear}
                    // onChange = {props.updateRetirmentYear}
                >
                </input>
                <button
                // onClick= {props.updateTableLength}
                >Set Initial Debt
                </button>
            </form>
        </div> */}
        </div>
    )
}

Main.propTypes = {
    updateInitialSavings: PropTypes.func.isRequired,
    initialSavings: PropTypes.number.isRequired
}
export default Main;

