import React from 'react';
import PropTypes from 'prop-types';

const Instance = (props) =>{

    return(
        <div id="instance">
            <h4>{props.instance.title}- Amount:{props.instance.value}</h4>
            <button 
                className="editButton"
                onClick={props.editInstance}>
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
