import React from 'react';
import PropTypes from 'prop-types';

//////////////
//Link to Id's
//////////////
const StartExpensesLinkForm = (props) =>{
  //This form manages requests for links between expenses and debts
  //This exists on the Expenses instance
  let expenseId = props.id;

  return (
  <div className="start-link-container">
    {
      props.display

      ?
      <div>

        <form onSubmit={(event)=> props.handleSubmit(props.instanceIndex, expenseId, event) }>
          {props.debts.map((debt, index)=>{
            let debtId = debt.id;

            return (
              <span key={index}>
                <input
                  value={ debtId }
                  type='radio'
                  checked = {props.connectedId === debtId}
                  onChange={ (event)=> {
                    props.handleChange(props.instanceIndex, event);
                    console.log(props.connectedId + debtId)
                  } }
                  /> {debt.title}
              </span>)

          })}
          <button type='submit'>Link to Loan</button>
          {
            props.connectedId ? ( //Does this instance have a connectedId?

              props.debts.filter((debt)=>{
                return ((debt.id === props.connectedId) && (debt.linkedPaymentIndex.includes(props.id)))
              }).length > 0

              ? <span>Linked</span> : null): null
          }
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
  display: PropTypes.bool,
  toggleDisplay: PropTypes.func.isRequired,
  debts: PropTypes.array.isRequired,
  instanceIndex: PropTypes.number
}

export default StartExpensesLinkForm;
