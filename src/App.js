import React, { Component } from 'react';
import './App.css';
import './css/display.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Counter from './Components/Counter';
import StartingForm from './Components/StartingForm';
import YearsContainer from './Components/YearsContainer';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      startingValues: {
        startFormStatus: 0,
        Savings: 0,
        pendingSavings: '',
        Debt: 0,
        pendingDebt: '',
        pendingRetirment: '',
        Retirment: '',
      },
      date: new Date().getFullYear(),
      years: [
        
      ],

    }
  }

  //==========================
  //==========================
  //====INITIAL FORM =========
  //==========================
  //==========================

  updatePendingStartValue = (e, k)=>{
    e.preventDefault();
    this.setState({
      startingValues: {
        ...this.state.startingValues,
        [k]: parseFloat(e.target.value)
      }
    })
  }

  updatePendingSavings = (e)=>{
    this.updatePendingStartValue(e, "pendingSavings")
  }
  updatePendingDebt = (e)=>{
    this.updatePendingStartValue(e, "pendingDebt")
  }
  updatePendingRetirment = (e)=>{
    this.updatePendingStartValue(e, "pendingRetirment")
  }

  savePendingStartValue = (e, k) =>{
    e.preventDefault();
    let newValue = this.state.startingValues["pending" + k];
    let renderYearsContainer = () =>{
      document.getElementById("starting-form").style.display = "none";
      document.getElementById("years-container").style.display = "block";
      window.setTimeout(this.generateYears, 500);
    } 
    let newStartingFormValue = () =>{
      if (this.state.startingValues.startFormStatus !== 2){ 
        return this.state.startingValues.startFormStatus + 1 ;
      }
      else{
        renderYearsContainer();
        return 0;
      }
    }
    this.setState({
      startingValues: {
        ...this.state.startingValues,
        [k]: newValue,
        ["pending" + k]: 0,
        startFormStatus: newStartingFormValue()
      }
    })
    document.getElementById("starting-form").reset();
    
  }

  savePendingSavings = (e) =>{
    this.savePendingStartValue(e, "Savings")
  }

  savePendingDebt = (e) =>{
    this.savePendingStartValue(e, "Debt")
  }

  savePendingRetirment = (e) =>{
    this.savePendingStartValue(e, "Retirment")
    
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

  generateYears = () =>{
    let years = [];
    console.log(this.state.startingValues.Retirment)
    let numYears = this.getNumberOfRows(this.state.startingValues.Retirment)
    console.log(numYears);
    for (let i = 0; i < numYears; i++){
      years.push(
        {
          year: this.state.date + i,
          pendingValues: {},
          income: 
            {title: 'job title',
            amount: 0
          },
          
          expenses: [
            {housing: 0},
            {food: 0},
            {expenses: 0},
          ],
          purchases: [],
        })
    }
    this.setState({
      years: years
    })
    
  }

  render() {
    return (
      <div className="App">
        <Header />
        <StartingForm
          startingValues = {this.state.startingValues}
          updatePendingSavings ={this.updatePendingSavings}
          updatePendingDebt = {this.updatePendingDebt}
          updatePendingRetirment = {this.updatePendingRetirment}
          savePendingSavings = {this.savePendingSavings}
          savePendingDebt = {this.savePendingDebt}
          savePendingRetirment = {this.savePendingRetirment}
          />
        <YearsContainer 
          retirmentYear = {this.state.startingValues.Retirment}
          startingDebt = {this.state.startingValues.Debt}
          startingSavings ={this.state.startingValues.Savings}
          currentYear = {this.state.date}
          years = {this.state.years}
        />
        <Counter 
          savings={this.state.startingValues.Savings}
          debt = {this.state.startingValues.Debt}
          retirment = {this.state.startingValues.Retirment}
          />
        <Footer />
      </div>
    );
  }
}

export default App;
