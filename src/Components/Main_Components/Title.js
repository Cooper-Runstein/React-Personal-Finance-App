import React from 'react';
import PropTypes from 'prop-types';

const Title = (props) => {
    return (
        props.isEditing ?
        <input
            placeholder= {props.title}
            onChange= {(e)=> props.onChange(props.yearIndex, props.type, props.instanceIndex, e, 'title')}
        />

        :

        <span> {props.title} </span>
    )
}


Title.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Title;
