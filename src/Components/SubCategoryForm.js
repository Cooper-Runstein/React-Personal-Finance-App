import React from 'react';
import PropTypes from 'prop-types';

const SubCategoryForm = (props)=> {
    return (
        <div>
            {props.subCat.entries.map((e,i)=>{
                return (
                e.isEditing 
                
                ?
                
                <div key={i}>
                    <input placeholder = {e.title}/>
                    <input placeholder = {e.value}/>
                    <button onClick={()=> props.onEditAt(props.type, props.catIndex, i)}> Confirm </button>
                    <button onClick={()=> props.removeInstanceAt(props.type, props.catIndex, i)}>Remove</button>
                </div>

                :

                <div key={i}>
                    <span>{e.title}</span>
                    <span>{e.value}</span>
                    <button onClick={()=> props.onEditAt(props.type, props.catIndex, i)}> Edit </button>
                    <button onClick={()=> props.removeInstanceAt(props.type, props.catIndex, i)}>Remove</button>
                </div>
                )
            })}
        <button onClick={ props.addInstance }>Add</button>
        </div>
    )
}

SubCategoryForm.propTypes = {
    // title: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired
}

export default SubCategoryForm;
