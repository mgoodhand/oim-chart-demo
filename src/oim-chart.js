import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

export default class OIMChart extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    concept: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }

  state = {
    doc: null
  }

  componentDidMount() {
    this.fetchPost()
  }

  fetchPost() {
    fetch(this.props.src)
      .then(r => r.json())
      .then(data => {
      this.setState({ doc: data })
      console.log(this.state.doc)
    })
  }

  facts() {
    const selectedFacts = this.doc.facts
       .filter(f => f.aspects["xbrl:concept"].equals(this.concept))
    console.log("Selected facts", selectedFacts)
    return selectedFacts
  }

  render() {
    return (
        <Plot
        data={[
          {
            x: ["foo"],
            y: [2],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
          },
          {
            x: ["bar"], 
            y: [2],
            type: 'bar',
          },
          {
            x: ["baz"], 
            y: [3],
            type: 'bar',
          } 
        ]}
        layout={{width: this.width, height: this.height, title: this.title}}
        config={{editable: false,  displayModeBar: false}}
      />
    );
  }
}