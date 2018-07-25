import React from 'react';
import PropTypes from 'prop-types';

const StartInstanceForm = (props)=> {
    const activeForm = (e, i, type)=>{
      let longTerm;
      (type === "savings" || type === "debt") ? longTerm = true : longTerm = false;
      const durationInput = ()=>{
        return (
        <div
          className="start-input-container"> duration: <input
          placeholder = {props.duration}
          value = {props.pendingDuration}
          id={`duration-${props.type}-${props.instanceIndex}`}
          onChange={()=> props.onChange(props.type, props.catIndex, i)}
          />
      </div>
        )
      }
      return (
        <div className="start-sub-category-instances">
        <div key={i} className="start-instance">
            <div className="start-input-container"> title: <input
                placeholder = {props.title}
                value = {props.pendingTitle}
                id={`title-${props.type}-${props.instanceIndex}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            <div className="start-input-container"> value: <input
                placeholder = {props.value}
                value = {props.pendingValue}
                id={`value-${props.type}-${props.instanceIndex}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            {/* {!longTerm ? durationInput() : false} */}
            <div className="start-input-container"> interest/growth: <input
                placeholder = {props.interest}
                value = {props.pendingInterest}
                id={`interest-${props.type}-${props.instanceIndex}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            <div className="start-input-container"> growth period: <input
                placeholder = {props.length}
                value = {props.pendingLength}
                id={`length-${props.type}-${props.instanceIndex}`}
                onChange={()=> props.onChange(props.type, props.catIndex, i)}
            />
            </div>
            </div>
            <div className="start-instance-buttons">
            <button
                onClick={props.onEdit}
                > Confirm </button>
            <button
                onClick={props.onRemove}
              >Remove</button>
            </div>

        </div>
      )
    }

    const staticForm = ()=>{
      return (
        <div>
          <span>{props.title}</span>
          <span>{props.value}</span>
          <button
              onClick={props.onEdit}
              > Edit </button>
          <button
              onClick={props.onRemove}
            >Remove</button>
        </div>
      )
    }

    return (
        <div className="start-sub-category-form">
            <h3 className="start-sub-category-title">{props.title}</h3>
            {/* {//<h4 className="start-sub-category-desc">{props.description}</h4>}
            */}

            {props.isEditing ? activeForm() : staticForm()}

        </div>
    )
}

StartInstanceForm.propTypes = {
    // title: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired
}

export default StartInstanceForm;
