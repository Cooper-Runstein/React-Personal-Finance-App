import React from 'react';
import PropTypes from 'prop-types';

import StartDuratoinalForm from './StartDurationalForm';
const StartInstanceForm = (props)=> {

    const activeForm = ()=>{

      return (
        <div>
          <div className="start-sub-category-instances">

              <div className="start-input-container"> title:
                <input
                    placeholder = {props.title}
                    value = {props.pendingTitle}
                    id={`title-${props.type}-${props.instanceIndex}`}
                    onChange={props.onChange}
                />
              </div>

              <div className="start-input-container"> value:
                <input
                    placeholder = {props.value}
                    value = {props.pendingValue}
                    id={`value-${props.type}-${props.instanceIndex}`}
                    onChange={props.onChange}

                />
              </div>

              {props.isDurational() ? <StartDuratoinalForm /> : null}

              {/* <div className="start-input-container"> interest/growth: <input
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
              /> */}

            </div>

            <div className="start-instance-buttons">
              <button
                  onClick={props.onConfirm}
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
            {props.isEditing ? activeForm() : staticForm()}
        </div>
    )
}

StartInstanceForm.propTypes = {
    // title: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired
}

export default StartInstanceForm;
