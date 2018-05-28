import React, { Component, Fragment } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';
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
    return OIM.aspectValues(this.numericFacts(), "xbrl:concept").sort().toArray()
  }

  initialConcept() {
    return this.props.concept || this.availableConcepts()[0]
  }

  numericFacts() {
    return this.facts().filter(f => !isNaN(+f.value))
  }

  facts() {
    return this.props.doc.facts
  }

  filteredFacts() {
    const concept = this.state.concept
    if (!concept) {
      return []
    }
    else {
      console.log("Selecting facts matching", concept)
      const selectedFacts = this.facts()
        .filter(f => OIM.aspectMatch(f, {
          "xbrl:concept": concept
        }))
      console.log("Selected facts", JSON.stringify(selectedFacts, null, 2))
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