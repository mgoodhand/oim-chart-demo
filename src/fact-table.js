import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OIM from './oim';
import { List } from 'immutable';
import Plot from 'react-plotly.js';

export default class FactTable extends Component {

  static propTypes = {
    facts: PropTypes.array.isRequired
  }

  nonConceptAspects() {
    return OIM.aspects(this.props.facts)
            .filter(a => !(a==="xbrl:concept"))
            .sort()
  }

  fixedAspectValues() {
    const result = OIM.fixedAspectValueMap(this.props.facts)
    console.log(result.toJSON())
    return result
  }

  variableAspects() {
    const result = OIM.variableAspectValueMap(this.props.facts).keySeq().sort().toArray()
    console.log("Variable aspects: ", result)
    return result 
  }

  variableNonPeriodAspects() {
    return this.variableAspects().filter(a => !(a === "xbrl:periodStart" || a === "xbrl:periodEnd"))
  }

  series() {
    const vnpa = this.variableNonPeriodAspects()
    if ((vnpa.length) == 0) {
      const sortedFacts = List(this.props.facts).sortBy(f => f.aspects["xbrl:periodEnd"]).toArray()
      return [
        {
          x : sortedFacts.map(f => f.aspects["xbrl:periodEnd"]),
          y : sortedFacts.map(f => f.value),
          type: 'bar'
        }
      ]
    }
    else {
      return []
    }
  }

  render() {
    return (
      <div>
      {Object.entries(this.fixedAspectValues().toJSON())
          .map(([a, vs]) => (<div key={`fixed${a}`}>{a} = {vs[0]}</div>))}
      <table>
        <thead>
          <tr>
            {this.variableAspects().map(a => <th key={`th${a}`}>{a}</th>)}
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {this.props.facts.map((fact, row) => (
            <tr key={row}>
              {this.variableAspects().map((a, col) => <td key={`${row}-${col}`} >{fact.aspects[a]}</td>)}
              <td>{fact.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Plot
        data={this.series()}
        layout={{width: this.width, height: this.height, title: this.title}}
        config={{editable: false,  displayModeBar: false}}
      />
      </div>
    );
  }
}