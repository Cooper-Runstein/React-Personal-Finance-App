import React, { Component } from 'react';
import './App.css';
import './css/display.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Counter from './Components/Counter';
import Main from './Components/Main';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      startingValues: {
        startFormStatus: 0,
        savings: 0,
        pendingSavings: 0,
        debt: 0,
        pendingDebt: 0,
        pendingRetirment: 0,
        retirmentYear: '',
      },
      years: [
        
      ]
    }
  }

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
    console.log(newValue)
    let newStartingFormValue = () =>{
      if (this.state.startingValues.startFormStatus !== 2){ 
      return this.state.startingValues.startFormStatus + 1 ;
    }
    else{
      return 0;
    }
    } 
    this.setState({
      startingValues: {
        ...this.state.startingValues,
        [k]: this.state.startingValues["pending" + k],
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
    document.getElementById("starting-form").style.display = "none";
    this.savePendingStartValue(e, "Retirment")
    
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main
          startingValues = {this.state.startingValues}
          updatePendingSavings ={this.updatePendingSavings}
          updatePendingDebt = {this.updatePendingDebt}
          updatePendingRetirment = {this.updatePendingRetirment}
          savePendingSavings = {this.savePendingSavings}
          savePendingDebt = {this.savePendingDebt}
          savePendingRetirment = {this.savePendingRetirment}
          />
        <Counter 
          savings={this.state.startingValues.savings}
          debt = {this.state.startingValues.debt}/>
        <Footer />
      </div>
    );
  }
}

export default App;
