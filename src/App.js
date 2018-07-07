import React, { Component } from 'react';
import './App.css';
import './css/display.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Counter from './Components/Counter';
// import StartingForm from './Components/StartingForm';
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
        Retirment: 2025,
      },
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
    e.preventDefault()
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
    // years[0].savings[0].retirment_savings[0]['401k'] = this.state.startingValues.Savings;
    
    this.setState({
      years: years
    })
    
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/* <StartingForm
          getInitialInputs = {this.getInitialInputs.bind(this)}
          /> */}
          <button onClick={this.generateYears}>Generate</button>
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
