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
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
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
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
                },
                {
                  title: 'storage_locker',
                  value: 50,
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
                }
              ]
            },
            {
              title: 'food',
              entries: [
                {
                  title: 'eating_out',
                  value: 150,
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
                },
                {
                  title: 'groceries',
                  value: 200,
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
                }
              ]

            },
            {
              title: 'taxes',
              entries: [
                {
                  title: 'state',
                  value: 300,
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
                },
                {
                  title: 'federal',
                  value: 500,
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
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
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
                },
                {
                  title: 'auto_loan',
                  value: 500,
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
                }
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
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
                }
              ]
            },
            {
              title: 'stocks',
              entries: [
                {
                  title: 'company_shares',
                  value: 1000,
                  isEditing: false,
                  pendingTitle: '',
                  pendingValue: ''
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

  editEntry= (yearIndex, category, catKey, index) =>{
    console.log("Called Edit")
    let newYears = [];

    const editEntry = ()=>{
      let newEntries = [];
      this.state.years[yearIndex][category][catKey]['entries'].map((e,i)=>{
        if (i === index){
          newEntries.push({
            ...e,
            isEditing: !this.state.years[yearIndex][category][catKey]['entries'][index].isEditing
          })
        }else{
          newEntries.push(e)
        }
      })
      return newEntries;
    }
    
    const editCategory = ()=>{
      let newCat = []
      this.state.years[yearIndex][category].map((e,i)=>{
        if (i === catKey){
          let newEntry = {
            ...e,
            entries: editEntry()
          }
          newCat.push(newEntry)
        }
        else{
          newCat.push(e)

        }
      })
      return newCat;
    }

    this.state.years.map((e,i)=>{
      if(i === yearIndex){
        let newYear = {
          ...e,
          [category]: editCategory()
        } 
        newYears.push(newYear)
      }
      else{
        newYears.push(e)
      }
    })
    this.setState({
      years: newYears
    })
    console.log('Years altered')
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
