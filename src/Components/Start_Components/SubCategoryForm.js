import React from 'react';
import PropTypes from 'prop-types';

const SubCategoryForm = (props)=> {

    const editingForm = (e,i)=>{
      return (
        <div className="start-sub-category-instances">
        <div key={i} className="start-instance">
            <div className="start-input-container"> title: <input
                placeholder = {e.title}
                value = {e.pendingTitle}
                id={`title-${props.type}-${props.catIndex}-${i}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            <div className="start-input-container"> value: <input
                placeholder = {e.value}
                value = {e.pendingValue}
                id={`value-${props.type}-${props.catIndex}-${i}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            <div className="start-input-container"> duration: <input
                placeholder = {e.duration}
                value = {e.pendingDuration}
                id={`duration-${props.type}-${props.catIndex}-${i}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            <div className="start-input-container"> interest/growth: <input
                placeholder = {e.interest}
                value = {e.pendingInterest}
                id={`interest-${props.type}-${props.catIndex}-${i}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            <div className="start-input-container"> growth period: <input
                placeholder = {e.length}
                value = {e.pendingLength}
                id={`length-${props.type}-${props.catIndex}-${i}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            </div>
            <div className="start-instance-buttons">
                <button
                    onClick={()=> props.onConfirm(props.type, props.catIndex, i)}> Confirm </button>
                <button
                    onClick={()=> props.removeInstanceAt(props.type, props.catIndex, i)}>Remove</button>
            </div>

        </div>
      )
    }

    const staticForm = (e,i)=>{
      return (
        <div key={i}>
                    <span>{e.title}</span>
                    <span>{e.value}</span>
                    <button
                        onClick={()=> props.onEditAt(props.type, props.catIndex, i)}> Edit </button>
                    <button
                        onClick={()=> props.removeInstanceAt(props.type, props.catIndex, i)}>Remove</button>
                </div>
      )
    }

    return (
        <div className="start-sub-category-form">
            <h3 className="start-sub-category-title">{props.title}</h3>

            {props.subCat.instances.map((e,i)=> e.isEditing ? editingForm(e,i) : staticForm(e,i))}

            <div className="start-add-button-container">
                <button onClick={ props.addInstance }>Add</button>
            </div>
        </div>
    )
}

SubCategoryForm.propTypes = {
    // title: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired
}

export default SubCategoryForm;
