import React, { Component } from 'react';
import api from '../../api';

export default class Coupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
    };
  }
  render() {
    return (
      <div className="Coupons">
        <h2>List of coupons</h2>
        {this.state.coupons.map(c => (
          <li key={c._id}>{c.title}</li>
        ))}
      </div>
    );
  }
  componentDidMount() {
    api
      .getCoupons()
      .then(coupons => {
        console.log(coupons);
        this.setState({
          coupons: coupons,
        });
      })
      .catch(err => console.log(err));
  }
}
