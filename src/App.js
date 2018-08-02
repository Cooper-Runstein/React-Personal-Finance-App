import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Counter from './Components/Counter';
import Start from './Components/Start_Components/Start';
import YearsContainer from './Components/Main_Components/YearsContainer';

import { applyGrowth, createIncomeInstances, isDurationApplied } from './app_functions.js';


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

    //Imported
    this.applyGrowth = applyGrowth.bind(this);
    this.createIncomeInstances = createIncomeInstances.bind(this);
    this.isDurationApplied = isDurationApplied.bind(this);

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






  //MAIN TABLE CREATION FUNCTIONS
  //##############################

  getNumberOfRows = (retirmentYear) =>{
    //Determines Size of Chart to Render
    let currentYear = this.state.date;
    let rows = retirmentYear - currentYear;

    if((rows <= 0) || !rows){
      return 0;
    }
    return rows;
  }

  generateYears = (e) =>{
    //Main Chart Generation Function
    const years = [];
    let numYears = this.getNumberOfRows(this.state.packagedData.retirmentYear)
    let initialYear = {
      year: this.state.date,
      income: this.state.packagedData.income,
      expenses: this.state.packagedData.expenses,
      debt: this.state.packagedData.debt,
      savings: this.state.packagedData.savings
    }
    for (let i = 0; i < numYears; i++){
      years.push(
        {
          year: this.state.date + i,
          income: this.createIncomeInstances(this.state.packagedData.income, i),
          expenses: this.createExpensesInstances(this.state.packagedData.expenses, i),
          debt: this.createDebtInstances(this.state.packagedData.debt, i),
          savings: this.createSavingsInstances(this.state.packagedData.savings, i),
        }
      );
    }
    this.setState({
      years: years
    })
  }

  createExpensesInstances = (packageExpenses, yearIndex)=>{
    //Determines How Expenses Instances are Displayed At Given Year
    let newInstances = packageExpenses.instances.filter((instance, index)=>{
      return this.isDurationApplied(instance, yearIndex);
    });
    return {...packageExpenses, instances: newInstances};
  }

  createDebtInstances = (packageDebt, yearIndex)=>{
    //Determines How Debt Instances are Displayed At Given Year
    return packageDebt;
  }
  createSavingsInstances = (packageSavings, yearIndex)=>{
    //Determines How Savings Instances are Displayed At Given Year
    return packageSavings;
  }

  extendInstances = (category, yearIndex) =>{
    let newCategory;
    newCategory = this.applyInitialInterest(category, yearIndex);
    newCategory = this.applyInitialDuration(newCategory, yearIndex);
    return newCategory;
  }

  // isDurationApplied = (instance, yearIndex)=>{
  //   //Determine if Instance Should Render at Given Year
  //   if (instance.duration === "retirement"){
  //     return true;
  //   }
  //   if (parseInt(instance.duration, 10) >= (yearIndex + 1)){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  applyInitialInterest = (category, yearIndex)=>{
    let alteredCategory = category.map((subCat, subCatIndex)=>{
      let newSubcat = subCat.instances.map((instance, instanceIndex)=>{
        let initialInstance = category[subCatIndex]['instances'][instanceIndex];
        let initialInterest = initialInstance.interest;
        let initialLength = initialInstance.length;
        const applyInterest = ()=>{
          if (initialLength === 'auto'){
            return {
              ...instance,
              value: parseFloat(instance.value) * (parseFloat(initialInterest) ** yearIndex),
              interest: 1,
              pendingValue: parseFloat(instance.value) * (parseFloat(initialInterest) ** yearIndex)
            }
          }
          if (initialLength !== 'auto' && parseFloat(initialLength) > yearIndex){
            return {
              ...instance,
              value: parseFloat(instance.value) * (parseFloat(initialInterest) ** yearIndex),
              pendingValue: parseFloat(instance.value) * (parseFloat(initialInterest) ** yearIndex),
              interest: 1
            }
          }
          if (initialLength !== 'auto' && parseFloat(initialLength) <= yearIndex){
            return {
              ...instance,
              value: parseFloat(instance.value) * (parseFloat(initialInterest) ** initialLength),
              pendingValue: parseFloat(instance.value) * (parseFloat(initialInterest) ** initialLength),
              interest: 1
          }
        }
        }
        if (initialInterest !== 1){
          return applyInterest();
        }
        else{
          return initialInstance;
        }
      });
      return {
        ...subCat,
        instances: newSubcat
      }
    });
    return alteredCategory
  }












  //############Counter Rendering###############
  //############################################

  getColumnTotals = (type)=>{
    let totalValue = 0;
    this.state.years.map(year=> totalValue += year[type].reduce((sum, category)=> {return category.instances.reduce((sum, entry)=>{ return sum + parseFloat(entry.value)}, 0)}, 0))
    return totalValue;
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

    const newInstanceObj = {
      title: 'set title',
      value: 'set value',
      isEditing: true,
      pendingInterest: '1',
      pendingTitle: 'set',
      pendingValue: 'set',
      interest: 1
    }

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
      return {
        ...instance,
        value: instance.pendingValue,
        title: instance.pendingTitle,
        isEditing: false
      }
    }
    this.changeInstanceAt(yearIndex, type, instanceIndex, newInstance);
  }

  getStartingFormData = (packagedData)=>{
    this.setState({
      ...this.state,
      packagedData: packagedData,
      displays: {
        ...this.state.displays,
        displayStartForm: false,
        displayYears: true,
        displayCounter: true
      }
    })
    setTimeout(this.generateYears, 1)

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

        {/* {
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
        } */}

        <Footer />
      </div>
    );
  }
}

export default App;
