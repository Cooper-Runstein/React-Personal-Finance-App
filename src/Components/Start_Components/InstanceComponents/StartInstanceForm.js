import React from 'react';
import PropTypes from 'prop-types';

import StartDurationalForm from './StartDurationalForm';
import StartExpensesLinkForm from './StartExpensesLinkForm';
import StartStandardForm from './StartStandardForm';

const StartInstanceForm = (props)=> {

    const activeForm = ()=>{

      return (
        <div>
          <div className = "start-input-forms-container">

            <StartStandardForm
              name = 'title'
              description = {'Give this a title: '}
              category = {props.title}
              pendingCategory = {props.pendingTitle}
              onChange = {props.onChange}
              id = { `title-${props.type}-${props.instanceIndex}` }
            />

            <StartStandardForm
              name = 'value'
              description = {'Give this a vaule: '}
              category = {props.value}
              pendingCategory = {props.pendingValue}
              onChange = {props.onChange}
              id = { `value-${props.type}-${props.instanceIndex}`}
            />

            {
              //This ternary displays duration componenet if category type is durational
            props.isDurational()

            ?

            <div>
              <StartDurationalForm
                growth = {props.interest}
                pendingGrowth = {props.pendingInterest}
              />
              <span>
                <input
                  type = 'checkbox'
                  checked={props.duration === 'retirement' ? true : false}
                  onChange={props.setDurationToRetirement}
                />Continue Till Retirment
              </span>

              <StartStandardForm
                name = 'duration period'
                category = {props.length}
                description = {'For how many years will this instance be applicable?'}
                pendingCategory = {props.pendingLength}
                onChange = {props.onChange}
                id = {`duration-${props.type}-${props.instanceIndex}`}
              />
            </div>

            :

            <StartStandardForm
            name = 'interest'
            description = 'If applicable, enter interest'
            category = { props.interest }
            pendingTitle = { props.pendingInterest }
            onChange = { props.onChange }
            id = { `interest-${props.type}-${props.instanceIndex}` }
            />
          }
          {
            //This ternary returns form for expense link checks if type is expenses
            props.type === 'expenses'
            ?
            <StartExpensesLinkForm
              debts = { props.debts }
              instanceIndex = { props.instanceIndex }
              handleChange = { props.handleConnectedSelctionChange }
              connectedIndex = { props.connectedIndex }
              debts = { props.debts }
              display = { props.displayLinkOptions }
              toggleDisplay = { props.toggleDisplayLinkOptions }
              handleSubmit = { props.handleLinkSubmit }



            />
            :
            null
          }

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
