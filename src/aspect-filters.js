import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OIM from './oim';

export default class AspectFilters extends Component {

  static propTypes = {
    onAspectFilterChange: PropTypes.func.isRequired,
    facts: PropTypes.array
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}