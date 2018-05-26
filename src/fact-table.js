import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OIM from './oim';

export default class FactTable extends Component {

  static propTypes = {
    facts: PropTypes.array.isRequired
  }

  nonConceptAspects() {
    return OIM.aspects(this.props.facts)
            .filter(a => !(a==="xbrl:concept"))
            .sort()
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.nonConceptAspects().map(a => <th>{a}</th>)}
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {this.props.facts.map(fact => (
            <tr>
              {this.nonConceptAspects().map(a => <td>{fact.aspects[a]}</td>)}
              <td>{fact.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}