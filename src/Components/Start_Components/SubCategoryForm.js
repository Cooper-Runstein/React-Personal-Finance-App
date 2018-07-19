import React from 'react';
import PropTypes from 'prop-types';

const SubCategoryForm = (props)=> {
    return (
        <div>
            <h3>{props.title}</h3>
            {props.subCat.instances.map((e,i)=>{
                return (
                e.isEditing 
                
                ?
                
                <div key={i}>
                    <input 
                        placeholder = {e.title} 
                        value = {e.pendingTitle}
                        id={`title-${props.type}-${props.catIndex}-${i}`}
                        onChange={()=> props.onChange(props.type, props.catIndex, i)}
                    />
                    <input 
                        placeholder = {e.value} 
                        value = {e.pendingValue}
                        id={`value-${props.type}-${props.catIndex}-${i}`}
                        onChange={()=> props.onChange(props.type, props.catIndex, i)}
                    />
                    <input 
                        placeholder = {e.interest} 
                        value = {e.pendingInterest}
                        id={`interest-${props.type}-${props.catIndex}-${i}`}
                        onChange={()=> props.onChange(props.type, props.catIndex, i)}
                    />
                    <button 
                        onClick={()=> props.onConfirm(props.type, props.catIndex, i)}> Confirm </button>
                    <button 
                        onClick={()=> props.removeInstanceAt(props.type, props.catIndex, i)}>Remove</button>
                </div>

                :

                <div key={i}>
                    <span>{e.title}</span>
                    <span>{e.value}</span>
                    <button 
                        onClick={()=> props.onEditAt(props.type, props.catIndex, i)}> Edit </button>
                    <button 
                        onClick={()=> props.removeInstanceAt(props.type, props.catIndex, i)}>Remove</button>
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
