import React, { Component, Fragment } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import OIM from './oim';
import Filter from './filter';
import FactTable from './fact-table';

export default class OIMChart extends Component {

  static propTypes = {
    doc: PropTypes.object.isRequired,
    concept: PropTypes.string
  }

  state = {
    concept: this.initialConcept()
  }

  availableConcepts() {
    return OIM.aspectValues(this.facts(), "xbrl:concept").sort().toArray()
  }

  initialConcept() {
    return this.props.concept || this.availableConcepts()[0]
  }

  facts() {
    return this.props.doc.facts
  }

  filteredFacts() {
    if (!this.state.concept) {
      return []
    }
    else {
      const selectedFacts = this.facts()
        .filter(f => OIM.aspectMatch(f, {
          "xbrl:concept": this.concept
        }))
      console.log("Selected facts", selectedFacts)
      return selectedFacts
    }
  }

  conceptFilterChange = e => {
    const concept = e.target.value
    console.log("Concept set to ", concept)
    this.setState({ concept: concept })
  }

  render() {
    return (
        <Fragment>
        <Filter onFilterChange={this.conceptFilterChange} options={this.availableConcepts()} default={this.state.concept}/>
        <p>Facts for {this.state.concept}</p>
        <FactTable facts={this.filteredFacts()} />
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