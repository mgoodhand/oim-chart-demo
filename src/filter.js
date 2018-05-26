import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OIM from './oim';

export default class Filter extends Component {

  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    default: PropTypes.string
  }

  render() {
    return (
      <select onChange={this.props.onFilterChange}>
       {this.props.options.map(o => <option value={o} key={o}>{o}</option>)}
      </select>
    );
  }
}