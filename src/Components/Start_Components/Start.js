import React from 'react';
import PropTypes from 'prop-types';
import StartCategoryForm from './StartCategoryForm.js';

import blankInstanceConstructor from '../../functions/blankInstanceConstructor.js';
import { confirmFunction, changeFunction } from '../../functions/start-functions.js';

class Start extends React.Component {
  constructor(props) {
    super(props);

    this.onEditAt = this.onEditAt.bind(this);
    this.addInstance = this.addInstance.bind(this);
    this.onChangeAt = this.onChangeAt.bind(this);
    this.onConfirmAt = this.onConfirmAt.bind(this);
    this.confirmAll = this.confirmAll.bind(this);
    this.alterInstances = this.alterInstances.bind(this);
    this.packageData = this.packageData.bind(this);
    this.setDurationToRetirement = this.setDurationToRetirement.bind(this);
    this.confirmFunction = confirmFunction.bind(this);
    this.changeFunction = changeFunction.bind(this);

    this.handleConnectedSelctionChange = this.handleConnectedSelctionChange.bind(this);
    this.toggleDisplayLinkOptions = this.toggleDisplayLinkOptions.bind(this);
    this.handleLinkSubmit = this.handleLinkSubmit.bind(this);


    this.state = {
      pendingRetirment: '',
      retirmentYear: '',
      income: {
        title: 'Income',
        instances: [],
      },
      expenses: {
        title: 'Expenses',
        instances: [],
      },
      debt: {
        title: 'Debt',
        instances: [],
      },
      savings: {
        title: 'Savings',
        instances: [],
      },
      infoDisplay: false
    }
  }

  //Initialize Start Form
  componentDidMount(){
    this.addInstance('income');
    this.addInstance('expenses');
    this.addInstance('debt');
    this.addInstance('savings');
  }

  //*****Button and Input Change/Click functions********//

  //Common Function


  alterInstances = (type, instanceIndex, newInstance) => {
    console.log("Altering instance at: " + type + ' ' + instanceIndex);
     let newInstances = this.state[type].instances.map((e, i) => {
      if (i === instanceIndex){
        console.log('found');
        console.log(newInstance(e,i));
        return newInstance(e,i);
      } else {
        return e;
      }
    });
    console.log(newInstances);
    return newInstances;
  }

  changeStateInstancesAt = (type, newInstances)=> {
    this.setState({
      [type]: {
        ...this.state[type],
        instances: newInstances
      }
    })
  }

  validateValue = (e, type) => {
    const falseChars = [',', '/', '$', '#', ' ', '*', ';', ':', '^', '%', '!', '\''];
    const strippedValue = (pendingString) => {
      falseChars.map((char) => {
        pendingString = pendingString.replace(char, '');

      })
      return pendingString
    }

    let newValue;
    if (!Number.isNaN(parseFloat(strippedValue(e['pending' + type])))) {
      newValue = parseFloat(strippedValue(e['pending' + type]));
    } else {
      console.log('value failed:' + strippedValue(e[type]));
      newValue = "Invalid Entry, Try Again";
    }
    return newValue
  }

  //Event Handlers
  onEditAt = (type, instanceIndex) => {
    console.log("Edit Called at " + type + ' ' + instanceIndex);
    const newState = (e) => {
      return {
        ...e,
        isEditing: !e.isEditing
      }
    }
    this.changeStateInstancesAt(type, this.alterInstances(type, instanceIndex, newState))
  }

  addInstance = (type) => {
    console.log("Adding Instance to: " + type);
    let newInstance = blankInstanceConstructor();
    let currentInstances = this.state[type].instances.slice();
    currentInstances.push(newInstance);
    this.changeStateInstancesAt(type, currentInstances);
  }

  removeInstanceAt = (type, instanceIndex) => {
    console.log("Remove Instance at " + type + " " + instanceIndex);
    let newInstances = this.state[type].instances.filter((e, i) => {
      return i !== instanceIndex;
    });
    this.changeStateInstancesAt(type, newInstances);
  }

  onChangeAt = (type, instanceIndex) => {
    let newInstance = this.changeFunction(type, instanceIndex);
    this.changeStateInstancesAt(type, this.alterInstances(type, instanceIndex, newInstance));
  }

  onConfirmAt = (type, instanceIndex) => {
    console.log("Confirming Inputs at " + type + " " + instanceIndex);
    let newInstance = this.confirmFunction;
    this.changeStateInstancesAt(type, this.alterInstances(type, instanceIndex, newInstance))
  }

  confirmAll = () => {
    const types = ['income', 'expenses', 'debt', 'savings'];

    types.map(type => {
      this.state[type].instances.map((instance, index) =>{
        this.onConfirmAt(type, index)
      });
    });

  }

  packageData = () => {
    console.log("Attempting Data Packaging")
    if ((typeof parseFloat(this.state.retirmentYear) === "number") && Math.floor(parseFloat(this.state.retirmentYear)) === parseFloat(this.state.retirmentYear) && parseFloat(this.state.retirmentYear) > this.props.year) {
      console.log("Retirment year is valid, packaging data")
      this.props.getStartingFormData({
        retirmentYear: this.state.retirmentYear,
        income: this.state.income,
        expenses: this.state.expenses,
        debt: this.state.debt,
        savings: this.state.savings,

      })
      console.log("Succesful pacakge submission");
    } else {
      console.log("Form not ready for submission");
    }
  }


  //Link Expense to Debt Functions
  handleConnectedSelctionChange = (index, event)=>{
    console.log("loan Selection Called: " + event.target.value)
    let newInstance = (instance)=> {
      return {
        ...instance,
        connectedId: event.target.value
      }
    };
    this.changeStateInstancesAt('expenses', this.alterInstances('expenses', index, newInstance));
  }

