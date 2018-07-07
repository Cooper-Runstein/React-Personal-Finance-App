import React from 'react';
import PropTypes from 'prop-types';

const Instance = (props) =>{

    const getTitle = (object)=>{
        for(let key in object){
            if(object.hasOwnProperty(key)) {
                return key;
            }
        }
        
    }
    const getValues= (object) =>{
        let key = getTitle(object);
        return object[key] 
    }
    return(
        <div id="instance">
            <h4>{getTitle(props.instance)}- Amount:{getValues(props.instance)}</h4>
            <button 
                className="editButton">
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
    debt: PropTypes.number.isRequired
}
export default Instance;
