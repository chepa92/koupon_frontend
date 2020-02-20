import React, { Component } from 'react';
import api from '../../api/api';
import qs from "qs";

export default class Coupons extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      coupon: [],
    };
  }
  render() {
    return (
      <div className="Coupon">
        <h2>The coupon is:</h2>
          <li key={this.state.coupon._id}>{this.state.coupon.title}</li>
      </div>
    );
  }
  componentDidMount() {
    api
      .getCoupon((qs.parse(this.props.location.search, { ignoreQueryPrefix: true })).id) //use id passed by query string
      .then(coupon => {
        console.log(coupon);
        this.setState({
          coupon: coupon,
        });
      })
      .catch(err => console.log(err));
  }
}
