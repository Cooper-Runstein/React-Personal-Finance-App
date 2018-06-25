import React from 'react';
import PropTypes from 'prop-types'

const Main = (props) =>{
    return(
        <div id="Main">
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
    )
}

Main.propTypes = {
    updateInitialSavings: PropTypes.func.isRequired,
    initialSavings: PropTypes.number.isRequired
}
export default Main;

