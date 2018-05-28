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

  series(facts, label) {
      const sortedFacts = List(facts).sortBy(f => f.aspects["xbrl:periodEnd"]).toArray()
      return {
          x : sortedFacts.map(f => f.aspects["xbrl:periodEnd"]),
          y : sortedFacts.map(f => f.value),
          type: 'bar',
          name: label
      }
  }

  data() {
    const vnpa = this.variableNonPeriodAspects()
    if (vnpa.length === 0) {
      return [ this.series(this.props.facts) ]
    }
    else if (vnpa.length === 1) {
      const variableAspect = vnpa[0]
      const groupedFacts = List(this.props.facts).groupBy(f => f.aspects[variableAspect])
      console.log("Grouped", groupedFacts)
      const result = groupedFacts.mapEntries(([k, v]) => [k, this.series(v, k)])
                                 .valueSeq().toArray()
      console.log("Grouped data", result)
      return result
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
        data={this.data()}
        layout={{width: this.width, height: this.height, title: this.title}}
        config={{editable: false,  displayModeBar: false}}
      />
      </div>
    );
  }
}