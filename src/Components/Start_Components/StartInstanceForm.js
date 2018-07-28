import React from 'react';
import PropTypes from 'prop-types';

import StartDurationalForm from './StartDurationalForm';
import StartIncomeLinkForm from './StartIncomeLinkForm';
import StartStandardForm from './StartStandardForm';

const StartInstanceForm = (props)=> {

    const activeForm = ()=>{

      return (
        <div>
        <div>
          <StartStandardForm
            category = {props.title}
            pendingTitle = {props.pendingTitle}
            onChange = {props.onChange}
            id = { `title-${props.type}-${props.instanceIndex}`}
          />

          <StartStandardForm
            category = {props.value}
            pendingTitle = {props.pendingValue}
            onChange = {props.onChange}
            id = { `value-${props.type}-${props.instanceIndex}`}
          />

          {
          props.isDurational()
          ?
          <StartDurationalForm
            growth = {props.interest}
            pendingGrowth = {props.pendingInterest}

          />
          :
          <StartStandardForm
          category = {props.interest}
          pendingTitle = {props.pendingInterest}
          onChange = {props.onChange}
          id = { `interest-${props.type}-${props.instanceIndex}`}
          />
        }

              {
                /*
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
