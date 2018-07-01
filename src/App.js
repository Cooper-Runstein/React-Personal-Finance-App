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
    const renderYearsContainer = () =>{
      document.getElementById("starting-form").style.display = "none";
      document.getElementById("years-container").style.display = "block";
      window.setTimeout(this.generateYears, 500);
    } 
    const newStartingFormValue = () =>{
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
    const years = [];
    let numYears = this.getNumberOfRows(this.state.startingValues.Retirment)
    for (let i = 0; i < numYears; i++){
      years.push(
        {
          year: this.state.date + i,
          pendingValues: {},
          income: [
            {
              jobs: [
                {job_title: 2000}
              ]
            }
          ],
          expenses: [
            {
              housing: [
                {rent: 1000},
                {storage_locker: 50}
              ]
            },
            {
              food: [
                {eating_out: 150},
                {groceries: 200}
              ]

            },
            {
              taxes: [
                {state: 300},
                {federal: 500}
            ]}
          ],
          debt: [
            {
              loans: [
                {student_loan: 1000},
                {auto_loan: 500}
              ]
            },
          ],
          savings:[
            {
              retirment_savings: [
                {'401k': 10000}
              ]
            },
            {
              stocks: [
                {company_shares: 1000}
              ]
            }
          ]
        })
      }
      console.log(years[0])    
    years[0].savings[0].retirment_savings[0]['401k'] = this.state.startingValues.Savings;
    
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
