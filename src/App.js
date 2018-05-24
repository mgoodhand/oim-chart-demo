import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OIMChart from './oim-chart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">OIM Charts</h1>
        </header>
        <OIMChart src="https://raw.githubusercontent.com/mgoodhand/oim-samples/master/json/cr-2017-05-02/goog-20180331.json"
          concept="us-gaap:Revenues"/>
      </div>
    );
  }
}

export default App;
