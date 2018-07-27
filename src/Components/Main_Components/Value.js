import React from 'react';
import PropTypes from 'prop-types';
import Interest from './Interest';

const Value = (props) =>{
    return (
        props.isEditing ?
        <div>
            <input
                placeholder={props.value}
                //onChange={(e)=> {props.onChangeVal(e, props.location)}}
            />
            <Interest
                //interest = {parseFloat(props.interest)}
                onChange = {(e)=> {props.onChangeInt(e, props.location)}}
            />

        </div>


        :

        <span> Amount: {props.value}
        {//Number.isNaN(parseFloat(props.value)) ? props.value : props.value * (parseFloat(props.interest) ** props.yearIndex)
        }
        </span>
    )
}

Value.propTypes = {
    value: PropTypes.node
}

export default Value;
