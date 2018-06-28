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
      startFormStatus: 0,
      savings: 0,
      initialSavings: 0,
      debt: 0,
      initialDebt: 0,
      retirmentYear: '',
      years: [
        
      ]
    }
  }

  updateInitialSavings = (e)=>{
    e.preventDefault();
    this.setState({
      initialSavings: e.target.value
    })
    
  }

  saveInitialSavings = (e) =>{
    e.preventDefault();
    let newSavings = this.state.initialSavings;
    let newFormStatus = this.state.startFormStatus + 1;
    this.setState({
      savings: newSavings,
      initialSavings: 0,
      startFormStatus: newFormStatus
    })
    document.getElementById("starting-form").reset();
  }
  updateInitialDebt = (e)=>{
    e.preventDefault();
    this.setState({
      initialDebt: e.target.value
    })
  }

  saveInitialDebt = (e) =>{
    e.preventDefault();
    let newDebt = this.state.initialDebt;
    let newFormStatus = this.state.startFormStatus + 1;
    this.setState({
      debt: newDebt,
      initialDebt: 0,
      startFormStatus: newFormStatus
    })
  }
 
 

  render() {
    return (
      <div className="App">
        <Header />
        <Main 
          updateInitialSavings = {this.updateInitialSavings}
          initialSavings = {this.state.initialSavings}
          saveInitialSavings = {this.saveInitialSavings}
          initialDebt = {this.state.initialDebt}
          updateInitialDebt = {this.updateInitialDebt}
          saveInitialDebt = {this.saveInitialDebt}
          startFormStatus = {this.state.startFormStatus}
          
          />
        <Counter 
          savings={this.state.savings}
          debt = {this.state.debt}/>
        <Footer />
      </div>
    );
  }
}

export default App;
