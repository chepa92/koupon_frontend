import React, { Component } from 'react';
import api from '../../api/api';
import CouponsTable from '../CouponsTable/CouponsTable';

export default class Secret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: null,
      message: null,
    };
  }
  render() {
    return (
      <div className="Admin">
        <h2>This is admin page</h2>

        <div className="result">{this.state.secret}</div>

        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}


        <CouponsTable/>
      </div>
    );
  }
  componentDidMount() {
    api
      .getSecret()
      .then(data => this.setState({ secret: data.secret }))
      .catch(err => this.setState({ message: err.toString() }));
  }
}
