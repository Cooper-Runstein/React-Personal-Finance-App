import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import StartGrowthForm from './StartGrowthForm';
import StartExpensesLinkForm from './StartExpensesLinkForm';
import StartStandardForm from './StartStandardForm';


const StartInstanceForm = (props)=> {

    const activeForm = ()=>{

      return (
        <div className="active-container" key='0'>
          <div className = "start-input-forms-container">

            <StartStandardForm
              //Title Form
              name = 'title'
              pre = 'Set Title: '
              description = {'Give this a title: '}
              category = {props.title}
              pendingCategory = {props.pendingTitle}
              onChange = {props.onChange}
              id = { `title-${props.type}-${props.instanceIndex}` }
            />

            <StartStandardForm
              //Value Form
              name = 'value'
              description = {'Give this a vaule: '}
              category = {props.value}
              pendingCategory = {props.pendingValue}
              onChange = {props.onChange}
              pre = {'Set Amount: $'}
              id = { `value-${props.type}-${props.instanceIndex}`}
            />

            {
              //This ternary displays duration componenet if category type is durational or interest if else
            props.isDurational()

            ?

            <div>
              <StartGrowthForm
              //Growth Form
                growth = {props.growth}
                pre = {'Set Growth Percentage: '}
                pendingGrowth = {props.pendingGrowth}
                instanceIndex = {props.instanceIndex}
                type = { props.type }
                onChange = {props.onChange}
              />
              <span>
                <input
                  //Retirement Checkbox
                  type = 'checkbox'
                  checked={props.duration === 'retirement' ? true : false}
                  onChange={props.setDurationToRetirement}
                />Continue Till Retirment
              </span>

              <StartStandardForm
                //Duration Form
                name = 'duration period'
                category = {props.duration}
                pre = {'Set Length To Apply: '}
                description = {'For how many years will this instance be applicable?'}
                pendingCategory = {props.pendingDuration}
                onChange = {props.onChange}
                id = {`duration-${props.type}-${props.instanceIndex}`}
                active = { props.duration === 'retirement' ? 'off' : 'on' }
              />
            </div>

            :

            <StartStandardForm
            name = 'interest'
            description = 'If applicable, enter interest'
            category = { props.interest }
            pendingCategory = { props.pendingInterest }
            pre = {'Interest: '}
            post = {'%'}
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
              //////////////
              //Link to Id's
              //////////////
              debts = { props.debts }
              instanceIndex = { props.instanceIndex }
              handleChange = { props.handleConnectedSelctionChange }
              connectedId = { props.connectedId }
              display = { props.displayLinkOptions }
              toggleDisplay = { props.toggleDisplayLinkOptions }
              handleSubmit = { props.handleLinkSubmit }
              id = { props.id }
            />
            :
            null
          }

        </div>

        <div className="start-instance-buttons">
          <button
              className='confirm-button'
              onClick={props.onConfirm}
              > Confirm </button>
          <button
              className='remove-button'
              onClick={props.onRemove}
            >Remove</button>
        </div>

      </div>


      )
    }


    const staticForm = ()=>{
      return (
        <div className="static-container" key='1'>
          <span>{props.title}</span>
          <span>{props.value}</span>
          <div className='start-instance-buttons'>
          <button
              className='edit-button'
              onClick={props.onEdit}
              > Edit </button>
          <button
              className='remove-button'
              onClick={props.onRemove}
            >Remove</button>
          </div>
        </div>
      )
    }

    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName= "display"
        transitionEnterTimeout= {500}
        transitionLeaveTimeout= {500}
        transitionAppear={true}
        transitionAppearTimeout={500}
      >
          {props.isEditing
            ?

            activeForm()

            :
            staticForm()
          }
      </ReactCSSTransitionGroup>
    )
}

StartInstanceForm.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    instanceIndex: PropTypes.number.isRequired,
}

export default StartInstanceForm;
