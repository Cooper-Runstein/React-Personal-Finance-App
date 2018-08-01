import React from 'react';
import PropTypes from 'prop-types';
import Year from './Year';

const YearsContainer = (props) =>{

    return(
        <div id="years-container">
            <h1>Years Container</h1>
            <table>
                <tbody>
                    {props.years.map((y, i)=>{
                        return <Year
                                key = {i}
                                yearIndex = {i}
                                year = {y}
                                toggleEditEntry = {props.toggleEditEntry}
                                onChange = {props.onChange}
                                onConfirmAt = {props.onConfirmAt}
                                removeInstanceAt = {props.removeInstanceAt}
                                addInstance = {props.addInstance}
                            />
                    })}
                </tbody>
            </table>
        </div>
    )
}

YearsContainer.propTypes = {
    years: PropTypes.array.isRequired,
}

export default YearsContainer;
