import React from 'react';
import PropTypes from 'prop-types';
import StartInstanceForm from './StartInstanceForm';

const  StartCategoryForm = (props)=> {
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
          onEditAt = {
            ()=> props.onEditAt(props.title, i)
          }
          // removeInstanceAt = {
          //   this.removeInstanceAt
          // }
          // addInstance = {
          //   () => this.addInstance('debt', i)
          // }
          // onChange = {
          //   this.onChangeAt
          // }
          // onConfirm = {
          //   this.onConfirmAt
          // }
          />

          })
        }
      </div>
    )
}

StartCategoryForm.propTypes = {
    // title: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired
}

export default StartCategoryForm;
