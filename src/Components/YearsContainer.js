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
                                editEntry = {props.editEntry}
                                removeEntry = {props.removeEntry}
                                onChangeValue = {props.onChangeValue}
                                onChangeTitle = {props.onChangeTitle}
                                onConfirm = {props.onConfirm}
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
    editEntry: PropTypes.func.isRequired,
    removeEntry: PropTypes.func.isRequired,
    onChangeValue:  PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    addInstance: PropTypes.func.isRequired
}

export default YearsContainer;