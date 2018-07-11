import React from 'react';
import PropTypes from 'prop-types';

const SubCategoryForm = (props)=> {
    return (
        <div>
            {props.subCat.entries.map((e,i)=>{
                return (
                e.isEditing 
                
                ?
                
                <div>
                    <input placeholder = {e.title}/>
                    <input placeholder = {e.value}/>
                    
                </div>

                :

                <div>
                    <span>{e.title}</span>
                    <span>{e.value}</span>
                </div>
                )
            })}
        <button>Add</button>
        </div>
    )
}

SubCategoryForm.propTypes = {
    // title: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired
}

export default SubCategoryForm;
