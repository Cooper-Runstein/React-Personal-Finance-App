import React from 'react';
import PropTypes from 'prop-types';

import Title from './Title';
import Value from './Value';


const Instance = (props) =>{
    return(
        <div id="instance">
            <Title 
                    title= {props.instance.title}
            /> 
            <Value 
                value= {props.instance.value}
            />
            <button 
                className="editButton"
                onClick={props.editInstance}
            >
                Edit
            </button>
            <button 
                className="removeButton">
                Remove
            </button>
        </div>
    )
}

Instance.propTypes = {
    instance: PropTypes.object.isRequired,
    editInstance: PropTypes.func.isRequired

}
export default Instance;
