import React, { Component, Fragment } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import OIM from './oim';
import AspectFilters from './aspect-filters';
import FactTable from './fact-table';

export default class OIMChart extends Component {

  static propTypes = {
    doc: PropTypes.object,
    filters: PropTypes.object
  }

  state = {
    filters: this.props.filters
  }

  filteredFacts() {
    if (!this.props.doc || !this.props.doc.facts) {
      console.log("No doc, or doc without facts")
      return []
    }
    else if (!this.state.filters) {
      return this.props.doc.facts 
    }
    else {
      const selectedFacts = this.props.doc.facts
        .filter(f => OIM.aspectMatch(f, this.state.filters))
      console.log("Selected facts", selectedFacts)
      OIM.breakdowns(this.props.doc.facts).sort().forEach(b => {
        console.log(b.join())
      })
      return selectedFacts
    }
  }

  aspectFilterChange = filters => {
    this.setState({ filters: filters })
  }

  render() {
    return (
        <Fragment>
        <AspectFilters onAspectFilterChange={this.aspectFilterChange} facts={this.filteredFacts()}/>
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