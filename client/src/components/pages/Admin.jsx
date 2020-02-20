import React, { Component } from 'react';
import api from '../../api/api';
import CouponsTable from '../CouponsTable/CouponsTable';

export default class Secret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      message: null,
    };
  }
  render() {
    return (
      <div className="Admin">
        <h2>This is admin page</h2>

        {api.isLoggedIn() && <CouponsTable />}

        {!api.isLoggedIn() && (
          <div className="info info-danger">Not Authorized</div> //TODO mb make force redirect to main page?
        )}
      </div>
    );
  }
}
