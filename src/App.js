import React, { Component } from 'react';
import './App.css';
import './css/display.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Counter from './Components/Counter';
import Start from './Components/Start_Components/Start';
import YearsContainer from './Components/Main_Components/YearsContainer';



class App extends Component {
  constructor(props){
    super(props)
    this.toggleEditEntry = this.toggleEditEntry.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.addInstance = this.addInstance.bind(this);
    this.getIncome = this.getIncome.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.getStartingFormData = this.getStartingFormData.bind(this);
    this.state = {
      date: new Date().getFullYear(),
      years: [
        
      ],

    }
  }

 
  getInitialInputs = (values)=>{
    return values;
  }


  //==========================
  //==========================
  //====Years Table =========
  //==========================
  //==========================

 
  
  getNumberOfRows = (retirmentYear) =>{
    console.log(retirmentYear)
    let currentYear = this.state.date;
    console.log(currentYear)
    let rows = retirmentYear - currentYear;

    if((rows <= 0) || !rows){
      return 0;
    }
    return rows;
  }

  generateYears = (e) =>{
    e.preventDefault();
    const years = [];
    let numYears = this.getNumberOfRows(this.state.packagedData.retirmentYear)
    for (let i = 0; i < numYears; i++){
      years.push(
        {
          year: this.state.date + i,
          income: this.state.packagedData.income,
          expenses: this.state.packagedData.expenses
        }
      );
    }
    console.log(years);
    this.setState({
      years: years
    })
    
  }

  getColumnTotals = (type)=>{
    console.log("Getting Column Totals")
    let totalValue = 0;
    this.state.years.map(year=> totalValue += year[type].reduce((sum, category)=> {return sum + category.totals}, 0))
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

  toggleEditEntry = (location) =>{
    console.log("Called Edit");
    const newState = (e, entry)=>{
      return{
          ...e,
          isEditing: !entry.isEditing
        }
    }
    const info = {
      newState: newState,
      func: ()=>{false}
    }
    this.setState(
      {
        pendingTitle: "",
        pendingValue: "",
        years: this.alterYearsAt(location, info)
      }
    );
    console.log('Years altered');
  }

  addInstance = (location)=>{
    const info = {
        func: (array)=>{
          array.push({
            title: 'set',
            value: 'set',
            isEditing: true,
            pendingInterest: '1',
            pendingTitle: 'set',
            pendingValue: 'set',
            interest: 1
          })
        },
        newState: (e)=> e
    }
    this.setState({
      ...this.state,
      years: this.alterYearsAt(location, info)
    })
  }

  alterYearsAt = (location, info)=>{
    //location is an object with instance's postion
    //info is and object with two functions: 
    //newState returns the new instance values in state
    //func will run after state has been changed at given instance
    const yearIndex = location.yearIndex;
    const category = location.catName;
    const years = [];
    const currentCategory = this.state.years[yearIndex][category];
    location.currentCategory = currentCategory;
    this.state.years.map((e,i)=>{
    if(i === yearIndex){
      let newYear = {
        ...e,
        [category]: this.getCategory(location, info)
      } 
      years.push(newYear)
    }
    else{
      years.push(e)
    }
    return true;
  })
    return years;
  }

  getCategory = (location, info)=>{
    const currentCategory = location.currentCategory;
    const catKey = location.catKey;
    const currentinstances = currentCategory[catKey]['instances'];
    location.currentinstances = currentinstances;
    const newCat = []
    currentCategory.map((e,i)=>{
      if (i === catKey){
        let newEntry = {
          ...e,
          instances: this.getInstance(location, info)
        }
        newCat.push(newEntry)
      }
      else{
        newCat.push(e)
      }
    }
  )
    return newCat;
  }

  getInstance = (location, info)=>{
    const currentinstances = location.currentinstances;
    const index = location.instanceIndex;
    const entry = currentinstances[index];
    const newinstances = [];
    currentinstances.map((e,i)=>{
      if (i === index){
        newinstances.push(info.newState(e, entry))
      }else{
        newinstances.push(e)
      }
    }
  )
    info.func(newinstances, index);
    return newinstances;
  }

  removeEntry = (location)=>{
    console.log("Called Remove")
    const info = {
      newState: ()=>{return false},
      func: (array, index)=>{
        console.log(array, index)
        array.splice(index, index + 1);
      }
    }
    this.setState({
      pendingTitle: "",
      pendingValue: "",
      years: this.alterYearsAt(location, info)
    })
    console.log('Years altered')
  }

  onChangeFor = (e, location, type) =>{
    console.log('Change Called at: ' + location);
    console.log(e.target.value);
    const newVal = e.target.value;
    const newState = (e)=>{
      return{
      ...e,
      ['pending' + type]: newVal
    }
  };
    const func = ()=>{null};
    const info = {
      newState,
      func
    }

    this.setState({
      ...this.state,
      years: this.alterYearsAt(location, info)
    })

  }

  onChangeValue = (e, location)=> {
    console.log("Value Change");
    this.onChangeFor(e, location, 'Value');
  }

  onChangeInterest = (e, location)=>{
    console.log("Interest Change");
    this.onChangeFor(e, location, 'Interest');
  }

  onChangeTitle = (e, location)=>{
    console.log("Title Change");
    this.onChangeFor(e, location, 'Title');
  }

  onConfirm = (location)=>{
    console.log('Confirming at: ' + location)
    const func = ()=>{false};
    const newState = (e)=>{
      return {
        ...e,
        isEditing: false,
        value: e.pendingValue,
        title: e.pendingTitle,
        interest: e.pendingInterest
      }
    }
    const info ={
      func,
      newState
    }
    this.setState({
      ...this.state,
      years: this.alterYearsAt(location, info)
    })
  }

  getStartingFormData = (packagedData)=>{
    this.setState({
      ...this.state,
      packagedData: packagedData,
    })
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
        <Start
          getStartingFormData = {this.getStartingFormData}
          year = {this.state.date}
          />
          <button onClick = {this.generateYears}>Generate</button>
        <YearsContainer
          retirmentYear = {this.getRetirmentYear}
          currentYear = {this.state.date}
          years = {this.state.years}
          editEntry = {this.toggleEditEntry}
          removeEntry = {this.removeEntry}
          onChangeValue = {this.onChangeValue}
          onChangeTitle = {this.onChangeTitle}
          onChangeInterest = {this.onChangeInterest}
          onConfirm = {this.onConfirm}
          addInstance = {this.addInstance}
        />
        <Counter 
          income = {this.getIncome()}
          // expense = {this.getExpenses()}
          // debt = {this.getDebt()}
          // savings = {this.getSavings()}
          retirment = {this.getRetirmentYear()}
          />
        <Footer />
      </div>
    );
  }
}

export default App;
