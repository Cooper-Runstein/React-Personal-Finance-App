import React from 'react';
import PropTypes from 'prop-types';
import Instance from '../Main_Components/Instance';

const StartExpensesLinkForm = (props) =>{
  return (<div className="start-link-container">
    {
      props.display

      ?
      <div>

        <form onSubmit={(event)=> props.handleSubmit(props.instanceIndex, event) }>
          {props.debts.map((debt, index)=>{

            return (
              <span key={index}>
                <input
                  type='checkbox'
                  value={ index }
                  type='radio'
                  checked = {parseInt(props.connectedIndex, 10) === index}
                  onChange={ (event)=> props.handleChange(props.instanceIndex, event) }
                  /> {debt.title}
              </span>)

          })}
          <button type='submit'>Link to Loan</button>
          {
            //This double ternary gives user feedback if
            //associated debt has been succesfully linked to this instance
            //First conditional checks if this instance has a connectedIndex,
            //Second checks if connectedIndex matches 'linkedPaymentIndex' in applicable debt

            props.connectedIndex
            ?
            (props.debts[props.connectedIndex].linkedPaymentIndex === props.instanceIndex ? <p>Linked</p> : null)
            : null}
        </form>



      </div>

      :

      <button
        onClick = {props.toggleDisplay}
      >Link expense to a loan</button>


    }

  </div>
  )
}

StartExpensesLinkForm.propTypes = {

}

export default StartExpensesLinkForm;
