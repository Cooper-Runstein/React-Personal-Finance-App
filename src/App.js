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
      savings: 0,
      'initialSavings': 0,
      debt: 0,
      initialDebt: 0
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
    document.getElementById("initial_savings").style.display = "none";
    document.getElementById("initial_debt").style.display = "block";
    let newSavings = this.state.initialSavings;
    this.setState({
      savings: newSavings,
      initialSavings: 0 
    })
  }
  updateInitialDebt = (e)=>{
    e.preventDefault();
    this.setState({
      initialDebt: e.target.value
    })
  }

  saveInitialDebt = (e) =>{
    e.preventDefault();
    document.getElementById("initial_debt").style.display = "none";
    let newDebt = this.state.initialDebt;
    this.setState({
      debt: newDebt,
      initialDebt: 0 
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
