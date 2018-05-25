import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReportLoader from './report-loader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">OIM Charts</h1>
        </header>
        <ReportLoader src="https://raw.githubusercontent.com/mgoodhand/oim-samples/master/json/cr-2017-05-02/goog-20180331.json"
          filters={{}} />
      </div>
    );
  }
}

export default App;
