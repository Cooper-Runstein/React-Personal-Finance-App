import React from 'react';
import PropTypes from 'prop-types';

const Value = (props) =>{
    return (
        props.isEditing ?
        <div>
            <input
                placeholder={props.value}
                onChange={(e)=> {props.onChange(props.yearIndex, props.type, props.instanceIndex, e, 'value')}}
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
