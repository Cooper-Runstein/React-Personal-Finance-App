import React from 'react';
import PropTypes from 'prop-types';

const Value = (props) =>{
    return (
        props.isEditing ? 
        <div>
            <input 
                placeholder={Number.isNaN(parseFloat(props.value)) ? props.value : props.value * (parseFloat(props.interest) ** props.yearIndex)}
                onChange={(e)=> {props.onChangeVal(e, props.location)}}
            />
            <input 
                placeholder={parseFloat(props.interest)}
                onChange = {(e)=> {props.onChangeInt(e, props.location)}}
            />
        </div>
        

        :

        <span> Amount:{Number.isNaN(parseFloat(props.value)) ? props.value : props.value * (parseFloat(props.interest) ** props.yearIndex)}</span>
    )
}

Value.propTypes = {
    value: PropTypes.node
}

export default Value;