  toggleDisplayLinkOptions = (index)=>{
    console.log("Called toggle display links at: " + index);
    const myNewinstance = (instance)=> {
      return {
        ...instance,
        displayLinkOptions: true
      }
    };

    this.changeStateInstancesAt('expenses', this.alterInstances('expenses', index, myNewinstance));
  }

  handleLinkSubmit(instanceIndex, expenseId, event){
    event.preventDefault();

    let targetExpense = this.state.expenses.instances[instanceIndex];
    let connectedDebtId = targetExpense.connectedId;
    console.log("connectedDebtId: " + connectedDebtId);

    let newInstances = this.state.debt.instances.map((debt, index)=>{
          if (debt.id === connectedDebtId){
            let targetedArray = debt.linkedPaymentIndex.slice();
            targetedArray.push(expenseId);
            console.log('Pushed expenseId to: ' + debt.id);
            return {
              ...debt,
              linkedPaymentIndex: targetedArray
            }
          } else{
            if(debt.linkedPaymentIndex.includes(expenseId)){
              let linkedPaymentsArray = debt.linkedPaymentIndex.slice();
              linkedPaymentsArray = linkedPaymentsArray.filter(paymentId => paymentId !== expenseId);
              return {
                ...debt,
                linkedPaymentIndex: linkedPaymentsArray
              }
            }
            return debt
          }
        })

    this.changeStateInstancesAt('debt', newInstances);
  }

  setDurationToRetirement = (type, instanceIndex) =>{
    let newState;
    if (this.state[type].instances[instanceIndex].duration === 'retirement'){
      newState = (e) => {
        return{
          ...e,
          duration: ''
      }
    }
    } else {
       newState = (e) => {
        return {
          ...e,
          duration: 'retirement'
        }
      }
    }

    this.changeStateInstancesAt(type, this.alterInstances(type, instanceIndex, newState));
  }


  render() {
    return (
      <div className = "start-main-container" >
        <button
          className='info-button start-info-button'
          onClick={()=> this.setState({
            ...this.state,
            infoDisplay: !this.state.infoDisplay
        })}

        >Info</button>
        {this.state.infoDisplay ?
        <div className= 'info-box start-info'>
          <h3>Plan for retirment!</h3>
          <p>This app is meant to help you prepare to retirement.
            In order to succesfully draw out your future, you need to enter some info today.
            This info includes your current savings, income, expenses, and debt.
            This will be used to set up a chart where you can make changes as you see fit!
            </p>
        </div> : null}
        <StartCategoryForm
          title = {"income"}
          description = {'Add your income from jobs/payements, etc. below'}
          instances = {this.state.income.instances}
          setDurationToRetirement = {this.setDurationToRetirement}
          onEditAt = {this.onEditAt}
          addInstance = {()=>this.addInstance('income')}
          removeInstanceAt = {this.removeInstanceAt}
          onChangeAt = {this.onChangeAt}
          onConfirmAt = {this.onConfirmAt}

        />
        <StartCategoryForm
          title = {"expenses"}
          description = {"Add your reoccuring expenses below"}
          instances = {this.state.expenses.instances}
          onEditAt = {this.onEditAt}
          addInstance = {()=>this.addInstance('expenses')}
          setDurationToRetirement = {this.setDurationToRetirement}
          removeInstanceAt = {this.removeInstanceAt}
          onChangeAt = {this.onChangeAt}
          onConfirmAt = {this.onConfirmAt}
          debts = {this.state.debt.instances}
          handleConnectedSelctionChange = { this.handleConnectedSelctionChange }
          toggleDisplayLinkOptions = { this.toggleDisplayLinkOptions }
          handleLinkSubmit = { this.handleLinkSubmit }

        />

        <StartCategoryForm
          title = { "debt" }
          description = { "Input your debts below, if you have a reoccuring payement, link it in expenses" }
          instances = { this.state.debt.instances }
          onEditAt = { this.onEditAt }
          addInstance = {()=>this.addInstance('debt')}
          removeInstanceAt = {this.removeInstanceAt}
          onChangeAt = {this.onChangeAt}
          onConfirmAt = {this.onConfirmAt}
        />
        <StartCategoryForm
          title = {"savings"}
          description = { "Input your savings below" }
          instances = {this.state.savings.instances}
          onEditAt = {this.onEditAt}
          addInstance = {()=>this.addInstance('savings')}
          removeInstanceAt = {this.removeInstanceAt}
          onChangeAt = {this.onChangeAt}
          onConfirmAt = {this.onConfirmAt}
        />
        {/* <button onClick={()=> this.confirmAll()}>Confirm All</button> */}
        <hr/>
        <div className='start-submit-container'>
          <span className='retirement-container'>
            <input
              placeholder="Enter your target retirement age"
              onChange={(event)=>{this.setState({
                ...this.state,
                pendingRetirment: event.target.value
              })}}
            />
          </span>
          <button
            className='retirement-button'
            onClick={()=>{
              this.setState({
                ...this.state,
                retirmentYear: parseInt(this.state.pendingRetirment, 10)
              });
              setTimeout(this.confirmAll, 100);
            }}>Confirm retirement year</button>
            <button
              className = "package-button"
              onClick={()=> {
                console.log('data packaged');
                this.packageData();
              }}
            >Create my Chart</button>
          </div>
      </div>
         )
  }
}

Start.propTypes = {
  getStartingFormData: PropTypes.func,
  year: PropTypes.number
}

export default Start;
