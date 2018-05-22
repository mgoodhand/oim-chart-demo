import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from 'react-plotly.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">OIM Charts</h1>
        </header>
        <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
          },
          {
            x: [1, 2, 3], 
            y: [2, 5, 3],
            type: 'bar',
          } 
        ]}
        layout={{width: 320, height: 240, title: 'Not-yet-OIM Plot'}}
        config={{editable: false,  displayModeBar: false}}
      />
      </div>
    );
  }
}

export default App;
