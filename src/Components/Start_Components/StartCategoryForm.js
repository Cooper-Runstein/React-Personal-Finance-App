import React from 'react';
import PropTypes from 'prop-types';
import StartInstanceForm from './StartInstanceForm';


const  StartCategoryForm = (props)=> {
    let isDurational = ()=>{
      //Durational Categories add value each period, static categories only gain interest.
      //Example: income of $50 over two years with 10% growth means possesion of $105 at the end of year 2
      //         A loan of $50 only increases by the interest on the loan, there is not reoccuring addition of inputted value
      //Thus, Durational Categories can end at a selected year, but static can end only when value is 0 or are manually removed

      if (props.title === 'income' || props.title === 'expenses'){
        return true;
      } else {
        return false;
      }

    }

    return (
      <div>
        <h2>{props.title}</h2>
        <h3>{props.description}</h3>
        {props.instances.map((e, i)=>{
          return <StartInstanceForm
          key = { i }
          instanceIndex = { i }
          type = { props.title }
          title = { e.title }
          value = { e.value }
          isDurational = { ()=> isDurational() }
          isEditing = { e.isEditing }
          pendingTitle = { e.pendingTitle }
          pendingValue = { e.pendingValue }
          pendingInterest = { e.pendingInterest }
          interest = { e.interest }
          duration = { e.duration }
          pendingDuration = { e.pendingDuration }
          connectedIndex = { e.connectedIndex }
          debts = { props.debts }
          onEdit = { ()=> props.onEditAt(props.title, i) }
          onRemove = { ()=> props.removeInstanceAt(props.title, i) }
          onChange = { ()=> props.onChangeAt(props.title, i) }
          onConfirm = { ()=> props.onConfirmAt(props.title, i) }
          debts = {props.debts}
          handleConnectedSelctionChange = {props.handleConnectedSelctionChange}
          displayLinkOptions = { e.displayLinkOptions }
          toggleDisplayLinkOptions = { ()=> props.toggleDisplayLinkOptions(i) }
          handleLinkSubmit = { props.handleLinkSubmit }
        />


          })
        }
        <div className="start-add-button-container">
          <button
            onClick={ props.addInstance }
          >Add</button>
      </div>
      </div>

    )
}

StartCategoryForm.propTypes = {
  title: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
  onEditAt: PropTypes.func.isRequired,
  addInstance: PropTypes.func.isRequired,
  removeInstanceAt: PropTypes.func.isRequired,
  onChangeAt: PropTypes.func.isRequired,
  onConfirmAt: PropTypes.func.isRequired
}

export default StartCategoryForm;
