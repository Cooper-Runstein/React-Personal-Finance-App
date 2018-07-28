import React from 'react';
import PropTypes from 'prop-types';
import StartInstanceForm from './StartInstanceForm';

const  StartCategoryForm = (props)=> {
    let isDurational = ()=>{
      console.log("Is durational used")
      //Durational Categories add value each period, static categories only gain instance.
      //Example: income of $50 over two years with 10% growth means possesion of $105 at the end of year 2
      //         A loan of $50 only increases by the interest on the loan, there is not reoccuring addition of cost

      if (props.title === 'income' || props.title === 'expenses'){
        console.log("Is durational");
        return true;
      } else {
        console.log("Not durational");
        return false;
      }

    }

    return (
      <div>
        <h2>{props.title}</h2>

        {props.instances.map((e, i)=>{
          return <StartInstanceForm
          key = {
            i
          }
          instanceIndex = {
            i
          }
          type = {
            props.title
          }
          title = {
            e.title
          }
          value = {
            e.value
          }
          isDurational = {
            ()=> isDurational()
          }
          isEditing = {
            e.isEditing
          }
          pendingTitle = {
            e.pendingTitle
          }
          pendingValue = {
            e.pendingValue
          }
          pendingInterest = {
            e.pendingInterest
          }
          interest = {
            e.interest
          }
          duration = {
            e.duration
          }
          pendingDuration = {
            e.pendingDuration
          }
          onEdit = {
            ()=> props.onEditAt(props.title, i)
          }
          onRemove = {
            ()=> props.removeInstanceAt(props.title, i)
          }
          onChange = {
            ()=> props.onChangeAt(props.title, i)
          }
          onConfirm = {
            ()=> props.onConfirmAt(props.title, i)
          }
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
