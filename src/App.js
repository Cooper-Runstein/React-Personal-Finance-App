import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Counter from './Components/Counter';
import Main from './Components/Main';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      savings: 0,
      initialSavings: 0,
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
      this.setState({
        savings: newSavings,
        initialSavings: 0 
      })
    }
 

  render() {
    return (
      <div className="App">
        <Header />
        <Main 
          updateInitialSavings = {this.updateInitialSavings}
          initialSavings = {this.state.initialSavings}
          saveInitialSavings = {this.saveInitialSavings}/>
        <Counter 
          savings={this.state.savings}/>
        <Footer />
      </div>
    );
  }
}

export default App;
