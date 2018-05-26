import React, { Component } from 'react';
import PropTypes from 'prop-types';

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