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
