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
    this.toggleEditEntry = this.toggleEditEntry.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
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

  toggleEditEntry= (location) =>{
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
        years: this.getYears(location, info)
      }
    );
    console.log('Years altered');
  }

  getYears = (location, info)=>{
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
  })
    return years;
  }

  getCategory = (location, info)=>{
    const currentCategory = location.currentCategory;
    const catKey = location.catKey;
    const currentEntries = currentCategory[catKey]['entries'];
    location.currentEntries = currentEntries;
    const newCat = []
    currentCategory.map((e,i)=>{
      if (i === catKey){
        let newEntry = {
          ...e,
          entries: this.getEntry(location, info)
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

  getEntry = (location, info)=>{
    const currentEntries = location.currentEntries;
    const index = location.instanceIndex;
    const entry = currentEntries[index];
    const newEntries = [];
    currentEntries.map((e,i)=>{
      if (i === index){
        newEntries.push(info.newState(e, entry))
      }else{
        newEntries.push(e)
      }
    }
  )
    info.func(newEntries, index);
    return newEntries;
  }

  removeEntry= (location)=>{
    console.log("Called Remove")
    const info = {
      newState: ()=>{return false},
      func: (array, index)=>{
        console.log(array, index)
        array.splice(index, index + 1);
      }
    }
    this.setState({
      years: this.getYears(location, info)
    })
    console.log('Years altered')
  }

  onChangeFor= (e, type, location) =>{
    e.preventDefault();
    // let instanceObj = this.getInstanceFromState(location);
    // let newValue = this.state.startingValues["pending" + k];
    // this.setState({
    //   startingValues: {
    //     ...this.state.startingValues,
    //     [k]: newValue,
    //     ["pending" + k]: 0,
    //     startFormStatus: newStartingFormValue()
    //   }
    // })
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
          editEntry = {this.toggleEditEntry}
          removeEntry= {this.removeEntry}
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
