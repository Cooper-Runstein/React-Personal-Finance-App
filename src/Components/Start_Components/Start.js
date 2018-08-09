import React from 'react';
import PropTypes from 'prop-types';
import StartCategoryForm from './StartCategoryForm.js';

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

    this.handleConnectedSelctionChange = this.handleConnectedSelctionChange.bind(this);
    this.toggleDisplayLinkOptions = this.toggleDisplayLinkOptions.bind(this);
    this.handleLinkSubmit = this.handleLinkSubmit.bind(this);


    this.state = {
      pendingRetirment: '',
      retirmentYear: '',
      income: {
        title: 'Income',
        instances: [
        {
          title: 'Set Job title',
          value: 5000,
          isEditing: true,
          pendingTitle: 'Set Job Title',
          pendingValue: '5000',
          pendingInterest: '0',
          interest: 0,
          length: 'auto',
          pendingLength: 'auto',
          duration: "retirement",
          pendingDuration: "retirement",
          growth: '0',
          pendingGrowth: '0'

        }],

        },
      expenses: {
          title: 'Expenses',
          instances: [{
            title: 'Rent',
            value: 1000,
            isEditing: true,
            pendingTitle: 'Rent',
            pendingValue: '1000',
            pendingInterest: '0',
            interest: 0,
            length: 'auto',
            pendingLength: 'auto',
            duration: "retirement",
            pendingDuration: "retirement",
            connectedIndex: '',
            displayLinkOptions: false,
            growth: '0',
            pendingGrowth: '0'

          },
          {
            title: 'Eating Out',
            value: 60,
            isEditing: true,
            pendingTitle: 'Eating Out',
            pendingValue: '60',
            pendingInterest: '0',
            interest: 0,
            length: 'auto',
            pendingLength: 'auto',
            duration: "retirement",
            pendingDuration: "retirement",
            growth: '0',
            pendingGrowth: '0'
          },
          {
            title: 'Groceries',
            value: 50,
            isEditing: true,
            pendingTitle: 'Groceries',
            pendingValue: '50',
            pendingInterest: '0',
            interest: 0,
            length: 'auto',
            pendingLength: 'auto',
            duration: "retirement",
            pendingDuration: "retirement",
            growth: '0',
            pendingGrowth: '0'
          }
        ],
        infoDisply: false

      },
      debt: {
        title: 'Debt',
        instances: [{
          title: 'Mortgage',
          value: 1000,
          isEditing: true,
          pendingTitle: 'Mortgage',
          pendingValue: '1000',
          pendingInterest: '0',
          interest: 0,
          length: 'auto',
          pendingLength: 'auto',
          duration: "retirement",
          pendingDuration: "retirement",
          linkedPaymentIndex: []
        }],
      },
      savings: {
        title: 'Savings',
        instances: [{
          title: '401K',
          isEditing: true,
          value: 500,
          interest: 0,
          length: 'auto',
          pendingTitle: '401K',
          pendingValue: '500',
          pendingInterest: '0',
          pendingLength: 'auto',
          duration: "retirement",
          pendingDuration: "retirement"

        },
      ],
      infoDisplay: false
      }
    }
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
      ...this.state,
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
        return null;
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
    let newInstance = {
      title: 'set',
      value: 'set',
      isEditing: true,
      pendingTitle: '',
      pendingValue: '',
      pendingInterest: '0',
      interest: 0,
      duration: 'retirement',
      pendingDuration: 'retirement',
      growth: '0',
      pendingGrowth: '0',
      linkedPaymentIndex: []
    }

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
    console.log("Change Called at " + type + " " + instanceIndex)

    const newInstance = (e,i)=> {
      const valueValue = document.getElementById(`value-${type}-${i}`).value;
      const titleValue = document.getElementById(`title-${type}-${i}`).value;

      let baseObj =  {
        ...e,
        pendingValue: valueValue,
        pendingTitle: titleValue,
      }

      let durationalObj = ()=> {
        if (type === 'income' || type === 'expenses'){
          const durationValue = document.getElementById(`duration-${type}-${i}`).value;
          const growthValue = document.getElementById(`growth-${type}-${i}`).value;
          return {pendingDuration: durationValue, pendingGrowth: growthValue}
        }
        else {
          return {}
        }
      }

      let interestObj = ()=> {
        if (type === 'debt' || type === 'savings'){
          const interestValue = document.getElementById(`interest-${type}-${i}`).value;
          return {pendingInterest: interestValue}
        } else {
          return {}
        }
      }

      baseObj = Object.assign(baseObj, durationalObj());
      baseObj = Object.assign(baseObj, interestObj());

      return baseObj;
    }


    this.changeStateInstancesAt(type, this.alterInstances(type, instanceIndex, newInstance))
  }

  onConfirmAt = (type, instanceIndex) => {
    console.log("Confirming Inputs at " + type + " " + instanceIndex);
    let newInstance = (e, i)=>{
      let validatedValue = this.validateValue(e, 'Value');
      let validatedInterest = this.validateValue(e, 'Interest');
      return {
        ...e,
        title: e.pendingTitle,
        value: validatedValue,
        interest: validatedInterest,
        length: e.pendingLength,
        duration: e.pendingDuration,
        growth: e.pendingGrowth,
        isEditing: false,
      }
    }

    this.changeStateInstancesAt(type, this.alterInstances(type, instanceIndex, newInstance))
  }

  confirmAll = () => {
    const types = ['income', 'expenses', 'debt', 'savings'];
    let newInstancesObjs = {};

    types.map((type, i)=>{

      newInstancesObjs[type] = this.state[type].instances.map((e,i)=>{
        let validatedValue = this.validateValue(e, 'Value');
        let validatedInterest = this.validateValue(e, 'Interest');
        return {
          ...e,
          title: e.pendingTitle,
          value: validatedValue,
          interest: validatedInterest,
          length: e.pendingLength,
          duration: e.pendingDuration,
          isEditing: false,
          growth: e.pendingGrowth

        }

      })
      return null;
    }
  )

  this.setState({
    ...this.state,
    income: {
      ...this.state.income,
      instances: newInstancesObjs.income
    },
    expenses: {
      ...this.state.expenses,
      instances: newInstancesObjs.expenses
    },
    debt: {
      ...this.state.debt,
      instances: newInstancesObjs.debt
    },
    savings: {
      ...this.state.savings,
      instances: newInstancesObjs.savings
    },
  })
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
        connectedIndex: event.target.value
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

handleLinkSubmit(index, event){
  event.preventDefault();
  let newInstance = (instance) => {
    let lPIcopy =  instance.linkedPaymentIndex.slice();
    if (!lPIcopy.includes(index)){
      lPIcopy.push(index);
    }

    return (
      {
        ...instance,
        linkedPaymentIndex: lPIcopy
      }
    )
  };

  let debtIndex = this.state.expenses.instances[index].connectedIndex;
  let newInstances = this.alterInstances('debt', parseInt(debtIndex, 10), newInstance);
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
        <button onClick={()=> this.confirmAll()}>Confirm All</button>
        <hr/>
        <input
          placeholder="Enter your target retirement age"
          onChange={(event)=>{this.setState({
            ...this.state,
            pendingRetirment: event.target.value
          })}}
        />
        <button
          onClick={()=>{
            this.setState({
              ...this.state,
              retirmentYear: parseInt(this.state.pendingRetirment, 10)
            });
            setTimeout(this.confirmAll, 100);
          }}>Confirm retirement year</button>
          <button
            onClick={()=> {
              this.packageData();
            }}
          >Create my Chart</button>
      </div>
         )
  }
}

Start.propTypes = {
  getStartingFormData: PropTypes.func,
  year: PropTypes.number
}

export default Start;
