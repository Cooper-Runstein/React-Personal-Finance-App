import React from 'react';
import PropTypes from 'prop-types';


const StartExpensesLinkForm = (props) =>{
  //This form manages requests for links between expenses and debts
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

            props.connectedIndex //First conditional checks if this instance has a connectedIndex,
            ?
            (props.debts[props.connectedIndex].linkedPaymentIndex.includes(props.instanceIndex)
            ? <p>Linked</p> : null) //Second checks if connectedIndex matches 'linkedPaymentIndex' in applicable debt
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
