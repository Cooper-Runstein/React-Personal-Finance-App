import React from 'react';
import PropTypes from 'prop-types';

const Instance = (props) =>{

    return(
        <div id="instance">
            <span>{props.instance.title}</span><span> Amount:{props.instance.value}</span>
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
