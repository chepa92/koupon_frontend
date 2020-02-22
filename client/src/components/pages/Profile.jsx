import React, { Component } from 'react';
import api from '../../api/api';
import qs from "qs";

export default class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
    };
  }
  render() {
    return (
      <div className="Profile">
        <h2>The profile is:</h2>
          <li key={this.state.profile._id}>{this.state.profile.username}</li>
      </div>
    );
  }
  componentDidMount() {
    api
      .getUser((qs.parse(this.props.location.search, { ignoreQueryPrefix: true })).id) //use id passed by query string
      .then(profile => {
        console.log(profile);
        this.setState({
          profile: profile,
        });
      })
      .catch(err => console.log(err));
  }
}
