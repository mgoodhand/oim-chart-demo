import React, { Component, Fragment } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import OIM from 'oim';

export default class OIMChart extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    concept: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }

  state = {
    doc: null,
    concept: this.props.concept,
    concepts: []
  }

  componentDidMount() {
    this.fetchPost()
  }

  fetchPost() {
    fetch(this.props.src)
      .then(r => r.json())
      .then(data => {
      this.setState({ 
        doc: data,
        concepts: OIMChart.concepts(data.facts)
      })
      console.log(this.state.doc)
      this.facts()
      this.breakdowns()
    })
  }

  static concepts(facts) {
    const concepts = Set(facts
       .map(f => f.aspects["xbrl:concept"])).sort()
    console.log("Concepts: ", concepts)
    return concepts
  }

  facts() {
    console.log("Selected concept", this.props.concept)
    const selectedFacts = this.state.doc.facts
       .filter(f => f.aspects["xbrl:concept"] === this.props.concept)
    console.log("Selected facts", selectedFacts)
    return selectedFacts
  }

  static tdas(fact) {
    const tdas = Set(
      Object.entries(fact.aspects)
        .filter(([aspect, value]) => !aspect.startsWith("xbrl:"))
        .map(([aspect, value]) => aspect)
    )
    console.log("tdas ", tdas)
    return tdas
  }
  
  breakdowns() {
    const breakdowns = Set(this.facts().map(fact => OIMChart.tdas(fact)))
    console.log("breakdowns :", breakdowns.toArray().map(tdas => tdas.toArray()))
    return breakdowns
  }

  conceptInputChange = e => {
    this.setState({ concept: e.target.value })
  }

  render() {
    return (
        <Fragment>
        <label>Concept:
        <select onChange={this.conceptInputChange}>
          { this.state.concepts.map(c => <option value={c} selected={c===this.state.concept}>{c}</option>) }
        </select>
        </label>
        <h2>{this.state.concept}</h2>
        <div>
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
      </div>
      </Fragment>
    );
  }
}