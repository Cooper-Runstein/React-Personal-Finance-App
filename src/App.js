import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Counter from './Components/Counter';
import Start from './Components/Start_Components/Start';
import YearsContainer from './Components/Main_Components/YearsContainer';

import generateYears from './functions/create_functions.js';
import blankInstanceConstructor from './functions/blankInstanceConstructor';
import alterDebtValues from './functions/debt-value-applicator';


class App extends Component {
  constructor(props){
    super(props);

    //Functions
    this.toggleEditEntry = this.toggleEditEntry.bind(this);
    this.removeInstanceAt = this.removeInstanceAt.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onConfirmAt = this.onConfirmAt.bind(this);
    this.addInstance = this.addInstance.bind(this);
    this.getIncome = this.getIncome.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.getStartingFormData = this.getStartingFormData.bind(this);
    this.generateYears = generateYears.bind(this);
    this.alterDebtValues = alterDebtValues.bind(this);
    this.extendPackage = this.extendPackage.bind(this);
    this.chartCreationFunction = this.chartCreationFunction.bind(this);

    this.state = {
      date: new Date().getFullYear(),
      years: [

      ],
      displays: {
        displayCounter: false,
        displayStartForm: true,
        displayYears: false
      }
    }
  }

  getStartingFormData = (packagedData)=>{
    this.chartCreationFunction(packagedData);

    // setTimeout(
    //   ()=>{
    //     this.setState({
    //       years: this.alterDebtValues(this.state.years)
    //     });
    //   }, 1000
    // )
    }

    extendPackage = (packagedData) => {
      console.log("Retreving Package");
      return this.generateYears(packagedData, this.state.date);
    }

    chartCreationFunction = (packagedData)=>{
      let renderedYears;
      renderedYears = this.extendPackage(packagedData);
      renderedYears = this.alterDebtValues(renderedYears);
      this.setState({
        ...this.state,
        displays: {
          displayCounter: true,
          displayStartForm: false,
          displayYears: true
        },
        years: renderedYears
      })

    }


  //############Counter Rendering###############
  //############################################

  getColumnTotals = (type)=>{
    // let totalValue = 0;
    return this.state.years.reduce((total, year)=> total += year[type].instances.reduce((value, instance)=>value += instance.value, 0) ,0)
  }

  getIncome = ()=> {
    return this.getColumnTotals('income');
   }

  getExpenses = ()=>{
    return this.getColumnTotals('expenses');
  }

  getDebt = ()=>{
    return this.getColumnTotals('debt');
  }

  getSavings = ()=>{
    return this.getColumnTotals('savings');
  }


//######ALTER MAIN TABLE############
//##################################

  changeYearAt = (yearIndex, newYear)=>{
    let oldYears = this.state.years.slice();
    oldYears.splice(yearIndex, 1, newYear)
    this.setState({
      ...this.state,
      years: oldYears
    })
  }

  changeInstanceAt = (yearIndex, type, instanceIndex, newInstance) =>{
    console.log("Called for changed instance at: " + yearIndex, type, instanceIndex, newInstance)
    let targetYear = this.state.years.filter((year, i)=>{
      return i === yearIndex;
    });
    targetYear = targetYear[0];
    console.log(targetYear + type);

    let newInstances = targetYear[type].instances.map((instance, i)=>{
      if ( i === instanceIndex ){
        console.log(instance);
        return newInstance(instance);
      } else {
        return instance;
      }
    });

    let newYear = {
      ...targetYear,
      [type]: {
        ...targetYear[type],
        instances: newInstances
      }
    }

    this.changeYearAt(yearIndex, newYear);
  }

  toggleEditEntry = (yearIndex, type, instanceIndex)=>{
    console.log("Toggling Edit at:" + yearIndex + " " + type + " " + instanceIndex)
    let newInstance = (instance)=>{
      return {
        ...instance,
        isEditing: !instance.isEditing
      }
    }
    this.changeInstanceAt(yearIndex, type, instanceIndex, newInstance);
  }

  addInstance = (yearIndex, type)=>{

    const newInstanceObj = blankInstanceConstructor();

    let newInstancesArr = this.state.years[yearIndex][type].instances.slice()
    newInstancesArr.push(newInstanceObj);

    const newYear = {
      ...this.state.years[yearIndex],
      [type]: {
        ...[type],
        instances: newInstancesArr
      }
    }
    this.changeYearAt(yearIndex, newYear);
  }


  removeInstanceAt = (yearIndex, type, instanceIndex)=>{
    console.log("Remove Instance At: " + yearIndex + " " + type + " " + instanceIndex);
    const targetInstanceArr = this.state.years[yearIndex][type].instances;
    console.log(targetInstanceArr);

    let newInstancesArr = targetInstanceArr.filter((instance, index)=>{
      return instanceIndex !== index;
    })

    const newYear = {
      ...this.state.years[yearIndex],
      [type]: {
        ...[type],
        instances: newInstancesArr
      }
    }

    this.changeYearAt(yearIndex, newYear);
  }

  onChange = (yearIndex, type, instanceIndex, event, obj) =>{
    let upperedObj = (obj)=> obj.charAt(0).toUpperCase() + obj.slice(1);

    let newInstance = (e)=>{
      return {
        ...e,
        ['pending' + upperedObj(obj)]: event.target.value
      }
    }
    this.changeInstanceAt(yearIndex, type, instanceIndex, newInstance);
  }

  onConfirmAt = (yearIndex, type, instanceIndex)=>{
    console.log(instanceIndex);

    let newInstance = (instance)=>{
      let newValue = parseInt(instance.pendingValue, 10);

      return {
        ...instance,
        value: newValue,
        title: instance.pendingTitle,
        interest: instance.pendingInterest,
        isEditing: false
      }
    }
    this.changeInstanceAt(yearIndex, type, instanceIndex, newInstance);


    // (type === 'debt' || type === 'savings') ?
    // this.extendInstance(yearIndex, type, instanceIndex, newInstance) : (type === 'expenses' ?  this.alterDebtValues() : null)
  }

  extendInstance = (yearIndex, type, instanceIndex, newInstance) =>{
    const { years } = this.state;
    const applyYears = years.map((year, index)=> {
      if (index >= yearIndex){
        return null;
      }
      return null;
    })
    return null;
    }


  getRetirmentYear = ()=>{
    if (this.state.packagedData){
      return this.state.packagedData.retirmentYear;
    }
    else{
      return this.state.date;
    }
  }



  render() {
    return (
      <div className="App">
        <Header />
        {
          this.state.displays.displayStartForm ?
          <Start
          getStartingFormData = {this.getStartingFormData}
          year = {this.state.date}
        />
        :
        false
        }


        {
          this.state.displays.displayYears ?
          <YearsContainer
            retirmentYear = {this.getRetirmentYear}
            currentYear = {this.state.date}
            years = {this.state.years}
            toggleEditEntry = {this.toggleEditEntry}
            removeInstanceAt = {this.removeInstanceAt}
            onChange = {this.onChange}
            onConfirmAt = {this.onConfirmAt}
            addInstance = {this.addInstance}
        />

        :
        false

        }

        {
          this.state.displays.displayCounter ?
          <Counter
            income = {this.getIncome()}
            expense = {this.getExpenses()}
            debt = {this.getDebt()}
            savings = {this.getSavings()}
            retirment = {this.getRetirmentYear()}
            netWorth = {this.getSavings() - this.getDebt()}

          />
          :
          false
        }

        <Footer />
      </div>
    );
  }
}

export default App;
