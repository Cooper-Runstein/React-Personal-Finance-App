import React from 'react';
import PropTypes from 'prop-types'

const Main = (props) =>{
    return(
        <div id="Main">
        <div id="initial_savings">
            <form>
                <input
                    placeholder="Enter Starting Savings"
                    value = {props.initalSavings}
                    onChange = {props.updateInitialSavings}
                >
                </input>
                <button
                onClick= {props.saveInitialSavings}
                >Set Initial Savings
                </button>
            </form>
        </div>
        <div id="initial_debt">
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
        </div>
    )
}

Main.propTypes = {
    updateInitialSavings: PropTypes.func.isRequired,
    initialSavings: PropTypes.number.isRequired
}
export default Main;

