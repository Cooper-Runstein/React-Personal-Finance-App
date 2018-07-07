import React from 'react';
import PropTypes from 'prop-types'

import Input from './Input.js';

export default class StartingForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formStatus: 0,
            formInfo: [
                {
                    title: "Savings",
                    
                }
            ],
                
                    
            startingValues: {
                income: {

                },
                savings: {

                },
                expenses:{

                }, 
                debts:{

                }
            }

        }
    }

    changePendingValueAt(e, i){
        e.preventDefault();
        
  // updatePendingStartValue = (e, k)=>{
  //   e.preventDefault();
  //   this.setState({
  //     startingValues: {
  //       ...this.state.startingValues,
  //       [k]: parseFloat(e.target.value)
  //     }
  //   })
  // }
    }
    
   render() {
    return(
        <div>
            <h3>{this.state.formInfo[this.state.formStatus].title}</h3>
            {this.state.formInfo[this.state.formStatus].forms.map((form, i)=>{
                <Input
                    key={i}
                    form= {form}
                />
            })}
            <button
            onClick= {this.props.getInitialInputs(this.state.startingValues)}
            id="submitStartingValues"
            ></button>
        </div>
    );
}
}

StartingForm.propTypes = {
    getInitialInputs: PropTypes.func.isRequired,
}

 //==========================
  //==========================
  //====INITIAL FORM =========
  //==========================
  //==========================

  // updatePendingStartValue = (e, k)=>{
  //   e.preventDefault();
  //   this.setState({
  //     startingValues: {
  //       ...this.state.startingValues,
  //       [k]: parseFloat(e.target.value)
  //     }
  //   })
  // }

  // updatePendingSavings = (e)=>{
  //   this.updatePendingStartValue(e, "pendingSavings")
  // }
  // updatePendingDebt = (e)=>{
  //   this.updatePendingStartValue(e, "pendingDebt")
  // }
  // updatePendingRetirment = (e)=>{
  //   this.updatePendingStartValue(e, "pendingRetirment")
  // }

  // savePendingStartValue = (e, k) =>{
  //   e.preventDefault();
  //   let newValue = this.state.startingValues["pending" + k];
  //   const renderYearsContainer = () =>{
  //     document.getElementById("starting-form").style.display = "none";
  //     document.getElementById("years-container").style.display = "block";
  //     window.setTimeout(this.generateYears, 500);
  //   } 
  //   const newStartingFormValue = () =>{
  //     if (this.state.startingValues.startFormStatus !== 2){ 
  //       return this.state.startingValues.startFormStatus + 1 ;
  //     }
  //     else{
  //       renderYearsContainer();
  //       return 0;
  //     }
  //   }
  //   this.setState({
  //     startingValues: {
  //       ...this.state.startingValues,
  //       [k]: newValue,
  //       ["pending" + k]: 0,
  //       startFormStatus: newStartingFormValue()
  //     }
  //   })
  //   document.getElementById("starting-form").reset();
    
  // }

  // savePendingSavings = (e) =>{
  //   this.savePendingStartValue(e, "Savings")
  // }

  // savePendingDebt = (e) =>{
  //   this.savePendingStartValue(e, "Debt")
  // }

  // savePendingRetirment = (e) =>{
  //   this.savePendingStartValue(e, "Retirment")
    
  // }
  

