import React, { Component } from 'react';
import api from '../../../api/api';
import { Route, Switch } from 'react-router-dom';

import CouponsTable from '../../CouponsTable/CouponsTable';
import UsersTable from '../../UsersTable/UsersTable';
import AdminDashboard from '../../CouponsTable/CouponsTable'; //TODO link to dashboard

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

        {api.isLoggedIn() && (
          <Switch>
            <Route path="/admin" exact component={AdminDashboard} />
            <Route path="/admin/coupons" component={CouponsTable} />
            <Route path="/admin/users" component={UsersTable} />
          </Switch>
        )}

        {!api.isLoggedIn() && (
          <div className="info info-danger">Not Authorized</div> //TODO mb make force redirect to main page?
        )}
      </div>
    );
  }
}
