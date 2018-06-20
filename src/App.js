import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Counter from './Components/Counter';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      savings: 0
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
        <Footer />
      </div>
    );
  }
}

export default App;
