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
    this.editEntry = this.editEntry.bind(this)
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
              title: 'jobs',
              entries: [
                {
                  title: 'job_title',
                  value: 2000,
                  isEditing: false
                }
              ]
            }
          ],
          expenses: [
            {
              title: 'housing',
              entries: [
                {
                  title: 'rent',
                  value: 1000,
                  isEditing: false
                },
                {
                  title: 'storage_locker',
                  value: 50,
                  isEditing: false
                }
              ]
            },
            {
              title: 'food',
              entries: [
                {
                  title: 'eating_out',
                  value: 150,
                  isEditing: false
                },
                {
                  title: 'groceries',
                  value: 200,
                  isEditing: false
                }
              ]

            },
            {
              title: 'taxes',
              entries: [
                {
                  title: 'state',
                  value: 300,
                  isEditing: false
                },
                {
                  title: 'federal',
                  value: 500,
                  isEditing: false
                }
            ]
          }
          ],
          debt: [
            {
              title: 'loans',
              entries: [
                {
                  title: 'student_loan',
                  value: 1000,
                  isEditing: false
                },
                {
                  title: 'auto_loan',
                  value: 500,
                  isEditing: false}
              ]
            },
          ],
          savings:[
            {
              title: 'retirment savings',
              entries: [
                {
                  title: '401k',
                  value: 10000,
                  isEditing: false
                }
              ]
            },
            {
              title: 'stocks',
              entries: [
                {
                  title: 'company_shares',
                  value: 1000,
                  isEditing: false
                }
              ]
            }
          ]
        })
      }
    
    this.setState({
      years: years
    })
    
  }

  editEntry= (yearIndex, category, index) =>{
    console.log("editEntry");
    console.log(this.state.years[yearIndex].year)
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
          editEntry = {this.editEntry}
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
