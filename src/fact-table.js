import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OIM from './oim';

export default class FactTable extends Component {

  static propTypes = {
    facts: PropTypes.array
  }

  // 
  //    <table>
  //      <thead>
  //        <tr>
  //          {b.map(a => <th>{a}</th>)}
  //        </tr>
  //      </thead>
  //      <tbody>
  //        {this.props.facts.map(fact => (
  //          <tr>
  //            {b.map(a => <td>{fact.aspects[a]}</td>)}
  //          </tr>
  //        ))}
  //      </tbody>
  //    </table>

  render() {
    return (
      <ul>
      </ul>
    );
  }
}