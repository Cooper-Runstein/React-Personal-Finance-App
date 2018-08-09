import React from 'react';
import PropTypes from 'prop-types';

const Value = (props) =>{
    return (
        props.isEditing ?
        <div>
            value: <input
                placeholder={ Math.round(props.value * 100) / 100}
                onChange={(e)=> {props.onChange(props.yearIndex, props.type, props.instanceIndex, e, 'value')}}
            />
        </div>


        :

        <span> Amount: {Math.round(props.value * 100) / 100}
        </span>
    )
}

Value.propTypes = {
    value: PropTypes.node
}

export default Value;
