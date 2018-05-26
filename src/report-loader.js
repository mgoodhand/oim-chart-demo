import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OIMChart from './oim-chart';

export default class ReportLoader extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    filters: PropTypes.object
  }

  state = {
    doc: null,
  }

  componentDidMount() {
    this.fetchPost()
  }

  fetchPost() {
    fetch(this.props.src)
      .then(r => r.json())
      .then(data => {
        console.log(`Retrieved ${this.props.src}`)
        this.setState({ 
          doc: data,
        })
    })
  }

  render() {
    return (
        this.state.doc ? <OIMChart doc={this.state.doc} filters={this.props.filters} /> : <p>"Loading ..."</p>
    );
  }
}